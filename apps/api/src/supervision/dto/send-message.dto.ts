import { IsString, MinLength } from 'class-validator';

export class SendSupervisionMessageDto {
  @IsString()
  @MinLength(1)
  content: string;
}
