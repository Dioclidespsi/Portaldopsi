import { IsEmail } from 'class-validator';

export class RequestPatientPasswordResetDto {
  @IsEmail()
  email: string;
}
