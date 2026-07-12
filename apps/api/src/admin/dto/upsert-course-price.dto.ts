import { IsInt, IsString, Min, MinLength } from 'class-validator';

export class UpsertCoursePriceDto {
  @IsString()
  @MinLength(1)
  courseSlug: string;

  @IsInt()
  @Min(1)
  priceCents: number;
}
