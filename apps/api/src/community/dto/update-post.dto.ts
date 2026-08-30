import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import { COMMUNITY_CATEGORIES } from './create-post.dto';

export class UpdateCommunityPostDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  content?: string;

  @IsOptional()
  @IsIn(COMMUNITY_CATEGORIES)
  category?: (typeof COMMUNITY_CATEGORIES)[number];
}
