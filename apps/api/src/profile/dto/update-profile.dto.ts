import { IsBoolean, IsEmail, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  bio?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  photoUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  specialties?: string;

  @IsOptional()
  @IsEmail()
  publicEmail?: string;

  @IsOptional()
  @IsString()
  publicPhone?: string;

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
