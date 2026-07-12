import { IsEmail, IsString } from 'class-validator';

export class PatientLoginDto {
  @IsString()
  slug: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
