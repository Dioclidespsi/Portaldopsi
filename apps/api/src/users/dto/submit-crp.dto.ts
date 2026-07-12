import { IsString, MinLength } from 'class-validator';

export class SubmitCrpDto {
  @IsString()
  @MinLength(3)
  crpNumber: string;
}
