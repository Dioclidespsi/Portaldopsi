import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export const SEARCH_REQUEST_STATUSES = ['PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA'] as const;

export class UpdateProspectSearchRequestDto {
  @IsIn(SEARCH_REQUEST_STATUSES)
  status: (typeof SEARCH_REQUEST_STATUSES)[number];

  @IsOptional()
  @IsInt()
  @Min(0)
  resultCount?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
