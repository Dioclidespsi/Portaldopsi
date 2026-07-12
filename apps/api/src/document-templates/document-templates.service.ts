import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { DOCUMENT_TEMPLATE_UPLOAD_DIR } from './document-template-upload.config';

/**
 * Leitura pro tenant — `EstudanteAccessGuard` já bloqueia tenant.kind=ESTUDANTE
 * antes de chegar aqui (rota não está na allowlist), então esta service só
 * precisa existir pra quem já passou o guard (CLINICA). Sem RLS de propósito,
 * ver DocumentTemplate no schema.prisma.
 */
@Injectable()
export class DocumentTemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.documentTemplate.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async getFilePath(id: string) {
    const template = await this.prisma.documentTemplate.findUnique({ where: { id } });
    if (!template) throw new NotFoundException('Modelo de documento não encontrado.');
    return { absolutePath: path.join(DOCUMENT_TEMPLATE_UPLOAD_DIR, template.filePath), title: template.title };
  }
}
