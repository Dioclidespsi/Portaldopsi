import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'node:crypto';
import * as bcrypt from 'bcrypt';
import { Role, TenantKind } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

const SALT_ROUNDS = 12;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  /**
   * Cria o Tenant e seu usuário titular numa única transação. `tenants` não
   * tem RLS (é a raiz do isolamento), mas `users` tem — por isso o
   * set_config do tenant recém-criado precisa entrar na mesma transação,
   * antes do insert do usuário.
   */
  async signup(dto: SignupDto) {
    const { tenant, user } = await this.createTenantWithUser(TenantKind.CLINICA, dto.clinicName, dto.slug, dto.name, dto.email, dto.password);
    return this.issueToken({ sub: user.id, tenantId: tenant.id, role: user.role, tenantKind: tenant.kind });
  }

  /**
   * Reaproveitado pelo Marketplace pra criar a conta ESTUDANTE de quem compra
   * um curso avulso sem já ter conta — mesma transação atômica do signup de
   * clínica, só muda `kind`. Não emite token: o Marketplace decide quando
   * (só depois de iniciar a cobrança).
   */
  async createTenantWithUser(kind: TenantKind, tenantName: string, slug: string, userName: string, email: string, password: string) {
    const existing = await this.prisma.tenant.findUnique({ where: { slug } });
    if (existing) {
      throw new ConflictException('Esse identificador (slug) já está em uso.');
    }

    const tenantId = randomUUID();
    const userId = randomUUID();
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const [, tenant, user] = await this.prisma.$transaction([
      this.prisma.$executeRaw`SELECT set_config('app.tenant_id', ${tenantId}, TRUE)`,
      this.prisma.tenant.create({ data: { id: tenantId, name: tenantName, slug, kind } }),
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
   * Login exige o slug da clínica porque email só é único por tenant — sem o
   * slug não há como saber em qual tenant procurar sem contornar a RLS.
   */
  async login(dto: LoginDto) {
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
}
