import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsBoolean, IsInt, IsString, Max, Min, ValidateNested } from 'class-validator';

export class QuizOptionInputDto {
  @IsString()
  id: string;

  @IsString()
  label: string;
}

export class QuizQuestionInputDto {
  @IsString()
  prompt: string;

  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => QuizOptionInputDto)
  options: QuizOptionInputDto[];

  @IsString()
  correctOptionId: string;
}

export class UpsertCourseQuizDto {
  /** Se true, precisa atingir passingScorePercent antes da próxima aula (não-extra) abrir. */
  @IsBoolean()
  required: boolean;

  @IsInt()
  @Min(0)
  @Max(100)
  passingScorePercent: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => QuizQuestionInputDto)
  questions: QuizQuestionInputDto[];
}
