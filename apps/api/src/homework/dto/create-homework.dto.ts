import { IsISO8601, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateHomeworkDto {
  @IsString()
  patientId: string;

  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  @MinLength(2)
  instructions: string;

  @IsOptional()
  @IsISO8601()
  dueDate?: string;
}
