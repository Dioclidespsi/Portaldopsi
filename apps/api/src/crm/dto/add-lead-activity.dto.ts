import { IsString, MinLength } from 'class-validator';

export class AddLeadActivityDto {
  @IsString()
  @MinLength(1)
  content: string;
}
