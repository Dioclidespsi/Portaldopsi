import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

/**
 * `slotId` é sempre exigido. Os demais campos só valem pro fluxo anônimo
 * (visitante sem login ainda) — ver BookingService.createBooking: se vier
 * um paciente já autenticado (Authorization: Bearer), tudo isso é ignorado,
 * só o slot importa. Por isso ficam opcionais aqui e a checagem de
 * "preencheu tudo" acontece no service, condicional ao fluxo.
 */
export class CreateBookingDto {
  @IsString()
  slotId: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  phone?: string;

  /** Exigido pelo Asaas pra gerar a cobrança real — ver AsaasService.createSplitCharge. */
  @IsOptional()
  @IsString()
  @MinLength(11)
  cpfCnpj?: string;

  /** Cria a PatientAccount (login automático) na primeira compra — ver BookingService.createAnonymousBooking. */
  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  /** Exigido no fluxo anônimo (cria PatientAccount) — ver BookingService.createAnonymousBooking. */
  @IsOptional()
  @IsBoolean()
  termsAccepted?: boolean;
}
