import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsBrPhone, IsCpfCnpj } from '../../common/validators/br-documents';

export class CreatePayoutAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'E-mail inválido.' })
  email: string;

  @IsCpfCnpj()
  cpfCnpj: string;

  @IsBrPhone()
  mobilePhone: string;

  /** Só relevante se cpfCnpj for CNPJ — Asaas usa isso pra decidir o fluxo de KYC de pessoa jurídica. */
  @IsOptional()
  @IsIn(['MEI', 'LIMITED', 'INDIVIDUAL', 'ASSOCIATION'])
  companyType?: string;
}
