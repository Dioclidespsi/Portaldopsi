import { IsString, MinLength } from 'class-validator';

export class ResetPatientPasswordDto {
  @IsString()
  token: string;

  @IsString()
  @MinLength(8, { message: 'senha deve ter ao menos 8 caracteres.' })
  newPassword: string;
}
