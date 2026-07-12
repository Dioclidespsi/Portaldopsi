import { IsArray, IsString, MinLength } from 'class-validator';

export class RewritePostDto {
  @IsString()
  @MinLength(1)
  content: string;

  @IsArray()
  flagReasons: string[];
}
