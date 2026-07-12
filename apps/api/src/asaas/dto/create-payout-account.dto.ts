import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePayoutAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  cpfCnpj: string;

  @IsString()
  @IsNotEmpty()
  mobilePhone: string;

  /** Só relevante se cpfCnpj for CNPJ — Asaas usa isso pra decidir o fluxo de KYC de pessoa jurídica. */
  @IsOptional()
  @IsIn(['MEI', 'LIMITED', 'INDIVIDUAL', 'ASSOCIATION'])
  companyType?: string;
}
