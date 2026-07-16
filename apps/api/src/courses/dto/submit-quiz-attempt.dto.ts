import { IsObject } from 'class-validator';

export class SubmitQuizAttemptDto {
  /** Mapa questionId -> optionId escolhido. */
  @IsObject()
  answers: Record<string, string>;
}
