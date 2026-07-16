import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { BANNER_UPLOAD_DIR } from './banner-upload.config';

/** `banners` não tem RLS/tenantId (conteúdo global da plataforma) — client cru é o correto aqui, igual DocumentTemplate/LibraryMaterial. */
@Injectable()
export class BannersService {
  constructor(private readonly prisma: PrismaService) {}

  listActive() {
    return this.prisma.banner.findMany({ where: { active: true }, orderBy: { position: 'asc' } });
  }

  /** `filename` vem direto da URL (rota pública) — valida contra path traversal antes de tocar o disco. */
  getImagePath(filename: string) {
    if (filename !== path.basename(filename) || filename.includes('..')) {
      throw new NotFoundException('Imagem não encontrada.');
    }
    const absolutePath = path.join(BANNER_UPLOAD_DIR, filename);
    if (!fs.existsSync(absolutePath)) throw new NotFoundException('Imagem não encontrada.');
    return absolutePath;
  }
}
