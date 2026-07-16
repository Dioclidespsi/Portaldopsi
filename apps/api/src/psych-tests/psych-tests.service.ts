import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { AssignTestDto } from './dto/assign-test.dto';
import { CorrectTestDto } from './dto/correct-test.dto';

/**
 * Aplicação de testes: o psicólogo disponibiliza um teste do catálogo (ver
 * admin/tests, cadastro manual) pro paciente responder na área dele —
 * `submit` mora em PatientPortalService, nunca aqui. Correção e decisão de
 * como comunicar o resultado são sempre manuais, neste módulo.
 */
@Injectable()
export class PsychTestsService {
  constructor(private readonly prisma: PrismaService) {}

  listCatalog() {
    return this.prisma.testTemplate.findMany({
      where: { active: true },
      orderBy: [{ category: 'asc' }, { title: 'asc' }],
      include: { questions: { orderBy: { order: 'asc' } } },
    });
  }

  async assign(dto: AssignTestDto) {
    const { tenantId, userId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();

    const patient = await tenantPrisma.patient.findUnique({ where: { id: dto.patientId } });
    if (!patient) throw new NotFoundException('Paciente não encontrado.');

    const template = await this.prisma.testTemplate.findUnique({ where: { id: dto.testTemplateId } });
    if (!template || !template.active) throw new NotFoundException('Teste não encontrado no catálogo.');

    return tenantPrisma.testAssignment.create({
      data: { tenantId, patientId: dto.patientId, testTemplateId: dto.testTemplateId, assignedById: userId },
      include: { testTemplate: { select: { title: true, category: true } } },
    });
  }

  listForPatient(patientId: string) {
    return this.prisma.forCurrentTenant().testAssignment.findMany({
      where: { patientId },
      orderBy: { assignedAt: 'desc' },
      include: { testTemplate: { include: { questions: { orderBy: { order: 'asc' } } } } },
    });
  }

  async findOne(id: string) {
    const assignment = await this.prisma.forCurrentTenant().testAssignment.findUnique({
      where: { id },
      include: { testTemplate: { include: { questions: { orderBy: { order: 'asc' } } } } },
    });
    if (!assignment) throw new NotFoundException('Aplicação de teste não encontrada.');
    return assignment;
  }

  async correct(id: string, dto: CorrectTestDto) {
    const assignment = await this.findOne(id);
    if (assignment.status !== 'respondido') {
      throw new BadRequestException('Só é possível corrigir depois que o paciente responder o teste.');
    }
    const { userId } = getRequestContext();
    return this.prisma.forCurrentTenant().testAssignment.update({
      where: { id },
      data: {
        finalScore: dto.finalScore ?? assignment.suggestedScore,
        finalResultLabel: dto.finalResultLabel ?? assignment.suggestedResultLabel,
        communicationNote: dto.communicationNote,
        correctedAt: new Date(),
        correctedById: userId,
        status: 'corrigido',
      },
    });
  }

  async attachToProntuario(id: string) {
    const assignment = await this.findOne(id);
    if (assignment.status !== 'corrigido') {
      throw new BadRequestException('Corrija o teste antes de anexar o resultado ao prontuário.');
    }
    if (assignment.attachedToProntuario) {
      throw new BadRequestException('Este resultado já foi anexado ao prontuário.');
    }

    const { tenantId, userId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();
    const title = assignment.testTemplate.title;
    const scoreLine = assignment.finalScore !== null ? `${assignment.finalScore} pontos` : 'sem pontuação numérica';
    const resultLine = assignment.finalResultLabel ? ` — ${assignment.finalResultLabel}` : '';
    const noteLine = assignment.communicationNote ? `\nComunicação ao paciente: ${assignment.communicationNote}` : '';

    const entry = await tenantPrisma.prontuarioEntry.create({
      data: {
        tenantId,
        patientId: assignment.patientId,
        authorId: userId,
        content: `Resultado do teste "${title}": ${scoreLine}${resultLine}.${noteLine}`,
      },
    });

    return tenantPrisma.testAssignment.update({
      where: { id },
      data: { attachedToProntuario: true, prontuarioEntryId: entry.id },
    });
  }
}
