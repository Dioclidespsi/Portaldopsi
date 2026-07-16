import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  slug: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  priceCents?: number;
}
