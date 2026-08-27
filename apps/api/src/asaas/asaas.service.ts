import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnrollmentSource, SubscriptionStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CreatePayoutAccountDto } from './dto/create-payout-account.dto';
import { CreatePlatformSubscriptionDto } from './dto/create-platform-subscription.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { PlatformSettingsService } from '../platform-settings/platform-settings.service';
import { EmailService } from '../email/email.service';

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
    private readonly notifications: NotificationsService,
    private readonly platformSettings: PlatformSettingsService,
    private readonly email: EmailService,
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
        birthDate: dto.birthDate,
        incomeValue: dto.incomeValueCents / 100,
        address: dto.address,
        addressNumber: dto.addressNumber,
        complement: dto.complement,
        province: dto.province,
        postalCode: dto.postalCode.replace(/\D/g, ''),
        companyType: dto.companyType,
      }),
    });

    await tenantPrisma.tenant.update({
      where: { id: tenantId },
      data: { payoutProvider: 'asaas', payoutAccountId: account.walletId },
    });

    return { payoutProvider: 'asaas', payoutAccountId: account.walletId };
  }

  /**
   * Alternativa a createPayoutAccount pra quem já tem conta Asaas própria (de
   * antes, sem relação com a plataforma) — o Asaas recusa criar uma sub-conta
   * nova pro mesmo CPF/e-mail já cadastrado (mesma família de erro do
   * findOrCreateCustomer). Split de pagamento funciona com o Wallet ID de
   * QUALQUER conta Asaas existente, então basta vincular o número direto —
   * sem chamar a API do Asaas pra isso (não temos endpoint de validação de
   * Wallet ID alheio sem gerar uma cobrança de teste).
   */
  async linkExistingPayoutAccount(walletId: string) {
    const { tenantId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();
    const tenant = await tenantPrisma.tenant.findUniqueOrThrow({ where: { id: tenantId } });

    if (tenant.payoutAccountId) {
      throw new BadRequestException('Este tenant já tem uma sub-conta de recebimento vinculada.');
    }

    await tenantPrisma.tenant.update({
      where: { id: tenantId },
      data: { payoutProvider: 'asaas', payoutAccountId: walletId.trim() },
    });

    return { payoutProvider: 'asaas', payoutAccountId: walletId.trim() };
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

  /**
   * Assinatura recorrente do tenant na própria plataforma. Status real chega
   * depois via webhook, não aqui.
   *
   * Idempotente por tenant: se já existe `asaasSubscriptionId` gravado,
   * reaproveita em vez de criar outra assinatura no Asaas — criar duas pra
   * o mesmo tenant deixa a primeira (possivelmente já paga) órfã, porque
   * `asaasSubscriptionId` é um campo único e a segunda chamada sobrescreve
   * a primeira; o webhook da assinatura paga então não bate mais com nada
   * no banco. Foi exatamente esse bug que causou uma assinatura paga via
   * Pix nunca ativar (2026-07-29) — corrigido aqui na origem.
   *
   * Também recusa criar uma assinatura nova se o tenant já está com
   * `status: ACTIVE` (inclusive cortesia do Programa Piloto, que não grava
   * `asaasSubscriptionId` e por isso não caía na checagem de idempotência
   * acima) — sem essa trava, um tenant já com acesso liberado que preenche
   * o formulário de "Assinar" (ex: por engano, achando que precisa) cria uma
   * assinatura recorrente real no Asaas do zero, gerando cobranças de
   * verdade sem necessidade (caso real: Pamela Forziati, 2026-08-03).
   */
  async createPlatformSubscription(dto: CreatePlatformSubscriptionDto) {
    const { tenantId } = getRequestContext();
    const existing = await this.prisma.forCurrentTenant().subscription.findUnique({ where: { tenantId } });
    if (existing?.status === SubscriptionStatus.ACTIVE && !existing.asaasSubscriptionId) {
      throw new ConflictException('Sua assinatura já está ativa — não é necessário assinar novamente.');
    }
    if (existing?.asaasSubscriptionId) {
      const paymentLink = await this.fetchPendingPaymentLink(existing.asaasSubscriptionId);
      return { asaasSubscriptionId: existing.asaasSubscriptionId, paymentLink };
    }

    const customerId = await this.ensurePlatformCustomer(tenantId, dto);
    const plan = (await this.platformSettings.getEffectivePlans())[dto.plan];

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

    const paymentLink = await this.fetchPendingPaymentLink(sub.id);
    return { asaasSubscriptionId: sub.id, paymentLink };
  }

  /**
   * Link de pagamento (invoiceUrl) da cobrança em aberto mais próxima do
   * vencimento — a assinatura no Asaas é criada com `billingType: 'UNDEFINED'`,
   * então o link hospedado por eles é onde o pagador escolhe Pix/boleto/cartão.
   * Usado tanto logo após criar a assinatura quanto depois, pra renovação.
   */
  private async fetchPendingPaymentLink(asaasSubscriptionId: string): Promise<string | null> {
    const { data } = await this.request<{ data: { status: string; invoiceUrl: string; dueDate: string }[] }>(
      `/subscriptions/${asaasSubscriptionId}/payments`,
      { method: 'GET' },
    );
    const pending = data
      .filter((p) => p.status === 'PENDING' || p.status === 'OVERDUE')
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    return pending[0]?.invoiceUrl ?? null;
  }

  /** Link de pagamento da assinatura do tenant atual — usado pra reexibir o "pagar agora" sem recriar a assinatura. */
  async getSubscriptionPaymentLink() {
    const { tenantId } = getRequestContext();
    const subscription = await this.prisma.forCurrentTenant().subscription.findUnique({ where: { tenantId } });
    if (!subscription?.asaasSubscriptionId) {
      throw new NotFoundException('Nenhuma assinatura Asaas encontrada para este tenant.');
    }
    const paymentLink = await this.fetchPendingPaymentLink(subscription.asaasSubscriptionId);
    return { paymentLink };
  }

  /**
   * Valor/ciclo reais da assinatura direto do Asaas — não persistimos o plano
   * escolhido no momento da criação (só o asaasSubscriptionId), então o resumo
   * de receita do admin (AdminService.getRevenueSummary) busca ao vivo. Só é
   * chamado para as poucas assinaturas ACTIVE de cada vez, nunca em rota
   * quente — `null` em qualquer falha pra não derrubar o resumo inteiro por
   * causa de uma assinatura isolada com problema.
   */
  async getSubscriptionValueAndCycle(asaasSubscriptionId: string): Promise<{ valueCents: number; cycle: string } | null> {
    try {
      const sub = await this.request<{ value: number; cycle: string }>(`/subscriptions/${asaasSubscriptionId}`, { method: 'GET' });
      return { valueCents: Math.round(sub.value * 100), cycle: sub.cycle };
    } catch {
      return null;
    }
  }

  /**
   * Clientes Asaas são criados sob a MESMA conta-mestre da plataforma,
   * compartilhada entre todos os tenants — então o mesmo CPF já usado em
   * QUALQUER cobrança anterior (de qualquer clínica, inclusive um teste que
   * falhou depois e foi desfeito só no nosso banco) faz o Asaas recusar uma
   * nova criação como duplicada. Em vez de travar, busca o cliente já
   * existente pelo CPF/CNPJ e reaproveita — mesmo padrão de idempotência que
   * ensurePlatformCustomer já usa pra assinatura do tenant.
   */
  private async findOrCreateCustomer(name: string, email: string | null, cpfCnpj: string): Promise<string> {
    try {
      const customer = await this.request<{ id: string }>('/customers', {
        method: 'POST',
        body: JSON.stringify({ name, email: email ?? undefined, cpfCnpj }),
      });
      return customer.id;
    } catch (err) {
      const existing = await this.request<{ data: { id: string }[] }>(`/customers?cpfCnpj=${encodeURIComponent(cpfCnpj)}`, {
        method: 'GET',
      });
      if (existing.data?.[0]) return existing.data[0].id;
      throw err;
    }
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

    // Reaproveita o cliente Asaas já criado antes (mesmo padrão de
    // ensurePlatformCustomer) — criar um novo a cada cobrança faz o Asaas
    // rejeitar a 2ª tentativa com o mesmo e-mail/CPF como "já em uso".
    let customerId = invoice.patient.asaasCustomerId;
    if (!customerId) {
      customerId = await this.findOrCreateCustomer(invoice.patient.name, invoice.patient.email, invoice.patient.cpfCnpj);
      await tenantPrisma.patient.update({ where: { id: invoice.patient.id }, data: { asaasCustomerId: customerId } });
    }

    const percentualValue = 100 - this.platformFeePercent;
    const payment = await this.request<{ id: string; invoiceUrl: string }>('/payments', {
      method: 'POST',
      body: JSON.stringify({
        customer: customerId,
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
          await this.confirmBookingForPaidInvoice(inv.tenantId, inv.appointmentId);
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
      // 4º segmento (patientId) é opcional — presente só quando a compra veio do portal do paciente
      // (ver PatientCoursesService.purchase), ausente no fluxo clássico ESTUDANTE (só 3 segmentos).
      const [, tenantId, courseSlug, patientId] = payment.externalReference.split(':');
      if (tenantId && courseSlug) {
        // upsert com a chave composta não dá — patientId null não é aceito num compound unique lookup do Prisma (findFirst + create/update manual).
        const enrollmentPrisma = this.prisma.forSystem().courseEnrollment;
        const existing = await enrollmentPrisma.findFirst({ where: { tenantId, courseSlug, patientId: patientId ?? null } });
        if (existing) {
          await enrollmentPrisma.update({ where: { id: existing.id }, data: { paymentProvider: 'asaas', externalPaymentId: payment.id } });
        } else {
          await enrollmentPrisma.create({
            data: { tenantId, courseSlug, patientId: patientId ?? null, source: EnrollmentSource.MARKETPLACE, paymentProvider: 'asaas', externalPaymentId: payment.id },
          });
        }
      }
    }

    return { received: true };
  }

  /**
   * Confirma o Appointment/AvailabilitySlot de um agendamento público assim
   * que a cobrança vinculada vira "pago" — chamado tanto pelo webhook do
   * Asaas (acima) quanto por InvoicesService.updateStatus, quando alguém
   * marca a cobrança como paga manualmente na tela Financeiro.
   *
   * Sem isso, marcar "Pago" manualmente numa cobrança de agendamento não
   * confirmava o Appointment nem desarmava o hold de 15min do horário —
   * bug real que cancelou uma sessão já paga porque
   * AvailabilityService.expireStaleHolds só olha o relógio do hold, nunca o
   * status da cobrança (caso real: Lorena Barreto, 2026-08-03).
   */
  async confirmBookingForPaidInvoice(tenantId: string, appointmentId: string) {
    const tenantPrisma = this.prisma.forTenant(tenantId);
    const appointment = await tenantPrisma.appointment.update({
      where: { id: appointmentId },
      data: { status: 'confirmado', cancelReason: null },
    });
    await tenantPrisma.availabilitySlot.updateMany({ where: { appointmentId }, data: { status: 'confirmado', heldUntil: null } });
    await this.notifications.notifyPatient(tenantId, appointment.patientId, {
      title: 'Consulta confirmada',
      body: `Sua sessão de ${appointment.startsAt.toLocaleString('pt-BR')} foi confirmada.`,
    });

    const [patient, professional] = await Promise.all([
      tenantPrisma.patient.findUnique({ where: { id: appointment.patientId }, select: { name: true, email: true } }),
      tenantPrisma.user.findFirst({ where: { role: 'PSICOLOGO_TITULAR' }, select: { name: true, email: true } }),
    ]);
    if (patient && professional) {
      await this.email.sendBookingConfirmation({ patient, professional, startsAt: appointment.startsAt });
    }
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
