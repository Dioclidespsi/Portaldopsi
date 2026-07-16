import { IsInt, IsOptional, IsString } from 'class-validator';

export class CorrectTestDto {
  @IsOptional()
  @IsInt()
  finalScore?: number;

  @IsOptional()
  @IsString()
  finalResultLabel?: string;

  /** Como/se o psicólogo decidiu comunicar o resultado ao paciente. */
  @IsOptional()
  @IsString()
  communicationNote?: string;
}
