import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { TenantKind } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CoursesService } from '../courses/courses.service';
import { AuthService } from '../auth/auth.service';
import { BillingService } from '../billing/billing.service';
import { AsaasService } from '../asaas/asaas.service';
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
  constructor(
    private readonly prisma: PrismaService,
    private readonly courses: CoursesService,
    private readonly auth: AuthService,
    private readonly billing: BillingService,
    private readonly asaas: AsaasService,
  ) {}

  listCourses() {
    return this.courses.listPublicCatalog();
  }

  private async requirePrice(courseSlug: string): Promise<number> {
    if (!this.courses.courseExists(courseSlug)) {
      throw new NotFoundException('Curso não encontrado.');
    }
    const priceCents = await this.courses.getCoursePriceCents(courseSlug);
    if (priceCents === null) {
      throw new BadRequestException('Este curso ainda não tem preço configurado — fale com o administrador da plataforma.');
    }
    return priceCents;
  }

  /** Fluxo público: visitante sem conta compra um curso e vira tenant ESTUDANTE. */
  async purchase(dto: PurchaseDto) {
    const priceCents = await this.requirePrice(dto.courseSlug);
    const courseTitle = this.courses.getCourseTitle(dto.courseSlug);

    const { tenant, user } = await this.auth.createTenantWithUser(
      TenantKind.ESTUDANTE,
      dto.name,
      dto.slug,
      dto.name,
      dto.email,
      dto.password,
    );
    const { accessToken } = this.auth.issueToken({ sub: user.id, tenantId: tenant.id, role: user.role, tenantKind: tenant.kind });

    const payment = await this.startPayment(dto.provider, tenant.id, dto.courseSlug, courseTitle, priceCents, {
      name: dto.name,
      email: dto.email,
      cpfCnpj: dto.cpfCnpj,
      successUrl: dto.successUrl,
      cancelUrl: dto.cancelUrl,
    });

    return { accessToken, ...payment };
  }

  /** Fluxo autenticado: tenant já existente (CLINICA ou ESTUDANTE) compra mais um curso avulso. */
  async enroll(dto: EnrollDto) {
    const { tenantId, userId } = getRequestContext();
    const priceCents = await this.requirePrice(dto.courseSlug);
    const courseTitle = this.courses.getCourseTitle(dto.courseSlug);

    const tenantPrisma = this.prisma.forCurrentTenant();
    const existing = await tenantPrisma.courseEnrollment.findUnique({
      where: { tenantId_courseSlug: { tenantId, courseSlug: dto.courseSlug } },
    });
    if (existing) throw new ConflictException('Você já tem acesso a este curso.');

    const user = await tenantPrisma.user.findUniqueOrThrow({ where: { id: userId } });

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
