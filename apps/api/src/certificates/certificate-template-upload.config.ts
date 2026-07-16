import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';

export const CERTIFICATE_TEMPLATE_UPLOAD_DIR = path.resolve(__dirname, '../../uploads/certificate-template');
fs.mkdirSync(CERTIFICATE_TEMPLATE_UPLOAD_DIR, { recursive: true });

export const CERTIFICATE_OUTPUT_DIR = path.resolve(__dirname, '../../uploads/certificates');
fs.mkdirSync(CERTIFICATE_OUTPUT_DIR, { recursive: true });

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export const certificateTemplateUploadOptions = {
  storage: diskStorage({
    destination: CERTIFICATE_TEMPLATE_UPLOAD_DIR,
    filename: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${randomUUID()}${ext}`);
    },
  }),
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, accept: boolean) => void) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(new BadRequestException('Envie a imagem do modelo em JPG, PNG ou WEBP.'), false);
      return;
    }
    cb(null, true);
  },
};
