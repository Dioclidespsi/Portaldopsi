import { IsString, MinLength } from 'class-validator';

export class UpdateTenantNameDto {
  @IsString()
  @MinLength(2)
  name: string;
}
