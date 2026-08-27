import { IsEmail, IsString } from 'class-validator';

/** Login global — sem slug de clínica, a conta é cross-tenant (ver PatientAccount). */
export class PatientLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
