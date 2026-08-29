import { IsOptional, IsString } from 'class-validator';

export class BlockProspectDto {
  @IsOptional()
  @IsString()
  reason?: string;
}
