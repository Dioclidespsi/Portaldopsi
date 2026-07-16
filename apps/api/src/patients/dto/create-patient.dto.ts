import { IsEmail, IsISO8601, IsOptional, IsString, MinLength } from 'class-validator';
import { IsBrPhone, IsCpfCnpj } from '../../common/validators/br-documents';

export class CreatePatientDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsString()
  socialName?: string;

  @IsOptional()
  @IsEmail({}, { message: 'E-mail inválido.' })
  email?: string;

  @IsOptional()
  @IsBrPhone()
  phone?: string;

  @IsOptional()
  @IsISO8601()
  birthDate?: string;

  @IsOptional()
  @IsCpfCnpj()
  cpfCnpj?: string;
}
