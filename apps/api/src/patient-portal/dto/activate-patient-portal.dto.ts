import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

/**
 * Ativação global — sem slug: `activationToken` já é @unique no schema, e a
 * tabela patients aceita o sentinela '__system__' na RLS, então dá pra
 * localizar o Patient certo sem saber a clínica de antemão (ver
 * PatientPortalService.activate()).
 */
export class ActivatePatientPortalDto {
  @IsString()
  token: string;

  @IsString()
  @MinLength(8)
  password: string;

  /** Só exigido quando a ativação CRIA a PatientAccount — ver PatientPortalService.activate(). */
  @IsOptional()
  @IsBoolean()
  termsAccepted?: boolean;
}
