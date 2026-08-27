import { Transform } from 'class-transformer';
import { Equals, IsEmail, IsIn, IsOptional, IsString, IsUrl, Matches, MinLength } from 'class-validator';

export class PurchaseDto {
  /**
   * Precisa vir true — aceite do Termo de Uso do Aluno (ver DocumentTemplate
   * audience=ESTUDANTE). Vem como string ("true"/"false") no multipart/form-data
   * (mesmo padrão de CreateDocumentTemplateDto.requiresAcceptance) — precisa
   * converter antes do @Equals, senão "true" (string) nunca bate com true (boolean).
   */
  @Transform(({ value }) => value === 'true' || value === true)
  @Equals(true, { message: 'É necessário aceitar o Termo de Uso.' })
  termsAccepted: boolean;

  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @Matches(/^[a-z0-9-]+$/, { message: 'slug deve conter apenas letras minúsculas, números e hífen.' })
  slug: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'senha deve ter ao menos 8 caracteres.' })
  password: string;

  @IsString()
  courseSlug: string;

  /** Item 4 — exigência de comprovação de matrícula (estudante de psicologia). */
  @IsString()
  @MinLength(1)
  institution: string;

  @IsString()
  @MinLength(1)
  enrollmentNumber: string;

  @IsIn(['STRIPE', 'ASAAS'])
  provider: 'STRIPE' | 'ASAAS';

  /** Só usado (e exigido) quando provider=ASAAS. */
  @IsOptional()
  @IsString()
  cpfCnpj?: string;

  /** Só usado (e exigido) quando provider=STRIPE. */
  @IsOptional()
  @IsUrl({ require_tld: false })
  successUrl?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  cancelUrl?: string;
}
