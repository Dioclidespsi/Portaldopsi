import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { DOCUMENT_TEMPLATE_UPLOAD_DIR } from './document-template-upload.config';

/**
 * Leitura pro tenant — CLINICA (STAFF) e ESTUDANTE (ver EstudanteAccessGuard,
 * `/document-templates` está na allowlist) usam esta mesma service, cada um
 * só enxergando os modelos do próprio público (`DocumentTemplate.audience`)
 * — nunca cruzar: um termo do aluno não pode contar como pendência pro
 * psicólogo (AccessGateService) nem vice-versa. Sem RLS de propósito, ver
 * DocumentTemplate no schema.prisma.
 */
@Injectable()
export class DocumentTemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  private ownAudience(): 'STAFF' | 'ESTUDANTE' {
    return getRequestContext().tenantKind === 'ESTUDANTE' ? 'ESTUDANTE' : 'STAFF';
  }

  list() {
    return this.prisma.documentTemplate.findMany({
      where: { audience: this.ownAudience() },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getFilePath(id: string) {
    const template = await this.prisma.documentTemplate.findUnique({ where: { id, audience: this.ownAudience() } });
    if (!template) throw new NotFoundException('Modelo de documento não encontrado.');
    return { absolutePath: path.join(DOCUMENT_TEMPLATE_UPLOAD_DIR, template.filePath), title: template.title };
  }

  /**
   * Contratos/termos que exigem aceite e o usuário logado ainda não aceitou —
   * usado pelo dashboard pra bloquear o acesso até aceitar (ver DocumentAcceptance).
   */
  async listPendingAcceptance() {
    const { userId } = getRequestContext();
    const pending = await this.prisma.documentTemplate.findMany({
      where: { requiresAcceptance: true, audience: this.ownAudience(), acceptances: { none: { userId } } },
      orderBy: { createdAt: 'asc' },
    });
    return pending;
  }

  async accept(id: string) {
    const { userId } = getRequestContext();
    const template = await this.prisma.documentTemplate.findUnique({ where: { id, audience: this.ownAudience() } });
    if (!template) throw new NotFoundException('Contrato não encontrado.');
    return this.prisma.documentAcceptance.upsert({
      where: { documentTemplateId_userId: { documentTemplateId: id, userId } },
      update: {},
      create: { documentTemplateId: id, userId },
    });
  }
}
