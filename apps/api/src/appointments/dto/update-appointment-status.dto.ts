import { IsIn, IsOptional, IsString } from 'class-validator';

/** "aguardando_pagamento" só é criado pelo agendamento público (ver BookingService) — nunca definido manualmente pela equipe. */
export const APPOINTMENT_STATUSES = ['agendado', 'aguardando_pagamento', 'confirmado', 'concluido', 'cancelado', 'falta'] as const;
export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[number];

export class UpdateAppointmentStatusDto {
  @IsIn(APPOINTMENT_STATUSES)
  status: AppointmentStatus;

  /** Só usado quando status é "cancelado" ou "falta". */
  @IsOptional()
  @IsString()
  cancelReason?: string;
}
