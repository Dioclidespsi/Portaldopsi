import { IsDateString, IsEmail, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { IsBrPhone, IsCpfCnpj } from '../../common/validators/br-documents';

/**
 * Campos exigidos pelo Asaas em POST /accounts (KYC pra abrir sub-conta de
 * recebimento) — descobertos via erro 400 real em produção (2026-07-29):
 * "É necessário informar o CEP"/"a data de nascimento", confirmado contra
 * https://docs.asaas.com/reference/create-subaccount — a doc geral lista
 * `birthDate` como opcional, mas o Asaas exige na prática para CPF (pessoa
 * física). `incomeValue`/`address`/`addressNumber`/`province`/`postalCode`
 * são obrigatórios documentados.
 */
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

  /** Formato YYYY-MM-DD. */
  @IsDateString()
  birthDate: string;

  /** Renda/faturamento mensal em reais (não centavos — o Asaas espera valor decimal aqui). */
  @IsInt()
  @Min(1)
  incomeValueCents: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  addressNumber: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsString()
  @IsNotEmpty()
  province: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  /** Só relevante se cpfCnpj for CNPJ — Asaas usa isso pra decidir o fluxo de KYC de pessoa jurídica. */
  @IsOptional()
  @IsIn(['MEI', 'LIMITED', 'INDIVIDUAL', 'ASSOCIATION'])
  companyType?: string;
}
