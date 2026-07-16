import { BadRequestException, Injectable, Logger, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnrollmentSource, SubscriptionStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CreatePayoutAccountDto } from './dto/create-payout-account.dto';
import { CreatePlatformSubscriptionDto } from './dto/create-platform-subscription.dto';
import { PLANS } from '../billing/plans';

/**
 * Integração com o Asaas (gateway nacional escolhido no §03 do doc de
 * arquitetura), cobrindo as três pontas do desenho original: (1) sub-conta do
 * tenant que recebe o split das cobranças de paciente, (2) assinatura do
 * tenant na própria plataforma, (3) cobrança do paciente com split pro
 * tenant. Mesmo estágio dos outros serviços externos (Stripe/Anthropic/Daily):
 * sem ASAAS_API_KEY configurada, os endpoints respondem 503.
 *
 * AVISO DE HONESTIDADE: não há conta sandbox real do Asaas disponível pra
 * testar contra a API de verdade nesta sessão. Os endpoints e nomes de campo
 * abaixo (`/accounts`, `/customers`, `/subscriptions`, `/payments`, o formato
 * do `split`, o header `access_token`, o header de webhook) seguem a
 * documentação pública do Asaas, mas confira contra https://docs.asaas.com
 * antes de ligar isso em produção — a API pode ter campos obrigatórios a mais
 * (ex: endereço completo na criação de sub-conta) que só aparecem como erro
 * 400 vindo do Asaas em tempo real, já que não há como simular isso aqui.
 */
@Injectable()
export class AsaasService {
  private readonly logger = new Logger(AsaasService.name);
  private readonly apiKey: string | undefined;
  private readonly baseUrl: string;
  private readonly webhookToken: string | undefined;
  private readonly platformFeePercent: number;

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.apiKey = this.config.get<string>('ASAAS_API_KEY') || undefined;
    this.baseUrl = this.config.get<string>('ASAAS_BASE_URL') || 'https://api-sandbox.asaas.com/v3';
    this.webhookToken = this.config.get<string>('ASAAS_WEBHOOK_TOKEN') || undefined;
    this.platformFeePercent = Number(this.config.get<string>('ASAAS_PLATFORM_FEE_PERCENT') ?? '0');
    if (!this.apiKey) {
      this.logger.warn(
        'ASAAS_API_KEY não configurada — endpoints de pagamento nacional (Asaas) vão responder 503 até isso ser preenchido no .env.',
      );
    }
  }

  private requireConfigured(): string {
    if (!this.apiKey) {
      throw new ServiceUnavailableException(
        'Pagamento via Asaas ainda não configurado: defina ASAAS_API_KEY em apps/api/.env com uma chave da sua conta Asaas (sandbox ou produção).',
      );
    }
    return this.apiKey;
  }

  private async request<T>(path: string, init: RequestInit): Promise<T> {
    const apiKey = this.requireConfigured();
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: { access_token: apiKey, 'Content-Type': 'application/json', ...(init.headers ?? {}) },
    });
    const text = await res.text();
    if (!res.ok) {
      throw new ServiceUnavailableException(`Falha na chamada ao Asaas (${path}): ${text}`);
    }
    return text ? (JSON.parse(text) as T) : (undefined as T);
  }

  /** Cria a sub-conta do tenant no Asaas — o walletId dela é o destino do split nas cobranças do Financeiro (Invoice). */
  async createPayoutAccount(dto: CreatePayoutAccountDto) {
    const { tenantId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();
    const tenant = await tenantPrisma.tenant.findUniqueOrThrow({ where: { id: tenantId } });

    if (tenant.payoutAccountId) {
      throw new BadRequestException('Este tenant já tem uma sub-conta de recebimento vinculada.');
    }

    const account = await this.request<{ walletId: string }>('/accounts', {
      method: 'POST',
      body: JSON.stringify({
        name: dto.name,
        email: dto.email,
        cpfCnpj: dto.cpfCnpj.replace(/\D/g, ''),
        mobilePhone: dto.mobilePhone.replace(/\D/g, ''),
        companyType: dto.companyType,
      }),
    });

    await tenantPrisma.tenant.update({
      where: { id: tenantId },
      data: { payoutProvider: 'asaas', payoutAccountId: account.walletId },
    });

    return { payoutProvider: 'asaas', payoutAccountId: account.walletId };
  }

  /** Cliente Asaas do tenant como PAGADOR da assinatura da plataforma — não confundir com a sub-conta acima, onde o tenant é o RECEBEDOR. */
  private async ensurePlatformCustomer(tenantId: string, dto: CreatePlatformSubscriptionDto) {
    const existing = await this.prisma.forCurrentTenant().subscription.findUnique({ where: { tenantId } });
    if (existing?.asaasCustomerId) return existing.asaasCustomerId;

    const customer = await this.request<{ id: string }>('/customers', {
      method: 'POST',
      body: JSON.stringify({ name: dto.name, cpfCnpj: dto.cpfCnpj, email: dto.email }),
    });

    await this.prisma.forCurrentTenant().subscription.upsert({
      where: { tenantId },
      create: { tenantId, asaasCustomerId: customer.id, status: SubscriptionStatus.TRIALING },
      update: { asaasCustomerId: customer.id },
    });

    return customer.id;
  }

  /** Assinatura recorrente do tenant na própria plataforma. Status real chega depois via webhook, não aqui. */
  async createPlatformSubscription(dto: CreatePlatformSubscriptionDto) {
    const { tenantId } = getRequestContext();
    const customerId = await this.ensurePlatformCustomer(tenantId, dto);
    const plan = PLANS[dto.plan];

    const nextDueDate = new Date();
    nextDueDate.setDate(nextDueDate.getDate() + 1);

    const sub = await this.request<{ id: string }>('/subscriptions', {
      method: 'POST',
      body: JSON.stringify({
        customer: customerId,
        billingType: 'UNDEFINED',
        cycle: plan.cycle,
        value: plan.valueCents / 100,
        nextDueDate: nextDueDate.toISOString().slice(0, 10),
        description: 'Assinatura Portal do Psi',
      }),
    });

    await this.prisma.forCurrentTenant().subscription.update({
      where: { tenantId },
      data: { asaasSubscriptionId: sub.id },
    });

    return { asaasSubscriptionId: sub.id };
  }

  /**
   * Cobrança do paciente com split pro walletId da sub-conta do tenant. Grava
   * asaasPaymentId/paymentLink na Invoice. `tenantId` explícito é obrigatório
   * pro fluxo de agendamento público (BookingService), que não tem
   * RequestContext (visitante não autenticado) — nesse caso não dá pra usar
   * forCurrentTenant(). Rotas autenticadas (Financeiro) continuam sem passar
   * o parâmetro, caindo no tenant da requisição atual.
   */
  async createSplitCharge(invoiceId: string, tenantId?: string) {
    const tenantPrisma = this.prisma.forTenant(tenantId ?? getRequestContext().tenantId);
    const invoice = await tenantPrisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { patient: true, tenant: true },
    });
    if (!invoice) throw new NotFoundException('Cobrança não encontrada.');
    if (!invoice.tenant.payoutAccountId) {
      throw new BadRequestException(
        'Este psicólogo ainda não tem sub-conta de recebimento vinculada — crie uma em POST /asaas/payout-account antes de cobrar via Asaas.',
      );
    }
    if (!invoice.patient.cpfCnpj) {
      throw new BadRequestException('Cadastre o CPF/CNPJ do paciente antes de gerar uma cobrança via Asaas.');
    }
    if (invoice.asaasPaymentId) {
      throw new BadRequestException('Esta cobrança já tem um pagamento Asaas gerado.');
    }

    const customer = await this.request<{ id: string }>('/customers', {
      method: 'POST',
      body: JSON.stringify({
        name: invoice.patient.name,
        email: invoice.patient.email ?? undefined,
        cpfCnpj: invoice.patient.cpfCnpj,
      }),
    });

    const percentualValue = 100 - this.platformFeePercent;
    const payment = await this.request<{ id: string; invoiceUrl: string }>('/payments', {
      method: 'POST',
      body: JSON.stringify({
        customer: customer.id,
        billingType: 'UNDEFINED',
        value: invoice.amountCents / 100,
        dueDate: invoice.dueDate.toISOString().slice(0, 10),
        split: [{ walletId: invoice.tenant.payoutAccountId, percentualValue }],
      }),
    });

    return tenantPrisma.invoice.update({
      where: { id: invoiceId },
      data: { asaasPaymentId: payment.id, paymentLink: payment.invoiceUrl },
    });
  }

  /**
   * Cobrança avulsa do Marketplace — sem split, vai inteira pra conta da
   * própria plataforma (não do psicólogo). `externalReference` no formato
   * `enrollment:<tenantId>:<courseSlug>` é como o webhook identifica qual
   * matrícula liberar quando o pagamento confirmar (ver handleWebhook).
   */
  async createOneTimePayment(params: {
    name: string;
    email?: string;
    cpfCnpj: string;
    valueCents: number;
    description: string;
    externalReference: string;
  }) {
    const customer = await this.request<{ id: string }>('/customers', {
      method: 'POST',
      body: JSON.stringify({ name: params.name, email: params.email, cpfCnpj: params.cpfCnpj }),
    });

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 3);

    const payment = await this.request<{ id: string; invoiceUrl: string }>('/payments', {
      method: 'POST',
      body: JSON.stringify({
        customer: customer.id,
        billingType: 'UNDEFINED',
        value: params.valueCents / 100,
        dueDate: dueDate.toISOString().slice(0, 10),
        description: params.description,
        externalReference: params.externalReference,
      }),
    });

    return { paymentId: payment.id, paymentLink: payment.invoiceUrl };
  }

  /** Webhook público do Asaas — autenticado pelo token configurado no painel deles (header asaas-access-token), não por JWT. */
  async handleWebhook(
    token: string | undefined,
    body: { payment?: { id: string; subscription?: string; status: string; externalReference?: string } },
  ) {
    if (this.webhookToken && token !== this.webhookToken) {
      throw new BadRequestException('Token de webhook Asaas inválido.');
    }

    const payment = body.payment;
    if (!payment) return { received: true };

    const invoiceStatus = mapAsaasStatusToInvoice(payment.status);
    if (invoiceStatus) {
      // invoices/subscriptions têm RLS forçado — precisa de forSystem() (sentinela '__system__'),
      // o client cru sempre volta zero linhas afetadas aqui. Webhook não tem tenant no contexto de
      // request; asaasPaymentId vem do Asaas (não de input do usuário), então é confiável.
      await this.prisma.forSystem().invoice.updateMany({ where: { asaasPaymentId: payment.id }, data: { status: invoiceStatus } });

      /// Agendamento público (ver BookingService): confirma o Appointment/AvailabilitySlot
      /// vinculados assim que o Invoice da reserva vira "pago". appointments/
      /// availability_slots NÃO têm a exceção '__system__' na RLS (de propósito, mesmo
      /// padrão de patients) — por isso resolve o tenantId de cada invoice primeiro e usa
      /// forTenant(tenantId) explícito, nunca forSystem() nessas duas tabelas.
      if (invoiceStatus === 'pago') {
        const paidInvoices = await this.prisma
          .forSystem()
          .invoice.findMany({ where: { asaasPaymentId: payment.id, appointmentId: { not: null } }, select: { tenantId: true, appointmentId: true } });
        for (const inv of paidInvoices) {
          if (!inv.appointmentId) continue;
          const tenantPrisma = this.prisma.forTenant(inv.tenantId);
          await tenantPrisma.appointment.update({ where: { id: inv.appointmentId }, data: { status: 'confirmado' } });
          await tenantPrisma.availabilitySlot.updateMany({ where: { appointmentId: inv.appointmentId }, data: { status: 'confirmado', heldUntil: null } });
        }
      }
    }

    if (payment.subscription) {
      const subStatus = mapAsaasStatusToSubscription(payment.status);
      if (subStatus) {
        await this.prisma.forSystem().subscription.updateMany({
          where: { asaasSubscriptionId: payment.subscription },
          data: { status: subStatus },
        });
      }
    }

    if (payment.externalReference?.startsWith('enrollment:') && mapAsaasStatusToInvoice(payment.status) === 'pago') {
      const [, tenantId, courseSlug] = payment.externalReference.split(':');
      if (tenantId && courseSlug) {
        await this.prisma.forSystem().courseEnrollment.upsert({
          where: { tenantId_courseSlug: { tenantId, courseSlug } },
          create: { tenantId, courseSlug, source: EnrollmentSource.MARKETPLACE, paymentProvider: 'asaas', externalPaymentId: payment.id },
          update: { paymentProvider: 'asaas', externalPaymentId: payment.id },
        });
      }
    }

    return { received: true };
  }
}

function mapAsaasStatusToInvoice(status: string): string | undefined {
  switch (status) {
    case 'RECEIVED':
    case 'CONFIRMED':
    case 'RECEIVED_IN_CASH':
      return 'pago';
    case 'OVERDUE':
      return 'atrasado';
    default:
      return undefined;
  }
}

function mapAsaasStatusToSubscription(status: string): SubscriptionStatus | undefined {
  switch (status) {
    case 'RECEIVED':
    case 'CONFIRMED':
      return SubscriptionStatus.ACTIVE;
    case 'OVERDUE':
      return SubscriptionStatus.PAST_DUE;
    default:
      return undefined;
  }
}
