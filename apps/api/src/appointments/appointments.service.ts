import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { TeleconsultaService } from '../teleconsulta/teleconsulta.service';
import { EmailService } from '../email/email.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentStatus } from './dto/update-appointment-status.dto';

@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(AppointmentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly teleconsulta: TeleconsultaService,
    private readonly email: EmailService,
  ) {}

  async create(dto: CreateAppointmentDto) {
    const startsAt = new Date(dto.startsAt);
    const endsAt = new Date(dto.endsAt);
    if (endsAt <= startsAt) {
      throw new BadRequestException('endsAt precisa ser depois de startsAt.');
    }

    const { tenantId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();

    const patient = await tenantPrisma.patient.findUnique({ where: { id: dto.patientId } });
    if (!patient) throw new NotFoundException('Paciente não encontrado.');

    /// Conflito = qualquer agendamento não cancelado do tenant cujo intervalo
    /// cruza o novo (assume 1 profissional por clínica, como o resto do F1).
    const conflict = await tenantPrisma.appointment.findFirst({
      where: {
        status: { notIn: ['cancelado'] },
        startsAt: { lt: endsAt },
        endsAt: { gt: startsAt },
      },
      include: { patient: { select: { name: true } } },
    });
    if (conflict) {
      throw new BadRequestException(
        `Conflito de horário com o agendamento de ${conflict.patient.name} às ${conflict.startsAt.toLocaleString('pt-BR')}.`,
      );
    }

    const appointment = await tenantPrisma.appointment.create({
      data: { tenantId, patientId: dto.patientId, startsAt, endsAt },
    });

    // Best-effort: mesma lógica de BookingService.claimSlotForPatient — sala
    // pronta assim que agendado, sem depender do clique manual em "Criar sala".
    try {
      await this.teleconsulta.createRoom(appointment.id, tenantId);
    } catch (err) {
      this.logger.warn(`Falha ao criar sala de teleconsulta automaticamente para o agendamento ${appointment.id}: ${(err as Error).message}`);
    }

    // Best-effort: agendamento manual não passa por pagamento (já nasce
    // "confirmado" na prática), então o e-mail de confirmação sai direto aqui.
    try {
      const professional = await tenantPrisma.user.findFirst({ where: { role: 'PSICOLOGO_TITULAR' }, select: { name: true, email: true } });
      if (professional) {
        await this.email.sendBookingConfirmation({ patient, professional, startsAt: appointment.startsAt });
      }
    } catch (err) {
      this.logger.warn(`Falha ao enviar e-mail de confirmação do agendamento ${appointment.id}: ${(err as Error).message}`);
    }

    return appointment;
  }

  list(from?: string, to?: string, patientId?: string) {
    return this.prisma.forCurrentTenant().appointment.findMany({
      where: {
        patientId,
        startsAt: {
          gte: from ? new Date(from) : undefined,
          lte: to ? new Date(to) : undefined,
        },
      },
      orderBy: { startsAt: 'asc' },
      include: { patient: { select: { name: true } } },
    });
  }

  async findOne(id: string) {
    const appointment = await this.prisma
      .forCurrentTenant()
      .appointment.findUnique({ where: { id }, include: { patient: { select: { name: true } } } });
    if (!appointment) throw new NotFoundException('Agendamento não encontrado.');
    return appointment;
  }

  async updateStatus(id: string, status: AppointmentStatus, cancelReason?: string) {
    await this.findOne(id);
    const isCancelLike = status === 'cancelado' || status === 'falta';
    return this.prisma.forCurrentTenant().appointment.update({
      where: { id },
      data: { status, cancelReason: isCancelLike ? cancelReason : null },
      include: { patient: { select: { name: true } } },
    });
  }
}
