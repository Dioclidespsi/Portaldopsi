import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { AvailabilityService } from '../availability/availability.service';
import { AsaasService } from '../asaas/asaas.service';
import { TeleconsultaService } from '../teleconsulta/teleconsulta.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { verifyPatientToken } from '../patient-portal/patient-auth.middleware';
import { PatientJwtPayload } from '../patient-portal/patient-jwt.types';

/** Prazo de espera do pagamento antes do horário voltar a ficar disponível — ver AvailabilityService.expireStaleHolds. */
const HOLD_MINUTES = 15;
const SALT_ROUNDS = 12;

/** Espelha o helper de patient-portal — mesma regra, evita acoplar módulos por um one-liner. */
function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly availability: AvailabilityService,
    private readonly asaas: AsaasService,
    private readonly teleconsulta: TeleconsultaService,
    private readonly jwt: JwtService,
  ) {}

  /**
   * Resolve e valida o tenant pra qualquer rota pública de agendamento —
   * mesmo padrão de ProfileService.createPublicLead. CRP verificado é
   * exigido aqui mesmo sem assinatura ativa (o agendamento público é Free,
   * mas CRP é licença profissional, não feature paga — sem isso, ninguém
   * deveria conseguir cobrar paciente por uma sessão).
   */
  private async requireBookableTenant(slug: string) {
    const tenant = await this.prisma.tenant.findUnique({ where: { slug } });
    if (!tenant || !tenant.published) {
      throw new NotFoundException('Página não encontrada ou ainda não publicada.');
    }
    if (!tenant.bookingEnabled || !tenant.sessionPriceCents) {
      throw new BadRequestException('Este profissional ainda não habilitou o agendamento público.');
    }
    const verifiedTitular = await this.prisma.forTenant(tenant.id).user.findFirst({
      where: { role: 'PSICOLOGO_TITULAR', crpStatus: 'VERIFICADO' },
      select: { id: true },
    });
    if (!verifiedTitular) {
      throw new BadRequestException('Este profissional ainda não teve o CRP verificado — agendamento público indisponível.');
    }
    return tenant;
  }

  async listPublicSlots(slug: string) {
    const tenant = await this.requireBookableTenant(slug);
    const tenantPrisma = this.prisma.forTenant(tenant.id);
    await this.availability.expireStaleHolds(tenantPrisma);

    const slots = await tenantPrisma.availabilitySlot.findMany({
      where: { status: 'disponivel', startsAt: { gte: new Date() } },
      orderBy: { startsAt: 'asc' },
      select: { id: true, startsAt: true, endsAt: true },
    });
    return { sessionPriceCents: tenant.sessionPriceCents, slots };
  }

  /**
   * Ponto de entrada único de /public/tenants/:slug/bookings — funciona com
   * ou sem paciente já logado (conta global, ver PatientAccount):
   * - Header Authorization presente e válido → agenda com a conta já
   *   logada, em qualquer clínica (nova ou repetida), sem pedir cadastro
   *   de novo.
   * - Header ausente → fluxo anônimo: cria a conta na hora (login
   *   automático, devolve accessToken).
   * - Header presente mas INVÁLIDO/expirado → 401 explícito (ver
   *   verifyPatientToken), nunca cai pro fluxo anônimo em silêncio.
   */
  async createBooking(slug: string, dto: CreateBookingDto, authHeader?: string) {
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : undefined;
    if (token) {
      const payload: PatientJwtPayload = verifyPatientToken(this.jwt, token);
      return this.createBookingForPatient(slug, payload.sub, dto.slotId);
    }
    return this.createAnonymousBooking(slug, dto);
  }

  /**
   * Visitante sem conta ainda: cria a PatientAccount (login automático) e o
   * vínculo (Patient) com esta clínica juntos. Se o e-mail já tiver conta,
   * rejeita — nunca tenta adivinhar/mesclar senha (risco de sequestro de
   * conta). Se a clínica já tinha um Patient cadastrado manualmente com esse
   * e-mail (nunca convidado pro portal), reaproveita a linha — preserva
   * histórico — em vez de duplicar.
   */
  private async createAnonymousBooking(slug: string, dto: CreateBookingDto) {
    if (!dto.name || !dto.email || !dto.phone || !dto.cpfCnpj || !dto.password) {
      throw new BadRequestException('Preencha nome, e-mail, telefone, CPF/CNPJ e senha pra agendar.');
    }
    if (dto.termsAccepted !== true) {
      throw new BadRequestException('É necessário aceitar o Termo de Uso do Paciente.');
    }
    const tenant = await this.requireBookableTenant(slug);
    const email = normalizeEmail(dto.email);
    const phone = dto.phone.replace(/\D/g, '');
    const cpfCnpj = dto.cpfCnpj.replace(/\D/g, '');

    const existingAccount = await this.prisma.patientAccount.findUnique({ where: { email } });
    if (existingAccount) {
      throw new BadRequestException('Este e-mail já tem uma conta no Portal do Psi — faça login antes de agendar.');
    }

    const tenantPrisma = this.prisma.forTenant(tenant.id);
    const existingPatient = await tenantPrisma.patient.findUnique({
      where: { tenantId_email: { tenantId: tenant.id, email } },
    });

    const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);
    const account = await this.prisma.patientAccount.create({
      data: { email, passwordHash, name: dto.name, phone, cpfCnpj, termsAcceptedAt: new Date() },
    });

    const patient = existingPatient
      ? await tenantPrisma.patient.update({
          where: { id: existingPatient.id },
          data: { name: dto.name, phone, cpfCnpj, patientAccountId: account.id },
        })
      : await tenantPrisma.patient.create({
          data: { tenantId: tenant.id, name: dto.name, email, phone, cpfCnpj, patientAccountId: account.id },
        });

    const booking = await this.claimSlotForPatient(tenant.id, patient.id, dto.slotId, tenant.sessionPriceCents!);
    const payload: PatientJwtPayload = { sub: account.id, kind: 'PACIENTE' };
    return { ...booking, accessToken: this.jwt.sign(payload) };
  }

  /**
   * Paciente já logado (conta global) agenda com uma clínica — nova ou
   * repetida. `upsert` por (tenantId, patientAccountId) evita duplicar o
   * vínculo se ele já tinha atendido aqui antes. Ao criar o vínculo pela
   * primeira vez, copia nome/telefone/cpf/nascimento da conta — senão a
   * cobrança Asaas falha por falta de CPF logo na primeira sessão numa
   * clínica nova.
   */
  async createBookingForPatient(slug: string, patientAccountId: string, slotId: string) {
    const tenant = await this.requireBookableTenant(slug);
    const account = await this.prisma.patientAccount.findUniqueOrThrow({ where: { id: patientAccountId } });
    const tenantPrisma = this.prisma.forTenant(tenant.id);

    const patient = await tenantPrisma.patient.upsert({
      where: { tenantId_patientAccountId: { tenantId: tenant.id, patientAccountId } },
      create: {
        tenantId: tenant.id,
        patientAccountId,
        name: account.name,
        email: account.email,
        phone: account.phone,
        cpfCnpj: account.cpfCnpj,
        birthDate: account.birthDate,
      },
      update: {},
    });

    return this.claimSlotForPatient(tenant.id, patient.id, slotId, tenant.sessionPriceCents!);
  }

  private async claimSlotForPatient(tenantId: string, patientId: string, slotId: string, sessionPriceCents: number) {
    const tenantPrisma = this.prisma.forTenant(tenantId);
    await this.availability.expireStaleHolds(tenantPrisma);

    const heldUntil = new Date(Date.now() + HOLD_MINUTES * 60 * 1000);
    const claimed = await tenantPrisma.availabilitySlot.updateMany({
      where: { id: slotId, status: 'disponivel' },
      data: { status: 'reservado', heldUntil },
    });
    if (claimed.count === 0) {
      throw new ConflictException('Esse horário acabou de deixar de estar disponível. Escolha outro.');
    }
    const slot = await tenantPrisma.availabilitySlot.findUniqueOrThrow({ where: { id: slotId } });

    let appointmentId: string | undefined;
    let invoiceId: string | undefined;
    try {
      const appointment = await tenantPrisma.appointment.create({
        data: {
          tenantId,
          patientId,
          startsAt: slot.startsAt,
          endsAt: slot.endsAt,
          status: 'aguardando_pagamento',
        },
      });
      appointmentId = appointment.id;
      await tenantPrisma.availabilitySlot.update({ where: { id: slot.id }, data: { appointmentId: appointment.id } });

      // Best-effort: sala criada assim que agendado, pra dar tempo de testar
      // câmera/microfone antes da sessão — não derruba o agendamento se o
      // Daily.co falhar ou não estiver configurado (usa "Criar sala" manual depois).
      try {
        await this.teleconsulta.createRoom(appointment.id, tenantId);
      } catch (err) {
        this.logger.warn(`Falha ao criar sala de teleconsulta automaticamente para o agendamento ${appointment.id}: ${(err as Error).message}`);
      }

      const invoice = await tenantPrisma.invoice.create({
        data: {
          tenantId,
          patientId,
          appointmentId: appointment.id,
          amountCents: sessionPriceCents,
          dueDate: heldUntil,
        },
      });
      invoiceId = invoice.id;

      const charged = await this.asaas.createSplitCharge(invoice.id, tenantId);
      return { appointmentId: appointment.id, holdExpiresAt: heldUntil, paymentLink: charged.paymentLink };
    } catch (err) {
      // Desfaz tudo — o slot volta a ficar disponível pra outra pessoa em vez de ficar preso sem cobrança gerada.
      if (invoiceId) await tenantPrisma.invoice.delete({ where: { id: invoiceId } });
      if (appointmentId) await tenantPrisma.appointment.delete({ where: { id: appointmentId } });
      await tenantPrisma.availabilitySlot.update({
        where: { id: slot.id },
        data: { status: 'disponivel', heldUntil: null, appointmentId: null },
      });
      throw err;
    }
  }
}
