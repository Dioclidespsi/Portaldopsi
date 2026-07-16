import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';

/** Igual a profile-photo-upload.config.ts: precisa de rota pública dedicada (GET /public/banner-images/:filename), banner aparece na home sem login. */
export const BANNER_UPLOAD_DIR = path.resolve(__dirname, '../../uploads/banners');
fs.mkdirSync(BANNER_UPLOAD_DIR, { recursive: true });

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export const bannerUploadOptions = {
  storage: diskStorage({
    destination: BANNER_UPLOAD_DIR,
    filename: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${randomUUID()}${ext}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, accept: boolean) => void) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(new BadRequestException('Envie a imagem em JPG, PNG ou WEBP.'), false);
      return;
    }
    cb(null, true);
  },
};
