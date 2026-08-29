import { IsBoolean, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreateProspectDto {
  @IsString()
  @MinLength(2)
  fullName: string;

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

  /** presencial | online | híbrido — texto livre, mesmo padrão de Tenant.specialties. */
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

  /** Obrigatório saber de onde veio o dado (ver item 3 do spec de prospecção). */
  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsString()
  sourceUrl?: string;

  @IsOptional()
  @IsString()
  sourceType?: string;
}
