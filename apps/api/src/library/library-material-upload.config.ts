import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';

/** Mesmo padrão de armazenamento local do document-templates — sem object storage neste estágio. */
export const LIBRARY_MATERIAL_UPLOAD_DIR = path.resolve(__dirname, '../../uploads/library-materials');
fs.mkdirSync(LIBRARY_MATERIAL_UPLOAD_DIR, { recursive: true });

/** "Vários formatos" (spec do usuário) — mais permissivo que document-templates, mas ainda uma allowlist. */
const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'text/csv',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'audio/mpeg',
  'audio/mp4',
  'video/mp4',
  'video/quicktime',
  'application/zip',
]);

export const libraryMaterialUploadOptions = {
  storage: diskStorage({
    destination: LIBRARY_MATERIAL_UPLOAD_DIR,
    filename: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${randomUUID()}${ext}`);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, accept: boolean) => void) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(new BadRequestException('Formato de arquivo não suportado.'), false);
      return;
    }
    cb(null, true);
  },
};
