import { IsIn, IsOptional, IsString } from 'class-validator';

export const LEAD_STAGES = ['NOVO', 'CONTATADO', 'AGENDADO', 'CONVERTIDO', 'PERDIDO'] as const;

export class UpdateLeadDto {
  @IsOptional()
  @IsIn(LEAD_STAGES)
  stage?: (typeof LEAD_STAGES)[number];

  @IsOptional()
  @IsString()
  notes?: string;
}
