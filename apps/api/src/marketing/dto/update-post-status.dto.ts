import { IsIn } from 'class-validator';

export const MARKETING_POST_STATUSES = ['RASCUNHO', 'AGENDADO', 'PUBLICADO'] as const;

export class UpdatePostStatusDto {
  @IsIn(MARKETING_POST_STATUSES)
  status: (typeof MARKETING_POST_STATUSES)[number];
}
