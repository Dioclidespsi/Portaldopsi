import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';

/**
 * Declaração de matrícula do estudante de psicologia (item 4) — mesmo
 * padrão de crp-upload.config.ts: fora de pasta pública, só baixável pelo
 * próprio titular ou pelo admin.
 */
export const STUDENT_DOCUMENT_UPLOAD_DIR = path.resolve(__dirname, '../../uploads/student-documents');
fs.mkdirSync(STUDENT_DOCUMENT_UPLOAD_DIR, { recursive: true });

const ALLOWED_MIME_TYPES = new Set(['application/pdf', 'image/jpeg', 'image/png']);

export const studentDocumentUploadOptions = {
  storage: diskStorage({
    destination: STUDENT_DOCUMENT_UPLOAD_DIR,
    filename: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${randomUUID()}${ext}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, accept: boolean) => void) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(new BadRequestException('Envie a declaração de matrícula em PDF, JPG ou PNG.'), false);
      return;
    }
    cb(null, true);
  },
};
