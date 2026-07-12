import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';

/** Mesmo padrão de armazenamento local do CRP (ver users/crp-upload.config.ts) — sem object storage neste estágio. */
export const DOCUMENT_TEMPLATE_UPLOAD_DIR = path.resolve(__dirname, '../../uploads/document-templates');
fs.mkdirSync(DOCUMENT_TEMPLATE_UPLOAD_DIR, { recursive: true });

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]);

export const documentTemplateUploadOptions = {
  storage: diskStorage({
    destination: DOCUMENT_TEMPLATE_UPLOAD_DIR,
    filename: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${randomUUID()}${ext}`);
    },
  }),
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, accept: boolean) => void) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(new BadRequestException('Envie o modelo de documento em PDF, DOC, DOCX ou XLSX.'), false);
      return;
    }
    cb(null, true);
  },
};
