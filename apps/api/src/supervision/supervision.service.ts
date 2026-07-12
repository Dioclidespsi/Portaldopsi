import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CreateSupervisionSessionDto } from './dto/create-session.dto';
import { UpdateSupervisionSessionDto } from './dto/update-session.dto';

@Injectable()
export class SupervisionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSupervisionSessionDto) {
    const startsAt = new Date(dto.startsAt);
    const endsAt = new Date(dto.endsAt);
    if (endsAt <= startsAt) throw new BadRequestException('endsAt precisa ser depois de startsAt.');

    const { tenantId, userId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();

    const supervisor = await tenantPrisma.user.findUnique({ where: { id: dto.supervisorId } });
    if (!supervisor || supervisor.role !== Role.SUPERVISOR) {
      throw new BadRequestException('supervisorId precisa ser um usuário com role SUPERVISOR nesta clínica.');
    }

    return tenantPrisma.supervisionSession.create({
      data: { tenantId, supervisorId: dto.supervisorId, superviseeId: userId, startsAt, endsAt },
      include: { supervisor: { select: { name: true } }, supervisee: { select: { name: true } } },
    });
  }

  list() {
    return this.prisma.forCurrentTenant().supervisionSession.findMany({
      orderBy: { startsAt: 'asc' },
      include: { supervisor: { select: { name: true } }, supervisee: { select: { name: true } } },
    });
  }

  async update(id: string, dto: UpdateSupervisionSessionDto) {
    const tenantPrisma = this.prisma.forCurrentTenant();
    const session = await tenantPrisma.supervisionSession.findUnique({ where: { id } });
    if (!session) throw new NotFoundException('Sessão de supervisão não encontrada.');

    return tenantPrisma.supervisionSession.update({
      where: { id },
      data: { status: dto.status, notes: dto.notes },
      include: { supervisor: { select: { name: true } }, supervisee: { select: { name: true } } },
    });
  }
}
