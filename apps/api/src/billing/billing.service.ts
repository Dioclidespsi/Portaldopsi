import { BadRequestException, Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { EnrollmentSource, SubscriptionStatus } from '@prisma/client';
import { AsaasService } from '../asaas/asaas.service';
import { CreatePlatformSubscriptionDto } from '../asaas/dto/create-platform-subscription.dto';
import { PLANS, PlanKey } from './plans';

/**
 * Assinatura do TENANT na própria plataforma (o psicólogo pagando o Portal do
 * Psi) — não confundir com Invoice, que é o módulo Financeiro (o psicólogo
 * cobrando o paciente dele). Stripe (cartão internacional, ver §07) é
 * secundário; Asaas (Pix/boleto nacional) é o gateway principal — ver
 * createAsaasSubscription/AsaasService.createPlatformSubscription.
 */
@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);
  private readonly stripe: Stripe | null;

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly asaas: AsaasService,
  ) {
    const key = config.get<string>('STRIPE_SECRET_KEY');
    this.stripe = key ? new Stripe(key) : null;
    if (!this.stripe) {
      this.logger.warn(
        'STRIPE_SECRET_KEY não configurada — endpoints de billing vão responder 503 até isso ser preenchido no .env.',
      );
    }
  }

  private requireStripe(): Stripe {
    if (!this.stripe) {
      throw new ServiceUnavailableException(
        'Billing ainda não configurado: defina STRIPE_SECRET_KEY em apps/api/.env com uma chave de teste da sua conta Stripe.',
      );
    }
    return this.stripe;
  }

  private resolveStripePriceId(plan: PlanKey): string {
    const envKey = plan === 'MONTHLY' ? 'STRIPE_PRICE_MONTHLY' : 'STRIPE_PRICE_YEARLY';
    const priceId = this.config.get<string>(envKey);
    if (!priceId) {
      throw new ServiceUnavailableException(
        `Plano "${PLANS[plan].label}" ainda não tem Price configurado: defina ${envKey} em apps/api/.env com o id do Price criado no seu painel Stripe.`,
      );
    }
    return priceId;
  }

  async createCheckoutSession(plan: PlanKey, successUrl: string, cancelUrl: string) {
    const stripe = this.requireStripe();
    const priceId = this.resolveStripePriceId(plan);
    const { tenantId } = getRequestContext();

    let subscription = await this.prisma.forCurrentTenant().subscription.findUnique({ where: { tenantId } });

    let customerId = subscription?.stripeCustomerId ?? undefined;
    if (!customerId) {
      const tenant = await this.prisma.forCurrentTenant().tenant.findUniqueOrThrow({ where: { id: tenantId } });
      const customer = await stripe.customers.create({ name: tenant.name, metadata: { tenantId } });
      customerId = customer.id;
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { tenantId },
    });

    await this.prisma.forCurrentTenant().subscription.upsert({
      where: { tenantId },
      create: { tenantId, stripeCustomerId: customerId, status: SubscriptionStatus.TRIALING },
      update: { stripeCustomerId: customerId },
    });

    return { checkoutUrl: session.url };
  }

  createAsaasSubscription(dto: CreatePlatformSubscriptionDto) {
    return this.asaas.createPlatformSubscription(dto);
  }

  /**
   * Checkout avulso (Marketplace) — `mode: 'payment'`, não `'subscription'`.
   * Usa `price_data` inline em vez de um Price pré-criado porque o valor vem
   * do CoursePrice admin-editável, não de um plano fixo como a assinatura.
   */
  async createMarketplaceCheckout(
    tenantId: string,
    courseSlug: string,
    courseTitle: string,
    priceCents: number,
    successUrl: string,
    cancelUrl: string,
  ) {
    const stripe = this.requireStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: { currency: 'brl', product_data: { name: courseTitle }, unit_amount: priceCents },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { tenantId, courseSlug, kind: 'marketplace' },
    });
    return { checkoutUrl: session.url };
  }

  listPlans() {
    return PLANS;
  }

  async getSubscription() {
    const { tenantId } = getRequestContext();
    const subscription = await this.prisma.forCurrentTenant().subscription.findUnique({
      where: { tenantId },
      select: { status: true, currentPeriodEnd: true, stripeCustomerId: true, asaasCustomerId: true },
    });
    if (!subscription) return { status: SubscriptionStatus.TRIALING, currentPeriodEnd: null, hasStripe: false, hasAsaas: false };
    const { stripeCustomerId, asaasCustomerId, ...rest } = subscription;
    return { ...rest, hasStripe: !!stripeCustomerId, hasAsaas: !!asaasCustomerId };
  }

  /** Chamado sem tenant no contexto (rota pública) — Stripe é a fonte da verdade sobre qual tenant é afetado, via metadata. */
  async handleWebhook(rawBody: Buffer, signature: string) {
    const stripe = this.requireStripe();
    const webhookSecret = this.config.getOrThrow<string>('STRIPE_WEBHOOK_SECRET');

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      throw new BadRequestException(`Assinatura do webhook inválida: ${(err as Error).message}`);
    }

    switch (event.type) {
      case 'customer.subscription.updated':
      case 'customer.subscription.created':
        await this.syncSubscription(event.data.object as Stripe.Subscription);
        break;
      case 'customer.subscription.deleted':
        await this.syncSubscription(event.data.object as Stripe.Subscription, SubscriptionStatus.CANCELED);
        break;
      case 'checkout.session.completed':
        await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      default:
        this.logger.debug(`Evento Stripe ignorado: ${event.type}`);
    }

    return { received: true };
  }

  /** Confirma uma compra avulsa do Marketplace (mode: 'payment') e libera a matrícula. */
  private async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    if (session.metadata?.kind !== 'marketplace') return;
    const { tenantId, courseSlug } = session.metadata;
    if (!tenantId || !courseSlug) {
      this.logger.warn(`Webhook Stripe checkout.session.completed sem tenantId/courseSlug (session ${session.id}) — ignorado.`);
      return;
    }
    // course_enrollments tem RLS forçado — precisa de forSystem(), ver AsaasService.handleWebhook para o mesmo padrão.
    // upsert com a chave composta não dá — patientId null não é aceito num compound unique lookup do Prisma (findFirst + create/update manual).
    const enrollmentPrisma = this.prisma.forSystem().courseEnrollment;
    const existing = await enrollmentPrisma.findFirst({ where: { tenantId, courseSlug, patientId: null } });
    if (existing) {
      await enrollmentPrisma.update({ where: { id: existing.id }, data: { paymentProvider: 'stripe', externalPaymentId: session.id } });
    } else {
      await enrollmentPrisma.create({
        data: { tenantId, courseSlug, source: EnrollmentSource.MARKETPLACE, paymentProvider: 'stripe', externalPaymentId: session.id },
      });
    }
  }

  private async syncSubscription(sub: Stripe.Subscription, forceStatus?: SubscriptionStatus) {
    const tenantId = sub.metadata?.tenantId;
    if (!tenantId) {
      this.logger.warn(`Webhook Stripe sem tenantId em metadata (subscription ${sub.id}) — ignorado.`);
      return;
    }

    const status = forceStatus ?? mapStripeStatus(sub.status);
    // subscriptions tem RLS forçado — precisa de forSystem() (sentinela '__system__'), o client
    // cru sempre volta zero linhas afetadas aqui. Contexto de tenant não existe nesta rota
    // pública, e tenantId aqui vem do Stripe (não de input do usuário), então é confiável.
    await this.prisma.forSystem().subscription.update({
      where: { tenantId },
      data: {
        status,
        stripeSubscriptionId: sub.id,
        currentPeriodEnd: new Date(sub.current_period_end * 1000),
      },
    });
  }
}

function mapStripeStatus(status: Stripe.Subscription.Status): SubscriptionStatus {
  switch (status) {
    case 'active':
      return SubscriptionStatus.ACTIVE;
    case 'past_due':
    case 'unpaid':
      return SubscriptionStatus.PAST_DUE;
    case 'canceled':
      return SubscriptionStatus.CANCELED;
    default:
      return SubscriptionStatus.TRIALING;
  }
}
