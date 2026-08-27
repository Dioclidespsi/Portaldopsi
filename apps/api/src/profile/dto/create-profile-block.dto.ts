import { IsObject, IsString } from 'class-validator';

export class CreateProfileBlockDto {
  @IsString()
  type: string;

  @IsObject()
  fields: Record<string, string>;
}
