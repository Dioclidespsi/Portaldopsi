import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCourseModuleDto {
  @IsInt()
  order: number;

  @IsString()
  title: string;

  /** Libera sem assinatura/matrícula — isca/lead-magnet. */
  @IsOptional()
  @IsBoolean()
  free?: boolean;
}
