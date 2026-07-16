import { IsObject } from 'class-validator';

export class SubmitTestDto {
  /** Mapa questionId -> valor (número, escala objetiva) ou texto (subjetiva). */
  @IsObject()
  answers: Record<string, number | string>;
}
