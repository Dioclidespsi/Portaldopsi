import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CreateSlotDto } from './dto/create-slot.dto';
import { CreateSlotBlockDto } from './dto/create-slot-block.dto';

/** Motivo padrão gravado no Appointment/Invoice cancelados pela expiração de 15min do hold. */
const HOLD_EXPIRED_REASON = 'Pagamento não confirmado em 15 minutos — horário liberado automaticamente.';

/**
 * América/São_Paulo é UTC-3 fixo (sem horário de verão desde 2019) — a
 * plataforma é só pra clínicas brasileiras, sem fuso configurável por tenant.
 * Nunca usar `Date.setHours`/`new Date(string sem Z)` pra montar horário de
 * agenda: isso interpreta a hora no fuso do SERVIDOR, não no de Brasília —
 * bug real encontrado em produção (2026-07-29): servidor roda em UTC, então
 * "08:00" configurado pelo psicólogo virava 08:00 UTC = 05:00 em Brasília na
 * exibição. Esta função monta o instante UTC certo direto, sem depender do
 * fuso do processo Node.
 */
const BRT_OFFSET_MINUTES = 3 * 60;

function brtWallClockToUtc(dateStr: string, minutesSinceMidnight: number): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day, 0, minutesSinceMidnight + BRT_OFFSET_MINUTES));
}

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

  /**
   * Substituiu a liberação horário-a-horário na Agenda (item de feedback: o
   * fluxo antigo obrigava o psicólogo a preencher um formulário pra cada
   * horário). Gera um slot por (dia no período que cai em daysOfWeek) x
   * (posição dentro do intervalo startTime-endTime, avançando de
   * durationMinutes + intervalMinutes em intervalMinutes). Nunca lança erro
   * por conflito individual — um mês inteiro não pode falhar por causa de um
   * único horário já ocupado, então conflitos e horários no passado são só
   * pulados e contados, pra UI mostrar o resumo.
   */
  async createSlotBlock(dto: CreateSlotBlockDto) {
    const [startH, startM] = dto.startTime.split(':').map(Number);
    const [endH, endM] = dto.endTime.split(':').map(Number);
    const dayStartMinutes = startH * 60 + startM;
    const dayEndMinutes = endH * 60 + endM;
    if (dayEndMinutes <= dayStartMinutes) {
      throw new BadRequestException('O horário final precisa ser depois do horário inicial.');
    }

    const from = new Date(`${dto.fromDate}T00:00:00Z`);
    const to = new Date(`${dto.toDate}T00:00:00Z`);
    if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
      throw new BadRequestException('Datas inválidas.');
    }
    if (to < from) throw new BadRequestException('A data final precisa ser igual ou depois da data inicial.');

    const stepMinutes = dto.durationMinutes + (dto.intervalMinutes ?? 0);

    const candidates: { startsAt: Date; endsAt: Date }[] = [];
    let skippedPast = 0;
    for (let day = new Date(from); day <= to; day.setUTCDate(day.getUTCDate() + 1)) {
      if (!dto.daysOfWeek.includes(day.getUTCDay())) continue;
      const dateStr = day.toISOString().slice(0, 10);
      for (let minutes = dayStartMinutes; minutes + dto.durationMinutes <= dayEndMinutes; minutes += stepMinutes) {
        const startsAt = brtWallClockToUtc(dateStr, minutes);
        const endsAt = new Date(startsAt.getTime() + dto.durationMinutes * 60 * 1000);
        if (startsAt.getTime() < Date.now()) {
          skippedPast += 1;
          continue;
        }
        candidates.push({ startsAt, endsAt });
      }
    }

    if (candidates.length === 0) {
      return { created: 0, skippedConflict: 0, skippedPast, slots: [] };
    }

    const { tenantId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();
    await this.expireStaleHolds(tenantPrisma);

    const rangeStart = candidates[0].startsAt;
    const rangeEnd = candidates[candidates.length - 1].endsAt;
    const [existingSlots, existingAppointments] = await Promise.all([
      tenantPrisma.availabilitySlot.findMany({
        where: { status: { not: 'cancelado' }, startsAt: { lt: rangeEnd }, endsAt: { gt: rangeStart } },
        select: { startsAt: true, endsAt: true },
      }),
      tenantPrisma.appointment.findMany({
        where: { status: { notIn: ['cancelado'] }, startsAt: { lt: rangeEnd }, endsAt: { gt: rangeStart } },
        select: { startsAt: true, endsAt: true },
      }),
    ]);
    const busy = [...existingSlots, ...existingAppointments];
    const overlaps = (a: { startsAt: Date; endsAt: Date }, b: { startsAt: Date; endsAt: Date }) =>
      a.startsAt < b.endsAt && a.endsAt > b.startsAt;

    const toCreate = candidates.filter((c) => !busy.some((b) => overlaps(c, b)));
    const skippedConflict = candidates.length - toCreate.length;

    if (toCreate.length === 0) {
      return { created: 0, skippedConflict, skippedPast, slots: [] };
    }

    await tenantPrisma.availabilitySlot.createMany({
      data: toCreate.map((c) => ({ tenantId, startsAt: c.startsAt, endsAt: c.endsAt })),
    });
    const slots = await tenantPrisma.availabilitySlot.findMany({
      where: { startsAt: { in: toCreate.map((c) => c.startsAt) } },
      orderBy: { startsAt: 'asc' },
    });

    return { created: toCreate.length, skippedConflict, skippedPast, slots };
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
   *
   * Confere o status da cobrança antes de cancelar: se ela já foi paga (pelo
   * webhook do Asaas ou marcada manualmente na tela Financeiro) entre o
   * vencimento do hold e esta leitura, o agendamento é confirmado em vez de
   * cancelado — nunca cancela uma sessão já paga só porque o timer de 15min
   * venceu antes da confirmação chegar. Bug real corrigido em 2026-08-03
   * (caso Lorena Barreto): o hold vencia, ninguém olhava a disponibilidade
   * de novo por alguns minutos, e quando alguém olhava, esta função cancelava
   * o agendamento mesmo com a cobrança já paga.
   */
  async expireStaleHolds(tenantPrisma: ReturnType<PrismaService['forTenant']>) {
    const expired = await tenantPrisma.availabilitySlot.findMany({
      where: { status: 'reservado', heldUntil: { lt: new Date() } },
    });
    for (const slot of expired) {
      if (slot.appointmentId) {
        const invoice = await tenantPrisma.invoice.findFirst({ where: { appointmentId: slot.appointmentId } });
        if (invoice?.status === 'pago') {
          await tenantPrisma.appointment.update({
            where: { id: slot.appointmentId },
            data: { status: 'confirmado', cancelReason: null },
          });
          await tenantPrisma.availabilitySlot.update({
            where: { id: slot.id },
            data: { status: 'confirmado', heldUntil: null },
          });
          continue;
        }
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
