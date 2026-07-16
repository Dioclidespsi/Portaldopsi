import { IsString } from 'class-validator';

export class BookAppointmentDto {
  @IsString()
  slotId: string;
}
