import { IsBoolean, IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateCourseLessonDto {
  @IsInt()
  order: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  youtubeUrl?: string;

  /** Aula extra/bônus — não entra na sequência obrigatória do módulo. */
  @IsOptional()
  @IsBoolean()
  isExtra?: boolean;
}
