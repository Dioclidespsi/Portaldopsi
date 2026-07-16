import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CreateSlotDto } from './dto/create-slot.dto';

/** Motivo padrão gravado no Appointment/Invoice cancelados pela expiração de 15min do hold. */
const HOLD_EXPIRED_REASON = 'Pagamento não confirmado em 15 minutos — horário liberado automaticamente.';

@Injectable()
export class AvailabilityService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Libera um horário na Agenda pra aparecer no widget de agendamento público.
   * Conflito checado contra slots (qualquer status ativo) e Appointments (igual
   * AppointmentsService.create) — assume 1 profissional por clínica.
   */
  async createSlot(dto: CreateSlotDto) {
    const startsAt = new Date(dto.startsAt);
    const endsAt = new Date(dto.endsAt);
    if (endsAt <= startsAt) throw new BadRequestException('endsAt precisa ser depois de startsAt.');
    if (startsAt.getTime() < Date.now()) throw new BadRequestException('Não é possível liberar um horário no passado.');

    const { tenantId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();
    await this.expireStaleHolds(tenantPrisma);

    const slotConflict = await tenantPrisma.availabilitySlot.findFirst({
      where: { status: { not: 'cancelado' }, startsAt: { lt: endsAt }, endsAt: { gt: startsAt } },
    });
    if (slotConflict) throw new BadRequestException('Já existe um horário liberado que cruza esse intervalo.');

    const appointmentConflict = await tenantPrisma.appointment.findFirst({
      where: { status: { notIn: ['cancelado'] }, startsAt: { lt: endsAt }, endsAt: { gt: startsAt } },
    });
    if (appointmentConflict) throw new BadRequestException('Já existe um agendamento nesse intervalo.');

    return tenantPrisma.availabilitySlot.create({ data: { tenantId, startsAt, endsAt } });
  }

  async list() {
    const tenantPrisma = this.prisma.forCurrentTenant();
    await this.expireStaleHolds(tenantPrisma);
    return tenantPrisma.availabilitySlot.findMany({
      where: { startsAt: { gte: new Date() } },
      orderBy: { startsAt: 'asc' },
    });
  }

  async remove(id: string) {
    const tenantPrisma = this.prisma.forCurrentTenant();
    const slot = await tenantPrisma.availabilitySlot.findUnique({ where: { id } });
    if (!slot) throw new NotFoundException('Horário não encontrado.');
    if (slot.status !== 'disponivel') {
      throw new BadRequestException('Só é possível remover horários ainda disponíveis (não reservados).');
    }
    await tenantPrisma.availabilitySlot.delete({ where: { id } });
    return { deleted: true };
  }

  /**
   * Libera de volta qualquer slot "reservado" cujo prazo de pagamento (15min)
   * já passou, cancelando o Appointment/Invoice pendentes vinculados. Não há
   * job/cron no projeto — chamado sob demanda no início de toda leitura de
   * disponibilidade (aqui, no BookingService público e antes de reservar um
   * slot), então a expiração "aparece" na próxima vez que alguém olhar.
   *
   * Recebe o client já escopado (tenantPrisma) porque tanto o dashboard
   * (forCurrentTenant) quanto o agendamento público (forTenant(id) explícito,
   * sem RequestContext) precisam chamar isso.
   */
  async expireStaleHolds(tenantPrisma: ReturnType<PrismaService['forTenant']>) {
    const expired = await tenantPrisma.availabilitySlot.findMany({
      where: { status: 'reservado', heldUntil: { lt: new Date() } },
    });
    for (const slot of expired) {
      if (slot.appointmentId) {
        await tenantPrisma.appointment.update({
          where: { id: slot.appointmentId },
          data: { status: 'cancelado', cancelReason: HOLD_EXPIRED_REASON },
        });
        await tenantPrisma.invoice.updateMany({
          where: { appointmentId: slot.appointmentId, status: 'pendente' },
          data: { status: 'cancelado' },
        });
      }
      await tenantPrisma.availabilitySlot.update({
        where: { id: slot.id },
        data: { status: 'disponivel', heldUntil: null, appointmentId: null },
      });
    }
  }
}
