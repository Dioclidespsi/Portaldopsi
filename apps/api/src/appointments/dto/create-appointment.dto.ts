import { IsISO8601, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  patientId: string;

  @IsISO8601()
  startsAt: string;

  @IsISO8601()
  endsAt: string;
}
