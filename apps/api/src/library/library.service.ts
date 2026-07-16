import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { LIBRARY_MATERIAL_UPLOAD_DIR } from './library-material-upload.config';

/**
 * Leitura pro tenant — `EstudanteAccessGuard` já bloqueia tenant.kind=ESTUDANTE
 * antes de chegar aqui (rota não está na allowlist), então esta service só
 * precisa existir pra quem já passou o guard (CLINICA). Sem RLS de propósito,
 * ver LibraryMaterial no schema.prisma.
 */
@Injectable()
export class LibraryService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.libraryMaterial.findMany({
      where: { active: true },
      orderBy: [{ category: 'asc' }, { title: 'asc' }],
    });
  }

  async getFilePath(id: string) {
    const material = await this.prisma.libraryMaterial.findUnique({ where: { id } });
    if (!material || !material.active) throw new NotFoundException('Material não encontrado.');
    return { absolutePath: path.join(LIBRARY_MATERIAL_UPLOAD_DIR, material.filePath), title: material.title };
  }
}
