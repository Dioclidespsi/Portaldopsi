import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'node:crypto';
import * as bcrypt from 'bcrypt';
import { Role, TenantKind } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

const SALT_ROUNDS = 12;
const EMAIL_VERIFICATION_TTL_MS = 24 * 60 * 60 * 1000;
const PASSWORD_RESET_TTL_MS = 60 * 60 * 1000;

/**
 * O Site Profissional vive em /{slug} (raiz do domínio, sem prefixo) — um
 * tenant com um desses nomes tornaria a própria página dele inalcançável pra
 * sempre (a rota estática do Next.js sempre ganha da dinâmica [slug]). Ver
 * apps/web/app/[slug]/page.tsx.
 */
const RESERVED_SLUGS = new Set([
  'admin', 'dashboard', 'login', 'loja', 'paciente', 'privacidade',
  'profissionais', 'signup', 'verificar', 'verificar-email', 'api', '_next', 'favicon.ico',
  'esqueci-senha', 'redefinir-senha', 'programa-piloto', 'termos-aluno', 'termos-paciente',
  'exclusao-de-conta',
]);

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly email: EmailService,
    private readonly config: ConfigService,
  ) {}

  /**
   * Cria o Tenant e seu usuário titular numa única transação. `tenants` não
   * tem RLS (é a raiz do isolamento), mas `users` tem — por isso o
   * set_config do tenant recém-criado precisa entrar na mesma transação,
   * antes do insert do usuário.
   */
  async signup(dto: SignupDto) {
    const { tenant, user } = await this.createTenantWithUser(
      TenantKind.CLINICA,
      dto.clinicName,
      dto.slug,
      dto.name,
      dto.email,
      dto.password,
      dto.phone,
    );

    // Não bloqueia o cadastro nem impede o login — só fica pendente até o
    // psicólogo clicar no link (mesmo padrão não-bloqueante do CRP).
    // `forTenant` é obrigatório aqui: fora da transação de criação, a conexão
    // não tem mais app.tenant_id setado — sem isso a RLS de `users` bloqueia
    // o update (0 linhas afetadas) e todo cadastro novo quebra com 500.
    const verificationToken = randomUUID();
    await this.prisma.forTenant(tenant.id).user.update({
      where: { id: user.id },
      data: {
        emailVerificationToken: verificationToken,
        emailVerificationExpiresAt: new Date(Date.now() + EMAIL_VERIFICATION_TTL_MS),
      },
    });
    const webUrl = this.config.get<string>('PUBLIC_WEB_URL', 'https://portaldopsi.com.br');
    await this.email.sendEmailVerification({
      email: user.email,
      name: user.name,
      verifyUrl: `${webUrl}/verificar-email?token=${verificationToken}`,
    });

    return this.issueToken({ sub: user.id, tenantId: tenant.id, role: user.role, tenantKind: tenant.kind });
  }

  /** Token de uso único — some depois de confirmado, não pode ser reaproveitado. */
  async verifyEmail(token: string) {
    const system = this.prisma.forSystem();
    const user = await system.user.findUnique({ where: { emailVerificationToken: token } });
    if (!user || !user.emailVerificationExpiresAt || user.emailVerificationExpiresAt < new Date()) {
      throw new UnauthorizedException('Link de verificação inválido ou expirado.');
    }

    await system.user.update({
      where: { id: user.id },
      data: { emailVerifiedAt: new Date(), emailVerificationToken: null, emailVerificationExpiresAt: null },
    });

    return { verified: true };
  }

  /**
   * Reaproveitado pelo Marketplace pra criar a conta ESTUDANTE de quem compra
   * um curso avulso sem já ter conta — mesma transação atômica do signup de
   * clínica, só muda `kind`. Não emite token: o Marketplace decide quando
   * (só depois de iniciar a cobrança).
   *
   * `phone` é opcional aqui de propósito — só o signup de clínica (plano
   * free) exige WhatsApp na aquisição; o Marketplace não passa esse campo.
   */
  async createTenantWithUser(
    kind: TenantKind,
    tenantName: string,
    slug: string,
    userName: string,
    email: string,
    password: string,
    phone?: string,
  ) {
    if (RESERVED_SLUGS.has(slug)) {
      throw new ConflictException('Esse identificador (slug) é reservado — escolha outro.');
    }
    const existing = await this.prisma.tenant.findUnique({ where: { slug } });
    if (existing) {
      throw new ConflictException('Esse identificador (slug) já está em uso.');
    }

    const tenantId = randomUUID();
    const userId = randomUUID();
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const [, tenant, user] = await this.prisma.$transaction([
      this.prisma.$executeRaw`SELECT set_config('app.tenant_id', ${tenantId}, TRUE)`,
      this.prisma.tenant.create({ data: { id: tenantId, name: tenantName, slug, kind, publicPhone: phone ?? null } }),
      this.prisma.user.create({
        data: {
          id: userId,
          tenantId,
          email,
          passwordHash,
          name: userName,
          role: Role.PSICOLOGO_TITULAR,
        },
      }),
    ]);

    return { tenant, user };
  }

  issueToken(payload: { sub: string; tenantId: string; role: Role; tenantKind: TenantKind }) {
    return { accessToken: this.jwt.sign(payload) };
  }

  /**
   * E-mail + senha, igual a praticamente todo sistema — sem pedir o slug da
   * clínica. Isso só é possível porque email é único por tenant (não
   * globalmente): a maioria resolve sozinha (um e-mail só existe numa
   * clínica), e no raro caso de alguém ter conta com o MESMO e-mail em mais
   * de uma clínica (já aconteceu de verdade em produção — ex: supervisor(a)
   * que atende duas clínicas), devolvemos as opções pro front perguntar qual
   * clínica, em vez de adivinhar ou travar o login. `dto.slug` só chega
   * preenchido nessa segunda tentativa, depois da escolha.
   */
  async login(dto: LoginDto) {
    if (dto.slug) {
      const tenant = await this.prisma.tenant.findUnique({ where: { slug: dto.slug } });
      if (!tenant) {
        throw new UnauthorizedException('Clínica ou credenciais inválidas.');
      }

      const [, user] = await this.prisma.$transaction([
        this.prisma.$executeRaw`SELECT set_config('app.tenant_id', ${tenant.id}, TRUE)`,
        this.prisma.user.findUnique({ where: { tenantId_email: { tenantId: tenant.id, email: dto.email } } }),
      ]);

      if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
        throw new UnauthorizedException('Clínica ou credenciais inválidas.');
      }

      return this.issueToken({ sub: user.id, tenantId: tenant.id, role: user.role, tenantKind: tenant.kind });
    }

    // Sem slug: busca cross-tenant (forSystem — só ela contorna a RLS de `users`
    // legitimamente) e só confirma as contas cuja senha bate de verdade, pra
    // não virar um jeito de descobrir "esse e-mail existe em quais clínicas".
    const candidates = await this.prisma
      .forSystem()
      .user.findMany({ where: { email: dto.email }, include: { tenant: true } });

    const matches = [];
    for (const candidate of candidates) {
      if (await bcrypt.compare(dto.password, candidate.passwordHash)) matches.push(candidate);
    }

    if (matches.length === 0) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    if (matches.length > 1) {
      return {
        chooseTenant: true as const,
        options: matches.map((m) => ({ slug: m.tenant.slug, tenantName: m.tenant.name })),
      };
    }

    const [match] = matches;
    return this.issueToken({ sub: match.id, tenantId: match.tenantId, role: match.role, tenantKind: match.tenant.kind });
  }

  /**
   * Sempre responde igual, exista ou não a conta — nunca confirma nem nega
   * quem tem cadastro (evita enumeração). Sem slug, procura em todas as
   * clínicas (forSystem); se o mesmo e-mail existir em mais de uma (raro),
   * manda um link de redefinição pra cada uma.
   */
  async requestPasswordReset(dto: RequestPasswordResetDto) {
    let candidates: { id: string; email: string; name: string; tenantId: string }[] = [];

    if (dto.slug) {
      const tenant = await this.prisma.tenant.findUnique({ where: { slug: dto.slug } });
      if (tenant) {
        const [, user] = await this.prisma.$transaction([
          this.prisma.$executeRaw`SELECT set_config('app.tenant_id', ${tenant.id}, TRUE)`,
          this.prisma.user.findUnique({ where: { tenantId_email: { tenantId: tenant.id, email: dto.email } } }),
        ]);
        if (user) candidates = [user];
      }
    } else {
      candidates = await this.prisma.forSystem().user.findMany({ where: { email: dto.email } });
    }

    const webUrl = this.config.get<string>('PUBLIC_WEB_URL', 'https://portaldopsi.com.br');
    for (const user of candidates) {
      const token = randomUUID();
      await this.prisma.forTenant(user.tenantId).user.update({
        where: { id: user.id },
        data: { passwordResetToken: token, passwordResetExpiresAt: new Date(Date.now() + PASSWORD_RESET_TTL_MS) },
      });
      await this.email.sendPasswordReset({
        email: user.email,
        name: user.name,
        resetUrl: `${webUrl}/redefinir-senha?token=${token}`,
      });
    }

    return { sent: true };
  }

  /** Token de uso único — some depois de trocada a senha, mesmo padrão de verifyEmail. */
  async resetPassword(dto: ResetPasswordDto) {
    const system = this.prisma.forSystem();
    const user = await system.user.findUnique({ where: { passwordResetToken: dto.token } });
    if (!user || !user.passwordResetExpiresAt || user.passwordResetExpiresAt < new Date()) {
      throw new UnauthorizedException('Link de redefinição inválido ou expirado.');
    }

    const passwordHash = await bcrypt.hash(dto.newPassword, SALT_ROUNDS);
    await system.user.update({
      where: { id: user.id },
      data: { passwordHash, passwordResetToken: null, passwordResetExpiresAt: null },
    });

    return { reset: true };
  }
}
