import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';

/**
 * Imagem de post da Comunidade — pensada pra posts tipo "data comemorativa"
 * que o psicólogo baixa e compartilha nas próprias redes sociais. Por isso
 * é servida SEM autenticação (mesmo padrão de profile-photo-upload.config.ts),
 * senão o link não abriria fora do app.
 */
export const COMMUNITY_IMAGE_UPLOAD_DIR = path.resolve(__dirname, '../../uploads/community-images');
fs.mkdirSync(COMMUNITY_IMAGE_UPLOAD_DIR, { recursive: true });

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export const communityImageUploadOptions = {
  storage: diskStorage({
    destination: COMMUNITY_IMAGE_UPLOAD_DIR,
    filename: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${randomUUID()}${ext}`);
    },
  }),
  /// Maior que a foto de perfil (5MB) — arte de rede social costuma pesar mais e a ideia
  /// aqui é justamente boa qualidade pra compartilhar, não um avatar pequeno.
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, accept: boolean) => void) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(new BadRequestException('Envie a imagem em JPG, PNG ou WEBP.'), false);
      return;
    }
    cb(null, true);
  },
};
