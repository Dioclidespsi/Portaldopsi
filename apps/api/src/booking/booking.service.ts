import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AvailabilityService } from '../availability/availability.service';
import { AsaasService } from '../asaas/asaas.service';
import { CreateBookingDto } from './dto/create-booking.dto';

/** Prazo de espera do pagamento antes do horário voltar a ficar disponível — ver AvailabilityService.expireStaleHolds. */
const HOLD_MINUTES = 15;

@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly availability: AvailabilityService,
    private readonly asaas: AsaasService,
  ) {}

  /** Resolve e valida o tenant pra qualquer rota pública de agendamento — mesmo padrão de ProfileService.createPublicLead. */
  private async requireBookableTenant(slug: string) {
    const tenant = await this.prisma.tenant.findUnique({ where: { slug } });
    if (!tenant || !tenant.published) {
      throw new NotFoundException('Página não encontrada ou ainda não publicada.');
    }
    if (!tenant.bookingEnabled || !tenant.sessionPriceCents) {
      throw new BadRequestException('Este profissional ainda não habilitou o agendamento público.');
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
   * Reserva um horário publicado: prende o slot por 15min (heldUntil), cria
   * Patient (upsert por e-mail)/Appointment("aguardando_pagamento")/Invoice e
   * gera o link de cobrança via Asaas. Se qualquer etapa depois de prender o
   * slot falhar, desfaz manualmente (não dá pra envolver a chamada HTTP ao
   * Asaas numa transação de banco) — nunca deixa um slot preso sem link de
   * pagamento de verdade esperando por ele.
   */
  async createBooking(slug: string, dto: CreateBookingDto) {
    const tenant = await this.requireBookableTenant(slug);
    const tenantPrisma = this.prisma.forTenant(tenant.id);

    const cpfCnpj = dto.cpfCnpj.replace(/\D/g, '');
    const phone = dto.phone.replace(/\D/g, '');
    const patient = await tenantPrisma.patient.upsert({
      where: { tenantId_email: { tenantId: tenant.id, email: dto.email } },
      create: { tenantId: tenant.id, name: dto.name, email: dto.email, phone, cpfCnpj },
      update: { name: dto.name, phone, cpfCnpj },
    });

    return this.claimSlotForPatient(tenant.id, patient.id, dto.slotId, tenant.sessionPriceCents!);
  }

  /**
   * Mesmo fluxo de createBooking, mas pra um paciente JÁ autenticado no
   * portal (ver PatientPortalService.bookAppointment) — pula o upsert por
   * e-mail, já tem o patientId direto do PatientRequestContext.
   */
  async createBookingForPatient(tenantId: string, patientId: string, slotId: string) {
    const tenant = await this.prisma.tenant.findUniqueOrThrow({ where: { id: tenantId } });
    if (!tenant.bookingEnabled || !tenant.sessionPriceCents) {
      throw new BadRequestException('Sua clínica ainda não habilitou o agendamento pelo portal.');
    }
    return this.claimSlotForPatient(tenantId, patientId, slotId, tenant.sessionPriceCents);
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
