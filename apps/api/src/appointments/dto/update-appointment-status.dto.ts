import { IsIn } from 'class-validator';

export const APPOINTMENT_STATUSES = ['agendado', 'confirmado', 'concluido', 'cancelado', 'falta'] as const;
export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[number];

export class UpdateAppointmentStatusDto {
  @IsIn(APPOINTMENT_STATUSES)
  status: AppointmentStatus;
}
