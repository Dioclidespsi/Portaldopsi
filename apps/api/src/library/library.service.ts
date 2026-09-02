import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { LIBRARY_MATERIAL_UPLOAD_DIR } from './library-material-upload.config';

/** Só pra assinar/validar o token de visualização — nunca usado como token de login de verdade. */
interface LibraryViewTokenPayload {
  purpose: 'library-view';
  materialId: string;
}

/** Extensão -> Content-Type, só o suficiente pra o navegador (PDF) e os
 * visualizadores externos (Office/Google, que inspecionam a extensão da URL
 * mais do que o header) renderizarem certo. */
const MIME_BY_EXT: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.txt': 'text/plain',
  '.csv': 'text/csv',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};

/** Formatos com visualização embutida (ver dashboard/biblioteca) — os demais só têm botão de baixar. */
export const VIEWABLE_EXTENSIONS = new Set(['.pdf', '.doc', '.docx', '.ppt', '.pptx']);

/**
 * Leitura pro tenant — `EstudanteAccessGuard` já bloqueia tenant.kind=ESTUDANTE
 * antes de chegar aqui (rota não está na allowlist), então esta service só
 * precisa existir pra quem já passou o guard (CLINICA). Sem RLS de propósito,
 * ver LibraryMaterial no schema.prisma.
 */
@Injectable()
export class LibraryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async list() {
    const materials = await this.prisma.libraryMaterial.findMany({
      where: { active: true },
      orderBy: [{ category: 'asc' }, { title: 'asc' }],
    });
    return materials.map((m) => ({
      ...m,
      fileExt: path.extname(m.filePath).toLowerCase(),
    }));
  }

  async getFilePath(id: string) {
    const material = await this.prisma.libraryMaterial.findUnique({ where: { id } });
    if (!material || !material.active) throw new NotFoundException('Material não encontrado.');
    return { absolutePath: path.join(LIBRARY_MATERIAL_UPLOAD_DIR, material.filePath), title: material.title };
  }

  /**
   * Token de curta duração (10 min) — só pra abrir a visualização inline sem
   * expor o arquivo pra sempre numa URL pública. Precisa ser uma rota
   * pública de verdade (ver AuthMiddleware.exclude em auth.module.ts) porque
   * o Office/Google Viewer busca a URL diretamente, sem conseguir mandar o
   * Authorization Bearer do usuário.
   */
  async createViewToken(id: string): Promise<string> {
    const material = await this.prisma.libraryMaterial.findUnique({ where: { id } });
    if (!material || !material.active) throw new NotFoundException('Material não encontrado.');
    const payload: LibraryViewTokenPayload = { purpose: 'library-view', materialId: id };
    return this.jwt.sign(payload, { expiresIn: '10m' });
  }

  async resolveViewToken(id: string, token: string) {
    let payload: LibraryViewTokenPayload;
    try {
      payload = this.jwt.verify<LibraryViewTokenPayload>(token);
    } catch {
      throw new UnauthorizedException('Link de visualização inválido ou expirado.');
    }
    if (payload.purpose !== 'library-view' || payload.materialId !== id) {
      throw new UnauthorizedException('Link de visualização inválido.');
    }

    const material = await this.prisma.libraryMaterial.findUnique({ where: { id } });
    if (!material || !material.active) throw new NotFoundException('Material não encontrado.');

    const ext = path.extname(material.filePath).toLowerCase();
    return {
      absolutePath: path.join(LIBRARY_MATERIAL_UPLOAD_DIR, material.filePath),
      mimeType: MIME_BY_EXT[ext] ?? 'application/octet-stream',
      title: material.title,
    };
  }

  getPublicApiUrl(): string {
    return this.config.get<string>('PUBLIC_API_URL', 'http://localhost:3333');
  }
}
