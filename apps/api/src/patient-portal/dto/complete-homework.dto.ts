import { IsOptional, IsString } from 'class-validator';

export class CompleteHomeworkDto {
  @IsOptional()
  @IsString()
  patientNote?: string;
}
