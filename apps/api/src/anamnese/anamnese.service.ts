import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { UpsertAnamneseDto } from './dto/upsert-anamnese.dto';
import { getAnamneseTemplate, listAnamneseTemplates, suggestAnamneseTemplateByAge } from './catalog';

function ageInYears(birthDate: Date): number {
  const diffMs = Date.now() - birthDate.getTime();
  return Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000));
}

/**
 * Ficha de anamnese de UM paciente — diferente de ProntuarioEntry/
 * PsychDocument: é sempre editável (upsert), sem rascunho/finalização e
 * sem histórico de versões (ver comentário no schema.prisma). Uma por
 * paciente (`patientId` único).
 */
@Injectable()
export class AnamneseService {
  constructor(private readonly prisma: PrismaService) {}

  listCatalog() {
    return listAnamneseTemplates();
  }

  async getForPatient(patientId: string) {
    const tenantPrisma = this.prisma.forCurrentTenant();
    const patient = await tenantPrisma.patient.findUnique({ where: { id: patientId }, select: { id: true, birthDate: true } });
    if (!patient) throw new NotFoundException('Paciente não encontrado.');

    const [entry, suggestedTemplate] = await Promise.all([
      tenantPrisma.anamneseEntry.findUnique({ where: { patientId } }),
      Promise.resolve(patient.birthDate ? suggestAnamneseTemplateByAge(ageInYears(patient.birthDate)) : null),
    ]);

    return { entry, suggestedTemplateSlug: suggestedTemplate?.slug ?? null };
  }

  async upsert(dto: UpsertAnamneseDto) {
    const template = getAnamneseTemplate(dto.templateSlug);
    if (!template) throw new BadRequestException('Modelo de anamnese inválido.');

    const { tenantId, userId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();
    const patient = await tenantPrisma.patient.findUnique({ where: { id: dto.patientId } });
    if (!patient) throw new NotFoundException('Paciente não encontrado.');

    return tenantPrisma.anamneseEntry.upsert({
      where: { patientId: dto.patientId },
      create: { tenantId, patientId: dto.patientId, authorId: userId, templateSlug: template.slug, fields: dto.fields },
      update: { templateSlug: template.slug, fields: dto.fields },
    });
  }
}
