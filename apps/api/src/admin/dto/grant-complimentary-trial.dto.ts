import { IsString, MinLength } from 'class-validator';

export class GrantComplimentaryTrialDto {
  @IsString()
  @MinLength(1)
  tenantSlug: string;
}
