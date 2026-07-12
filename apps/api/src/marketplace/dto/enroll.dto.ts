import { IsIn, IsOptional, IsString, IsUrl } from 'class-validator';

export class EnrollDto {
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
