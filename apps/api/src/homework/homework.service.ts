import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class HomeworkService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
  ) {}

  async create(dto: CreateHomeworkDto) {
    const { tenantId, userId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();
    const patient = await tenantPrisma.patient.findUnique({ where: { id: dto.patientId } });
    if (!patient) throw new NotFoundException('Paciente não encontrado.');

    const homework = await tenantPrisma.homework.create({
      data: {
        tenantId,
        patientId: dto.patientId,
        assignedById: userId,
        title: dto.title,
        instructions: dto.instructions,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
    });

    await this.notifications.notifyPatient(tenantId, dto.patientId, {
      title: 'Novo dever de casa',
      body: dto.title,
    });

    return homework;
  }

  listByPatient(patientId: string) {
    return this.prisma.forCurrentTenant().homework.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async remove(id: string) {
    const tenantPrisma = this.prisma.forCurrentTenant();
    const homework = await tenantPrisma.homework.findUnique({ where: { id } });
    if (!homework) throw new NotFoundException('Dever de casa não encontrado.');
    await tenantPrisma.homework.delete({ where: { id } });
    return { deleted: true };
  }
}
