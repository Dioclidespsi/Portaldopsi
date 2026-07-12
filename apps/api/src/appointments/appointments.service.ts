import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentStatus } from './dto/update-appointment-status.dto';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

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

    return tenantPrisma.appointment.create({
      data: { tenantId, patientId: dto.patientId, startsAt, endsAt },
    });
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

  async updateStatus(id: string, status: AppointmentStatus) {
    await this.findOne(id);
    return this.prisma.forCurrentTenant().appointment.update({ where: { id }, data: { status } });
  }
}
