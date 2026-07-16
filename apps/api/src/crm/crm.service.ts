import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { ListLeadsDto } from './dto/list-leads.dto';
import { AiService } from '../ai/ai.service';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Estágios ainda "em aberto" no funil — usados pra calcular quantos leads estão parados. */
const OPEN_STAGES = ['NOVO', 'CONTATADO', 'AGENDADO'] as const;
/** Dias sem sair de um estágio aberto pra ser considerado parado (ver getFunnelReport). */
const STALE_DAYS_THRESHOLD = 7;

const LEAD_INCLUDE = { assignedTo: { select: { id: true, name: true } } };

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
      include: LEAD_INCLUDE,
    });
  }

  list(query: ListLeadsDto) {
    return this.prisma.forCurrentTenant().lead.findMany({
      where: {
        stage: query.stage,
        ...(query.search
          ? {
              OR: [
                { name: { contains: query.search, mode: 'insensitive' } },
                { contact: { contains: query.search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: 'desc' },
      include: LEAD_INCLUDE,
    });
  }

  async update(id: string, dto: UpdateLeadDto) {
    const tenantPrisma = this.prisma.forCurrentTenant();
    const lead = await tenantPrisma.lead.findUnique({ where: { id } });
    if (!lead) throw new NotFoundException('Lead não encontrado.');

    if (dto.assignedToId) {
      const assignee = await tenantPrisma.user.findUnique({ where: { id: dto.assignedToId } });
      if (!assignee) throw new BadRequestException('assignedToId precisa ser um usuário desta clínica.');
    }

    return tenantPrisma.lead.update({
      where: { id },
      data: {
        name: dto.name,
        contact: dto.contact,
        source: dto.source,
        stage: dto.stage,
        notes: dto.notes,
        assignedToId: dto.assignedToId === undefined ? undefined : dto.assignedToId,
      },
      include: LEAD_INCLUDE,
    });
  }

  async remove(id: string) {
    const tenantPrisma = this.prisma.forCurrentTenant();
    const lead = await tenantPrisma.lead.findUnique({ where: { id } });
    if (!lead) throw new NotFoundException('Lead não encontrado.');
    await tenantPrisma.lead.delete({ where: { id } });
    return { deleted: true };
  }

  /**
   * Detecta e-mail por formato real (não só `includes('@')`) — o que sobra
   * vira telefone. Antes de criar um Patient novo, procura um já existente
   * com o mesmo e-mail/telefone: se achar, só vincula o lead a ele (evita
   * duplicar cadastro), sinalizando isso na resposta pro psicólogo.
   */
  async convertToPatient(id: string) {
    const tenantPrisma = this.prisma.forCurrentTenant();
    const lead = await tenantPrisma.lead.findUnique({ where: { id } });
    if (!lead) throw new NotFoundException('Lead não encontrado.');
    // Checa o estágio, não só `convertedPatientId` — este último fica null quando o lead
    // bate num paciente já "reivindicado" por outro lead (ver comentário abaixo).
    if (lead.stage === 'CONVERTIDO') throw new BadRequestException('Este lead já foi convertido em paciente.');

    const { tenantId } = getRequestContext();
    const contact = lead.contact?.trim();
    const isEmail = contact ? EMAIL_PATTERN.test(contact) : false;
    const email = isEmail ? contact : undefined;
    const phone = !isEmail ? contact : undefined;

    let patient = email || phone
      ? await tenantPrisma.patient.findFirst({
          where: { OR: [email ? { email } : undefined, phone ? { phone } : undefined].filter(Boolean) as object[] },
        })
      : null;
    const matchedExisting = Boolean(patient);

    if (!patient) {
      patient = await tenantPrisma.patient.create({
        data: { tenantId, name: lead.name, email, phone },
      });
    }

    // `convertedPatientId` é @unique — só o primeiro lead "dono" de um paciente pode
    // guardar essa referência. Leads seguintes que baterem no mesmo paciente (duplicidade)
    // ainda são marcados como convertidos, só sem a FK (que já está ocupada).
    const alreadyClaimedBy = await tenantPrisma.lead.findFirst({ where: { convertedPatientId: patient.id } });
    await tenantPrisma.lead.update({
      where: { id },
      data: { stage: 'CONVERTIDO', convertedPatientId: alreadyClaimedBy ? undefined : patient.id },
    });

    return { patient, matchedExisting };
  }

  async suggestFollowUpMessage(id: string) {
    const lead = await this.prisma.forCurrentTenant().lead.findUnique({ where: { id } });
    if (!lead) throw new NotFoundException('Lead não encontrado.');
    const message = await this.ai.suggestLeadFollowUp(lead);
    return { message };
  }

  async listActivities(leadId: string) {
    const tenantPrisma = this.prisma.forCurrentTenant();
    const lead = await tenantPrisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) throw new NotFoundException('Lead não encontrado.');
    return tenantPrisma.leadActivity.findMany({
      where: { leadId },
      orderBy: { createdAt: 'asc' },
      include: { author: { select: { id: true, name: true } } },
    });
  }

  async addActivity(leadId: string, content: string) {
    const { tenantId, userId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();
    const lead = await tenantPrisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) throw new NotFoundException('Lead não encontrado.');
    return tenantPrisma.leadActivity.create({
      data: { tenantId, leadId, authorId: userId, content },
      include: { author: { select: { id: true, name: true } } },
    });
  }

  /**
   * Não há infraestrutura de cron/notificação neste projeto (ver AiService —
   * IA só sugere, nunca dispara sozinha), então "lembrete automático" aqui é
   * um indicador visual no próprio CRM (quantos leads parados há mais de
   * STALE_DAYS_THRESHOLD dias num estágio aberto), não um e-mail/push
   * disparado por um job — mesma filosofia de "nunca automatizar contato
   * externo sem revisão humana" já usada no follow-up por IA.
   */
  async getFunnelReport() {
    const leads = await this.prisma.forCurrentTenant().lead.findMany({
      select: { stage: true, createdAt: true },
    });

    const countByStage: Record<string, number> = { NOVO: 0, CONTATADO: 0, AGENDADO: 0, CONVERTIDO: 0, PERDIDO: 0 };
    let staleCount = 0;
    const now = Date.now();
    for (const lead of leads) {
      countByStage[lead.stage] = (countByStage[lead.stage] ?? 0) + 1;
      const isOpen = (OPEN_STAGES as readonly string[]).includes(lead.stage);
      const daysOpen = (now - lead.createdAt.getTime()) / (1000 * 60 * 60 * 24);
      if (isOpen && daysOpen >= STALE_DAYS_THRESHOLD) staleCount += 1;
    }

    const total = leads.length;
    const conversionRate = total > 0 ? countByStage.CONVERTIDO / total : 0;

    return { total, countByStage, conversionRate, staleCount, staleDaysThreshold: STALE_DAYS_THRESHOLD };
  }
}
