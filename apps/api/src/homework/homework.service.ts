import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CreateHomeworkDto } from './dto/create-homework.dto';

@Injectable()
export class HomeworkService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateHomeworkDto) {
    const { tenantId, userId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();
    const patient = await tenantPrisma.patient.findUnique({ where: { id: dto.patientId } });
    if (!patient) throw new NotFoundException('Paciente não encontrado.');

    return tenantPrisma.homework.create({
      data: {
        tenantId,
        patientId: dto.patientId,
        assignedById: userId,
        title: dto.title,
        instructions: dto.instructions,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
    });
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
