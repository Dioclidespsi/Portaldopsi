import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CreatePatientDto } from './dto/create-patient.dto';
import { CreateProntuarioEntryDto } from './dto/create-prontuario-entry.dto';
import { EnablePortalDto } from './dto/enable-portal.dto';
import { UpdatePatientActiveDto } from './dto/update-patient-active.dto';

const SALT_ROUNDS = 12;

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePatientDto) {
    const { tenantId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();

    if (dto.email) {
      const existing = await tenantPrisma.patient.findUnique({ where: { tenantId_email: { tenantId, email: dto.email } } });
      if (existing) throw new BadRequestException('Já existe um paciente com esse e-mail nesta clínica.');
    }

    return tenantPrisma.patient.create({
      data: {
        tenantId,
        name: dto.name,
        socialName: dto.socialName,
        email: dto.email,
        phone: dto.phone ? dto.phone.replace(/\D/g, '') : undefined,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
        cpfCnpj: dto.cpfCnpj ? dto.cpfCnpj.replace(/\D/g, '') : undefined,
      },
    });
  }

  /** Habilita o Aplicativo do Paciente para este registro — exige e-mail cadastrado. */
  async enablePortal(patientId: string, dto: EnablePortalDto) {
    const patient = await this.findOne(patientId);
    if (!patient.email) {
      throw new BadRequestException('Cadastre um e-mail para o paciente antes de ativar o portal.');
    }
    const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);
    return this.prisma.forCurrentTenant().patient.update({
      where: { id: patientId },
      data: { passwordHash, portalEnabled: true },
      select: { id: true, name: true, email: true, portalEnabled: true },
    });
  }

  list(active?: boolean) {
    return this.prisma.forCurrentTenant().patient.findMany({
      where: active === undefined ? undefined : { active },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const patient = await this.prisma.forCurrentTenant().patient.findUnique({ where: { id } });
    if (!patient) throw new NotFoundException('Paciente não encontrado.');
    return patient;
  }

  async setActive(id: string, dto: UpdatePatientActiveDto) {
    await this.findOne(id);
    return this.prisma.forCurrentTenant().patient.update({
      where: { id },
      data: { active: dto.active },
    });
  }

  /** Entradas de prontuário são append-only — ver comentário no schema.prisma. */
  async addProntuarioEntry(patientId: string, dto: CreateProntuarioEntryDto) {
    await this.findOne(patientId);
    const { tenantId, userId } = getRequestContext();
    return this.prisma.forCurrentTenant().prontuarioEntry.create({
      data: { tenantId, patientId, authorId: userId, content: dto.content },
    });
  }

  async listProntuario(patientId: string) {
    await this.findOne(patientId);
    return this.prisma.forCurrentTenant().prontuarioEntry.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { name: true, role: true } } },
    });
  }
}
