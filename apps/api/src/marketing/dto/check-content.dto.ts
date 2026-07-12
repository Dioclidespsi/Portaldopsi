import { IsString } from 'class-validator';

export class CheckContentDto {
  @IsString()
  content: string;
}
