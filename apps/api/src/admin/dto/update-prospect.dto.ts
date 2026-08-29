import { IsBoolean, IsIn, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

export const PROSPECT_STAGES = [
  'ENCONTRADO',
  'QUALIFICADO',
  'SELECIONADO',
  'CONTATO_REALIZADO',
  'RESPONDEU',
  'INTERESSADO',
  'CADASTRO_INICIADO',
  'CADASTRADO',
  'SEM_INTERESSE',
  'NAO_LOCALIZADO',
  'DESCARTADO',
  'OPT_OUT',
] as const;

export class UpdateProspectDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  fullName?: string;

  @IsOptional()
  @IsString()
  professionalName?: string;

  @IsOptional()
  @IsString()
  crp?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  specialties?: string;

  @IsOptional()
  @IsString()
  approaches?: string;

  @IsOptional()
  @IsString()
  audience?: string;

  @IsOptional()
  @IsString()
  ageRange?: string;

  @IsOptional()
  @IsString()
  serviceMode?: string;

  @IsOptional()
  @IsString()
  experienceNotes?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  @IsString()
  linkedin?: string;

  @IsOptional()
  @IsString()
  googleBusinessUrl?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  reviewsCount?: number;

  @IsOptional()
  @IsBoolean()
  hasOnlineBooking?: boolean;

  @IsOptional()
  @IsBoolean()
  hasContactForm?: boolean;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsString()
  publicEmail?: string;

  @IsOptional()
  @IsIn(PROSPECT_STAGES)
  stage?: (typeof PROSPECT_STAGES)[number];

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  assignedToAdmin?: string;

  /// Marcar impede seleção futura pra contato — governança LGPD (item 19 do spec).
  @IsOptional()
  @IsBoolean()
  doNotContact?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  score?: number;
}
