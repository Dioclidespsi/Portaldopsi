import { IsString, MinLength } from 'class-validator';

export class RejectCrpDto {
  @IsString()
  @MinLength(3)
  reason: string;
}
