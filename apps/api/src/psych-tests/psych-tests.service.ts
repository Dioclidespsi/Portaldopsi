import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { AssignTestDto } from './dto/assign-test.dto';
import { CorrectTestDto } from './dto/correct-test.dto';
import { ApplyTestLiveDto } from './dto/apply-test-live.dto';
import { computeSuggestedScore } from './scoring';

/**
 * Aplicação de testes: o psicólogo disponibiliza um teste do catálogo (ver
 * admin/tests, cadastro manual) pro paciente responder sozinho na área dele
 * — esse fluxo self-service (`submit`) mora em PatientPortalService, nunca
 * aqui, e continua existindo sem mudanças. `applyLive` abaixo é uma SEGUNDA
 * forma de preencher as mesmas perguntas, pro psicólogo usar durante uma
 * sessão presencial/por vídeo: ele lê a pergunta em voz alta, o paciente
 * responde, e o profissional digita — sem exigir que o paciente tenha
 * acesso à área dele. Correção e decisão de como comunicar o resultado
 * continuam sempre manuais, neste módulo.
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

    // include completo (com questions) — não só {title, category} — mesmo
    // motivo do fix em applyLive/correct: o "Aplicar agora" usa este
    // retorno na hora pra abrir o formulário de aplicação ao vivo, que
    // precisa de `testTemplate.questions`; sem isso a tela quebra em
    // branco assim que tenta listar as perguntas (parecia "deslogar", mas
    // era a página crashando).
    return tenantPrisma.testAssignment.create({
      data: { tenantId, patientId: dto.patientId, testTemplateId: dto.testTemplateId, assignedById: userId },
      include: { testTemplate: { include: { questions: { orderBy: { order: 'asc' } } } } },
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

  /**
   * Aplicação ao vivo — mesma validação e o mesmo cálculo de sugestão de
   * PatientPortalService.submitTest, só que autorizado como staff (não
   * exige que o paciente esteja logado/tenha acesso à área dele) e
   * marcando quem aplicou (appliedLiveByStaff/appliedById), pra distinguir
   * de uma resposta que o próprio paciente enviou sozinho.
   */
  async applyLive(id: string, dto: ApplyTestLiveDto) {
    const assignment = await this.findOne(id);
    if (assignment.status !== 'pendente') {
      throw new BadRequestException('Este teste já foi respondido e não pode ser reaplicado.');
    }
    const questions = assignment.testTemplate.questions;

    for (const q of questions) {
      const value = dto.answers[q.id];
      if (q.type === 'objetiva' && typeof value !== 'number') {
        throw new BadRequestException(`Resposta ausente para a pergunta "${q.prompt}".`);
      }
      if (q.type === 'subjetiva' && (typeof value !== 'string' || !value.trim())) {
        throw new BadRequestException(`Resposta ausente para a pergunta "${q.prompt}".`);
      }
    }

    const scoreBands = assignment.testTemplate.scoreBands as { maxScore: number; label: string }[] | null;
    const responseScale = assignment.testTemplate.responseScale as { value: number; label: string }[] | null;
    const subscales = assignment.testTemplate.subscales as unknown as Parameters<typeof computeSuggestedScore>[4];
    const derivedScores = assignment.testTemplate.derivedScores as unknown as Parameters<typeof computeSuggestedScore>[5];
    const { suggestedScore, suggestedResultLabel, suggestedSubscaleScores, suggestedDerivedScores } = computeSuggestedScore(
      questions,
      scoreBands,
      dto.answers,
      responseScale,
      subscales,
      derivedScores,
    );

    const { userId } = getRequestContext();
    // include: testTemplate é essencial aqui — o frontend renderiza
    // `a.testTemplate.title`/`.questions` sem checar undefined pra toda
    // linha da tabela (mesmo padrão de findOne/assign/listForPatient); sem
    // isso o valor devolvido quebra a tela assim que ela tenta re-renderizar
    // essa linha (bug real: página ficava em branco depois de "Enviar
    // respostas" na aplicação ao vivo).
    return this.prisma.forCurrentTenant().testAssignment.update({
      where: { id },
      data: {
        answers: dto.answers,
        submittedAt: new Date(),
        status: 'respondido',
        appliedLiveByStaff: true,
        appliedById: userId,
        suggestedScore,
        suggestedResultLabel,
        suggestedSubscaleScores: (suggestedSubscaleScores as unknown as Prisma.InputJsonValue) ?? undefined,
        suggestedDerivedScores: (suggestedDerivedScores as unknown as Prisma.InputJsonValue) ?? undefined,
      },
      include: { testTemplate: { include: { questions: { orderBy: { order: 'asc' } } } } },
    });
  }

  async correct(id: string, dto: CorrectTestDto) {
    const assignment = await this.findOne(id);
    if (assignment.status !== 'respondido') {
      throw new BadRequestException('Só é possível corrigir depois que o paciente responder o teste.');
    }
    const { userId } = getRequestContext();
    // Mesmo bug de include ausente corrigido acima, existia aqui também —
    // ver comentário em applyLive.
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
      include: { testTemplate: { include: { questions: { orderBy: { order: 'asc' } } } } },
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
      include: { testTemplate: { include: { questions: { orderBy: { order: 'asc' } } } } },
    });
  }

  /**
   * Só permite excluir enquanto ainda está "pendente" (ninguém respondeu
   * nada) — pra desfazer um "Disponibilizar"/"Aplicar agora" clicado por
   * engano no teste ou paciente errado. Uma vez que existe resposta de
   * verdade (respondido/corrigido), vira dado clínico e não some mais —
   * mesmo espírito do Prontuário, mesmo sem a mesma exigência formal do
   * CFP pra este caso.
   */
  async remove(id: string) {
    const assignment = await this.findOne(id);
    if (assignment.status !== 'pendente') {
      throw new BadRequestException('Só é possível excluir uma aplicação de teste que ainda não foi respondida.');
    }
    await this.prisma.forCurrentTenant().testAssignment.delete({ where: { id } });
    return { ok: true };
  }
}
