import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  slotId: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  phone: string;

  /** Exigido pelo Asaas pra gerar a cobrança real — ver AsaasService.createSplitCharge. */
  @IsString()
  @MinLength(11)
  cpfCnpj: string;
}
