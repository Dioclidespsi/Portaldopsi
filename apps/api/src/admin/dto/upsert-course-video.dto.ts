import { IsString, IsUrl, MinLength } from 'class-validator';

export class UpsertCourseVideoDto {
  @IsString()
  @MinLength(1)
  courseSlug: string;

  @IsString()
  @MinLength(1)
  moduleSlug: string;

  @IsUrl()
  youtubeUrl: string;
}
