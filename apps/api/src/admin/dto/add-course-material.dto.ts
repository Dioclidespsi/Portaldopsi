import { IsString } from 'class-validator';

export class AddCourseMaterialDto {
  @IsString()
  title: string;
}
