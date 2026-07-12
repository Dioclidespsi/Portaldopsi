import { IsString, MinLength } from 'class-validator';

export class CreateCommunityReplyDto {
  @IsString()
  @MinLength(1)
  content: string;
}
