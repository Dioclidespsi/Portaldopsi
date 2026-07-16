import { IsString, MinLength } from 'class-validator';

export class ReportContentDto {
  @IsString()
  @MinLength(3)
  reason: string;
}
