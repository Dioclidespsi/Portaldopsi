import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';

/** Mesmo padrão de armazenamento local do CRP/DocumentTemplate — sem object storage neste estágio. */
export const COURSE_MATERIAL_UPLOAD_DIR = path.resolve(__dirname, '../../uploads/course-materials');
fs.mkdirSync(COURSE_MATERIAL_UPLOAD_DIR, { recursive: true });

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/zip',
]);

export const courseMaterialUploadOptions = {
  storage: diskStorage({
    destination: COURSE_MATERIAL_UPLOAD_DIR,
    filename: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${randomUUID()}${ext}`);
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, accept: boolean) => void) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(new BadRequestException('Envie o material de apoio em PDF, DOC, DOCX, PPTX, XLSX ou ZIP.'), false);
      return;
    }
    cb(null, true);
  },
};
