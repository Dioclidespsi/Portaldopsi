import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';

/**
 * Diferente dos outros uploads deste projeto (CRP, materiais, certificados),
 * a foto de perfil precisa ser servida SEM autenticação — ela aparece na
 * página pública (/p/{slug}) pra qualquer visitante. Por isso tem uma rota
 * pública dedicada (GET /public/photos/:filename, ver profile.controller.ts),
 * não o padrão de download autenticado usado no resto do projeto.
 */
export const PROFILE_PHOTO_UPLOAD_DIR = path.resolve(__dirname, '../../uploads/profile-photos');
fs.mkdirSync(PROFILE_PHOTO_UPLOAD_DIR, { recursive: true });

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export const profilePhotoUploadOptions = {
  storage: diskStorage({
    destination: PROFILE_PHOTO_UPLOAD_DIR,
    filename: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${randomUUID()}${ext}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, accept: boolean) => void) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(new BadRequestException('Envie a foto em JPG, PNG ou WEBP.'), false);
      return;
    }
    cb(null, true);
  },
};
