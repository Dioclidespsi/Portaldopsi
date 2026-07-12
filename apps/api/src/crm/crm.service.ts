import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { AiService } from '../ai/ai.service';

@Injectable()
export class CrmService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ai: AiService,
  ) {}

  create(dto: CreateLeadDto) {
    const { tenantId } = getRequestContext();
    return this.prisma.forCurrentTenant().lead.create({
      data: { tenantId, name: dto.name, contact: dto.contact, source: dto.source },
    });
  }

  list() {
    return this.prisma.forCurrentTenant().lead.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async update(id: string, dto: UpdateLeadDto) {
    const tenantPrisma = this.prisma.forCurrentTenant();
    const lead = await tenantPrisma.lead.findUnique({ where: { id } });
    if (!lead) throw new NotFoundException('Lead não encontrado.');
    return tenantPrisma.lead.update({ where: { id }, data: { stage: dto.stage, notes: dto.notes } });
  }

  /** Heurística simples: contato com "@" vira e-mail do paciente, senão telefone. */
  async convertToPatient(id: string) {
    const tenantPrisma = this.prisma.forCurrentTenant();
    const lead = await tenantPrisma.lead.findUnique({ where: { id } });
    if (!lead) throw new NotFoundException('Lead não encontrado.');
    if (lead.convertedPatientId) throw new BadRequestException('Este lead já foi convertido em paciente.');

    const { tenantId } = getRequestContext();
    const isEmail = lead.contact?.includes('@') ?? false;
    const patient = await tenantPrisma.patient.create({
      data: {
        tenantId,
        name: lead.name,
        email: isEmail ? lead.contact : undefined,
        phone: !isEmail ? lead.contact ?? undefined : undefined,
      },
    });

    await tenantPrisma.lead.update({
      where: { id },
      data: { stage: 'CONVERTIDO', convertedPatientId: patient.id },
    });

    return patient;
  }

  async suggestFollowUpMessage(id: string) {
    const lead = await this.prisma.forCurrentTenant().lead.findUnique({ where: { id } });
    if (!lead) throw new NotFoundException('Lead não encontrado.');
    const message = await this.ai.suggestLeadFollowUp(lead);
    return { message };
  }
}
