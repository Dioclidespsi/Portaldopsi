import { IsISO8601, IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(1)
  content: string;

  @IsOptional()
  @IsString()
  platform?: string;

  @IsOptional()
  @IsISO8601()
  scheduledAt?: string;
}
