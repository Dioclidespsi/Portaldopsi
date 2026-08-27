import { IsObject } from 'class-validator';

export class ApplyTestLiveDto {
  /** Mapa questionId -> valor (número, escala objetiva) ou texto (subjetiva) — digitado pelo profissional durante a aplicação ao vivo. */
  @IsObject()
  answers: Record<string, number | string>;
}
