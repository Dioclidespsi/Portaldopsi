import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';

/** Mesmo padrão de storage local do resto do projeto (sem object storage neste estágio). */
export const MEDITATION_UPLOAD_DIR = path.resolve(__dirname, '../../uploads/meditation-tracks');
fs.mkdirSync(MEDITATION_UPLOAD_DIR, { recursive: true });

const ALLOWED_MIME_TYPES = new Set(['audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/x-wav', 'audio/ogg']);

export const meditationUploadOptions = {
  storage: diskStorage({
    destination: MEDITATION_UPLOAD_DIR,
    filename: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${randomUUID()}${ext}`);
    },
  }),
  limits: { fileSize: 80 * 1024 * 1024 },
  fileFilter: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, accept: boolean) => void) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(new BadRequestException('Envie o áudio em MP3, M4A, WAV ou OGG.'), false);
      return;
    }
    cb(null, true);
  },
};
