import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { COMMUNITY_CATEGORIES } from './create-post.dto';

export class ListCommunityPostsDto {
  @IsOptional()
  @IsIn(COMMUNITY_CATEGORIES)
  category?: (typeof COMMUNITY_CATEGORIES)[number];

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  take?: number = 20;
}
