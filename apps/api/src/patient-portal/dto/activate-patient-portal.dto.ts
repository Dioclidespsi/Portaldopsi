import { IsString, MinLength } from 'class-validator';

export class ActivatePatientPortalDto {
  @IsString()
  slug: string;

  @IsString()
  token: string;

  @IsString()
  @MinLength(8)
  password: string;
}
