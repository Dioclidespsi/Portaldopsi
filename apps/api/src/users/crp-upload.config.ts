import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';

/**
 * Armazenamento local em disco (`apps/api/uploads/crp/`, fora de qualquer
 * pasta servida publicamente) — não há storage em nuvem (S3/R2) configurado
 * ainda neste estágio. Suficiente para o fluxo de verificação manual; trocar
 * por object storage real antes de produção com volume.
 */
export const CRP_UPLOAD_DIR = path.resolve(__dirname, '../../uploads/crp');
fs.mkdirSync(CRP_UPLOAD_DIR, { recursive: true });

const ALLOWED_MIME_TYPES = new Set(['application/pdf', 'image/jpeg', 'image/png']);

export const crpUploadOptions = {
  storage: diskStorage({
    destination: CRP_UPLOAD_DIR,
    filename: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${randomUUID()}${ext}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, accept: boolean) => void) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(new BadRequestException('Envie o documento do CRP em PDF, JPG ou PNG.'), false);
      return;
    }
    cb(null, true);
  },
};
