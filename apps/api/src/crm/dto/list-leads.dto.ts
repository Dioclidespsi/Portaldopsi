import { IsIn, IsOptional, IsString } from 'class-validator';
import { LEAD_STAGES } from './update-lead.dto';

export class ListLeadsDto {
  /** Busca por nome ou contato (contains, case-insensitive). */
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(LEAD_STAGES)
  stage?: (typeof LEAD_STAGES)[number];
}
