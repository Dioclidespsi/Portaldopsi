import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { TenantKind } from '@prisma/client';
import * as fs from 'fs';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CoursesService } from '../courses/courses.service';
import { AuthService } from '../auth/auth.service';
import { BillingService } from '../billing/billing.service';
import { AsaasService } from '../asaas/asaas.service';
import { AiService } from '../ai/ai.service';
import { PurchaseDto } from './dto/purchase.dto';
import { EnrollDto } from './dto/enroll.dto';

/**
 * Matrícula com pagamento real — a era de "matrícula manual/gratuita" acabou
 * junto com a decisão de preço confirmada (ver admin/course-prices). O
 * CourseEnrollment só é criado quando o webhook (Stripe checkout.session.
 * completed ou Asaas payment com externalReference `enrollment:...`)
 * confirma o pagamento — nunca direto aqui, mesmo padrão do Financeiro.
 */
@Injectable()
export class MarketplaceService {
  private readonly logger = new Logger(MarketplaceService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly courses: CoursesService,
    private readonly auth: AuthService,
    private readonly billing: BillingService,
    private readonly asaas: AsaasService,
    private readonly ai: AiService,
  ) {}

  listCourses() {
    return this.courses.listPublicCatalog();
  }

  /**
   * Registra o aceite do(s) Termo(s) de Uso do Aluno (audience=ESTUDANTE)
   * — sem RLS nessas duas tabelas (document_templates/document_acceptances
   * não têm tenantId), então o client cru já é seguro aqui, mesmo sem
   * contexto de tenant "atual" (purchase() roda em rota pública, antes de
   * qualquer AuthMiddleware). Chamado só depois de termsAccepted=true ser
   * validado pelo DTO (@Equals(true) em PurchaseDto, checagem manual em enroll).
   */
  private async acceptEstudanteTerms(userId: string) {
    const templates = await this.prisma.documentTemplate.findMany({
      where: { requiresAcceptance: true, audience: 'ESTUDANTE' },
      select: { id: true },
    });
    await Promise.all(
      templates.map((t) =>
        this.prisma.documentAcceptance.upsert({
          where: { documentTemplateId_userId: { documentTemplateId: t.id, userId } },
          update: {},
          create: { documentTemplateId: t.id, userId },
        }),
      ),
    );
  }

  private async requirePrice(courseSlug: string): Promise<number> {
    if (!(await this.courses.courseExists(courseSlug))) {
      throw new NotFoundException('Curso não encontrado.');
    }
    const priceCents = await this.courses.getCoursePriceCents(courseSlug);
    if (priceCents === null) {
      throw new BadRequestException('Este curso ainda não tem preço configurado — fale com o administrador da plataforma.');
    }
    return priceCents;
  }

  /**
   * Fluxo público: visitante sem conta compra um curso e vira tenant
   * ESTUDANTE. Item 4: exige declaração de matrícula — a IA faz uma
   * checagem de plausibilidade (nunca verificação oficial) e libera o
   * curso na hora se aprovar; senão, fica em EM_ANALISE até o ADM decidir
   * (mesmo padrão da fila de CRP). O pagamento segue em paralelo — mesmo
   * pagando, o conteúdo do curso só abre com studentVerificationStatus
   * VERIFICADO (ver CoursesService.hasModuleAccess).
   */
  async purchase(dto: PurchaseDto, document?: Express.Multer.File) {
    if (!document) throw new BadRequestException('Envie a declaração de matrícula (PDF, JPG ou PNG).');

    const priceCents = await this.requirePrice(dto.courseSlug);
    const courseTitle = await this.courses.getCourseTitle(dto.courseSlug);

    const { tenant, user } = await this.auth.createTenantWithUser(
      TenantKind.ESTUDANTE,
      dto.name,
      dto.slug,
      dto.name,
      dto.email,
      dto.password,
    );

    const { approved, note } = await this.verifyEnrollment(dto, document);
    await this.prisma.forTenant(tenant.id).user.update({
      where: { id: user.id },
      data: {
        studentInstitution: dto.institution,
        studentEnrollmentNumber: dto.enrollmentNumber,
        studentDocumentPath: document.filename,
        studentVerificationStatus: approved ? 'VERIFICADO' : 'EM_ANALISE',
        studentVerificationNote: note,
      },
    });

    await this.acceptEstudanteTerms(user.id);

    const { accessToken } = this.auth.issueToken({ sub: user.id, tenantId: tenant.id, role: user.role, tenantKind: tenant.kind });

    const payment = await this.startPayment(dto.provider, tenant.id, dto.courseSlug, courseTitle, priceCents, {
      name: dto.name,
      email: dto.email,
      cpfCnpj: dto.cpfCnpj,
      successUrl: dto.successUrl,
      cancelUrl: dto.cancelUrl,
    });

    return { accessToken, enrollmentStatus: approved ? 'VERIFICADO' : 'EM_ANALISE', ...payment };
  }

  private async verifyEnrollment(
    dto: PurchaseDto,
    document: Express.Multer.File,
  ): Promise<{ approved: boolean; note: string }> {
    try {
      const documentBase64 = fs.readFileSync(document.path).toString('base64');
      return await this.ai.verifyStudentEnrollment({
        name: dto.name,
        institution: dto.institution,
        enrollmentNumber: dto.enrollmentNumber,
        documentBase64,
        documentMimeType: document.mimetype,
      });
    } catch (err) {
      this.logger.error(`Falha ao verificar matrícula: ${(err as Error).message}`);
      return { approved: false, note: 'Não foi possível concluir a checagem automática — encaminhado para revisão manual.' };
    }
  }

  /**
   * Fluxo autenticado: tenant já existente (CLINICA ou ESTUDANTE) compra mais
   * um curso avulso. Aceite de termos só se aplica a ESTUDANTE — CLINICA já
   * tem o próprio gate de termos (AccessGateService, termo audience=STAFF).
   */
  async enroll(dto: EnrollDto) {
    const { tenantId, userId, tenantKind } = getRequestContext();
    if (tenantKind === 'ESTUDANTE' && dto.termsAccepted !== true) {
      throw new BadRequestException('É necessário aceitar o Termo de Uso.');
    }
    const priceCents = await this.requirePrice(dto.courseSlug);
    const courseTitle = await this.courses.getCourseTitle(dto.courseSlug);

    const tenantPrisma = this.prisma.forCurrentTenant();
    const existing = await tenantPrisma.courseEnrollment.findFirst({
      where: { tenantId, courseSlug: dto.courseSlug, patientId: null },
    });
    if (existing) throw new ConflictException('Você já tem acesso a este curso.');

    const user = await tenantPrisma.user.findUniqueOrThrow({ where: { id: userId } });
    if (tenantKind === 'ESTUDANTE') await this.acceptEstudanteTerms(userId);

    return this.startPayment(dto.provider, tenantId, dto.courseSlug, courseTitle, priceCents, {
      name: user.name,
      email: user.email,
      cpfCnpj: dto.cpfCnpj,
      successUrl: dto.successUrl,
      cancelUrl: dto.cancelUrl,
    });
  }

  private async startPayment(
    provider: 'STRIPE' | 'ASAAS',
    tenantId: string,
    courseSlug: string,
    courseTitle: string,
    priceCents: number,
    payer: { name: string; email: string; cpfCnpj?: string; successUrl?: string; cancelUrl?: string },
  ) {
    if (provider === 'STRIPE') {
      if (!payer.successUrl || !payer.cancelUrl) {
        throw new BadRequestException('successUrl e cancelUrl são obrigatórios para pagamento via Stripe.');
      }
      return this.billing.createMarketplaceCheckout(tenantId, courseSlug, courseTitle, priceCents, payer.successUrl, payer.cancelUrl);
    }

    if (!payer.cpfCnpj) {
      throw new BadRequestException('cpfCnpj é obrigatório para pagamento via Asaas.');
    }
    return this.asaas.createOneTimePayment({
      name: payer.name,
      email: payer.email,
      cpfCnpj: payer.cpfCnpj,
      valueCents: priceCents,
      description: `Curso: ${courseTitle}`,
      externalReference: `enrollment:${tenantId}:${courseSlug}`,
    });
  }
}
