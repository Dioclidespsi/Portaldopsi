import { IsEmail, IsIn, IsOptional, IsString, IsUrl, Matches, MinLength } from 'class-validator';

export class PurchaseDto {
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
