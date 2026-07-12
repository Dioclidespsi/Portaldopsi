import { IsIn, IsOptional, IsString } from 'class-validator';

export const SUPERVISION_STATUSES = ['agendado', 'concluido', 'cancelado'] as const;
export type SupervisionStatus = (typeof SUPERVISION_STATUSES)[number];

export class UpdateSupervisionSessionDto {
  @IsOptional()
  @IsIn(SUPERVISION_STATUSES)
  status?: SupervisionStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
