import { IsString, MinLength } from 'class-validator';

export class AddProspectActivityDto {
  @IsString()
  @MinLength(1)
  content: string;
}
