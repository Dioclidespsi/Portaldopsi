import { IsEmail, IsString } from 'class-validator';

export class RequestPasswordResetDto {
  @IsString()
  slug: string;

  @IsEmail()
  email: string;
}
