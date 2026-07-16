import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export const LEAD_STAGES = ['NOVO', 'CONTATADO', 'AGENDADO', 'CONVERTIDO', 'PERDIDO'] as const;

export class UpdateLeadDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  contact?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsIn(LEAD_STAGES)
  stage?: (typeof LEAD_STAGES)[number];

  @IsOptional()
  @IsString()
  notes?: string;

  /** null explícito remove a atribuição — vazio/omitido não altera. */
  @IsOptional()
  @IsString()
  assignedToId?: string | null;
}
