import { IsString, MinLength } from 'class-validator';

export class CreateCommunityPostDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  @MinLength(1)
  content: string;
}
