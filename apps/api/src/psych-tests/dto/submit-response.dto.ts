import { IsObject, IsString } from 'class-validator';

export class SubmitResponseDto {
  @IsString()
  patientId: string;

  /** Mapa itemId -> valor da escala de resposta (ver TestDefinition.responseScale); validado em PsychTestsService.score(). */
  @IsObject()
  answers: Record<string, number>;
}
