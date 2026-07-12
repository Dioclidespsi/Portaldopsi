import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { getTestDefinition, listTestDefinitions } from './catalog';
import { TestDefinition } from './catalog/types';

@Injectable()
export class PsychTestsService {
  constructor(private readonly prisma: PrismaService) {}

  listCatalog() {
    return listTestDefinitions();
  }

  getDefinition(slug: string): TestDefinition {
    const def = getTestDefinition(slug);
    if (!def) throw new NotFoundException('Escala não encontrada no catálogo.');
    return def;
  }

  private score(def: TestDefinition, answers: Record<string, number>) {
    const validValues = new Set(def.responseScale.map((r) => r.value));
    let total = 0;
    for (const item of def.items) {
      const value = answers[item.id];
      if (value === undefined || !validValues.has(value)) {
        throw new BadRequestException(`Resposta ausente ou inválida para o item "${item.id}".`);
      }
      total += value;
    }
    const band = def.scoreBands.find((b) => total <= b.maxScore) ?? def.scoreBands[def.scoreBands.length - 1];
    return { score: total, resultLabel: band.label };
  }

  async submit(slug: string, patientId: string, answers: Record<string, number>) {
    const def = this.getDefinition(slug);
    const { score, resultLabel } = this.score(def, answers);

    const { tenantId, userId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();

    const patient = await tenantPrisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) throw new NotFoundException('Paciente não encontrado.');

    return tenantPrisma.testResponse.create({
      data: { tenantId, patientId, authorId: userId, testSlug: slug, answers, score, resultLabel },
    });
  }

  listForPatient(patientId: string) {
    return this.prisma.forCurrentTenant().testResponse.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
