import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RequestPasswordResetDto {
  /** Opcional — mesmo raciocínio do LoginDto.slug. */
  @IsOptional()
  @IsString()
  slug?: string;

  @IsEmail()
  email: string;
}
