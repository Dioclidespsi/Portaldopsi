import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { SIGNATURE_UPLOAD_DIR } from '../users/signature-upload.config';
import { CreatePsychDocumentDto } from './dto/create-psych-document.dto';
import { UpdatePsychDocumentDto } from './dto/update-psych-document.dto';
import { getPsychDocumentTemplate, listPsychDocumentTemplates } from './catalog';
import { renderPsychDocumentPdf } from './psych-document-pdf-renderer';

export const PSYCH_DOCUMENT_OUTPUT_DIR = path.resolve(__dirname, '../../uploads/psych-documents');
fs.mkdirSync(PSYCH_DOCUMENT_OUTPUT_DIR, { recursive: true });

/**
 * Documentos psicológicos preenchíveis (laudo/relatório/atestado/declaração/
 * encaminhamento/parecer) para UM paciente específico. Diferente de
 * TestAssignment: aqui o PDF gerado é entregue ao paciente, mas só quando o
 * psicólogo aciona `release()` explicitamente — nunca automático. Uma vez
 * `finalizado`, o documento nunca é reeditado (mesma disciplina append-only
 * do ProntuarioEntry) — correções exigem um novo documento.
 */
@Injectable()
export class PsychDocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  listCatalog() {
    return listPsychDocumentTemplates();
  }

  listForPatient(patientId: string) {
    return this.prisma.forCurrentTenant().psychDocument.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        templateSlug: true,
        title: true,
        status: true,
        createdAt: true,
        finalizedAt: true,
        releasedToPatientAt: true,
        requiresPatientAcceptance: true,
        acceptedByPatientAt: true,
      },
    });
  }

  async getOne(id: string) {
    const doc = await this.prisma.forCurrentTenant().psychDocument.findUnique({ where: { id } });
    if (!doc) throw new NotFoundException('Documento não encontrado.');
    return doc;
  }

  async createDraft(dto: CreatePsychDocumentDto) {
    const template = getPsychDocumentTemplate(dto.templateSlug);
    if (!template) throw new BadRequestException('Modelo de documento inválido.');

    const { tenantId, userId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();
    const patient = await tenantPrisma.patient.findUnique({ where: { id: dto.patientId } });
    if (!patient) throw new NotFoundException('Paciente não encontrado.');

    const fields: Record<string, string> = { ...dto.fields };
    if (dto.cid) fields.__cid = dto.cid;

    return tenantPrisma.psychDocument.create({
      data: {
        tenantId,
        patientId: dto.patientId,
        authorId: userId,
        templateSlug: template.slug,
        title: template.title,
        fields,
        requiresPatientAcceptance: template.requiresPatientAcceptance ?? false,
      },
    });
  }

  async updateDraft(id: string, dto: UpdatePsychDocumentDto) {
    const doc = await this.getOne(id);
    if (doc.status !== 'rascunho') {
      throw new BadRequestException('Documento já finalizado — não pode ser editado. Crie um novo documento.');
    }
    const fields: Record<string, string> = { ...dto.fields };
    if (dto.cid) fields.__cid = dto.cid;
    return this.prisma.forCurrentTenant().psychDocument.update({ where: { id }, data: { fields } });
  }

  async deleteDraft(id: string) {
    const doc = await this.getOne(id);
    if (doc.status !== 'rascunho') {
      throw new BadRequestException('Documento já finalizado — não pode ser excluído.');
    }
    await this.prisma.forCurrentTenant().psychDocument.delete({ where: { id } });
    return { ok: true };
  }

  async finalize(id: string) {
    const doc = await this.getOne(id);
    if (doc.status !== 'rascunho') throw new BadRequestException('Documento já finalizado.');

    const template = getPsychDocumentTemplate(doc.templateSlug);
    if (!template) throw new BadRequestException('Modelo de documento não encontrado no catálogo.');

    const { tenantId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();
    const [patient, author, tenant] = await Promise.all([
      tenantPrisma.patient.findUnique({
        where: { id: doc.patientId },
        select: { name: true, socialName: true, cpfCnpj: true, birthDate: true },
      }),
      tenantPrisma.user.findUnique({
        where: { id: doc.authorId },
        select: { name: true, crpNumber: true, signatureImagePath: true },
      }),
      tenantPrisma.tenant.findUnique({ where: { id: tenantId }, select: { name: true, publicPhone: true, publicEmail: true, publicAddress: true } }),
    ]);
    if (!patient) throw new NotFoundException('Paciente não encontrado.');
    if (!author) throw new NotFoundException('Autor não encontrado.');

    const fields = doc.fields as Record<string, string>;
    const cid = fields.__cid;
    const sections = template.sections.map((s) => ({ label: s.label, content: fields[s.key] ?? '' }));

    const buffer = await renderPsychDocumentPdf({
      templateTitle: template.title,
      cid,
      sections,
      patient,
      author: {
        name: author.name,
        crpNumber: author.crpNumber,
        signatureImagePath: author.signatureImagePath ? path.join(SIGNATURE_UPLOAD_DIR, author.signatureImagePath) : null,
        clinicName: tenant?.name,
        contactAddress: tenant?.publicAddress,
        contactPhone: tenant?.publicPhone,
        contactEmail: tenant?.publicEmail,
      },
      includesReceiptProtocol: template.includesReceiptProtocol,
      issuedAt: new Date(),
    });

    const filename = `${id}.pdf`;
    fs.writeFileSync(path.join(PSYCH_DOCUMENT_OUTPUT_DIR, filename), buffer);

    return tenantPrisma.psychDocument.update({
      where: { id },
      data: { status: 'finalizado', finalizedAt: new Date(), filePath: filename },
    });
  }

  /** Nunca automático — só quando o psicólogo aciona explicitamente esta ação. */
  async release(id: string) {
    const doc = await this.getOne(id);
    if (doc.status !== 'finalizado' || !doc.filePath) {
      throw new BadRequestException('Finalize o documento antes de disponibilizar ao paciente.');
    }
    return this.prisma.forCurrentTenant().psychDocument.update({
      where: { id },
      data: { releasedToPatientAt: new Date() },
    });
  }

  async getFilePath(id: string) {
    const doc = await this.getOne(id);
    if (!doc.filePath) throw new NotFoundException('Documento ainda não foi finalizado.');
    return path.join(PSYCH_DOCUMENT_OUTPUT_DIR, doc.filePath);
  }
}
