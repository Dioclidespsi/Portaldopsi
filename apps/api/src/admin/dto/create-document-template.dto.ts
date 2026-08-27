import { DocumentTemplateAudience } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateDocumentTemplateDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  description: string;

  /** Vem como string ("true"/"false") no multipart/form-data — precisa converter. */
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  requiresAcceptance?: boolean;

  /** STAFF (padrão) = psicólogo/clínica; ESTUDANTE = aluno da Loja. Ver DocumentTemplateAudience no schema. */
  @IsOptional()
  @IsEnum(DocumentTemplateAudience)
  audience?: DocumentTemplateAudience;
}
