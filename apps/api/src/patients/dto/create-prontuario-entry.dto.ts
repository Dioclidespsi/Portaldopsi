import { IsString, MinLength } from 'class-validator';

export class CreateProntuarioEntryDto {
  @IsString()
  @MinLength(1)
  content: string;
}
