import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class ResponseScaleOptionDto {
  @IsInt()
  value: number;

  @IsString()
  label: string;
}

export class ScoreBandInputDto {
  @IsInt()
  maxScore: number;

  @IsString()
  label: string;
}

export class TestQuestionInputDto {
  @IsIn(['objetiva', 'subjetiva'])
  type: 'objetiva' | 'subjetiva';

  @IsString()
  prompt: string;

  /** Item de pontuação invertida (ex: Rosenberg) — ver TestQuestion.reverseScored. */
  @IsOptional()
  @IsBoolean()
  reverseScored?: boolean;

  /** Opções específicas desta pergunta (ex: HAD, Beck) — sobrepõe o responseScale do template. */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseScaleOptionDto)
  options?: ResponseScaleOptionDto[];

  /** Key de uma entrada em UpsertTestTemplateDto.subscales — ver TestQuestion.subscale. */
  @IsOptional()
  @IsString()
  subscale?: string;
}

export class SubscaleDefInputDto {
  @IsString()
  key: string;

  @IsString()
  label: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScoreBandInputDto)
  scoreBands?: ScoreBandInputDto[];
}

export class DerivedScoreFormulaTermInputDto {
  @IsString()
  subscale: string;

  @IsNumber()
  weight: number;
}

export class DerivedScoreDefInputDto {
  @IsString()
  key: string;

  @IsString()
  label: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => DerivedScoreFormulaTermInputDto)
  formula: DerivedScoreFormulaTermInputDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScoreBandInputDto)
  scoreBands?: ScoreBandInputDto[];
}

export class UpsertTestTemplateDto {
  @IsString()
  slug: string;

  @IsString()
  title: string;

  /** Subgrupo livre (ex: "Ansiedade", "Depressão", "Carreira"). */
  @IsString()
  category: string;

  @IsString()
  source: string;

  @IsString()
  disclaimer: string;

  @IsString()
  instructions: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseScaleOptionDto)
  responseScale?: ResponseScaleOptionDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScoreBandInputDto)
  scoreBands?: ScoreBandInputDto[];

  /** Subescalas do instrumento (ex: YSQ, Seligman) — ver TestTemplate.subscales. */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubscaleDefInputDto)
  subscales?: SubscaleDefInputDto[];

  /** Escores compostos calculados a partir das subescalas — ver TestTemplate.derivedScores. */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DerivedScoreDefInputDto)
  derivedScores?: DerivedScoreDefInputDto[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TestQuestionInputDto)
  questions: TestQuestionInputDto[];
}
