import { IsInt, IsObject, IsOptional } from 'class-validator';

export class UpdateProfileBlockDto {
  @IsOptional()
  @IsObject()
  fields?: Record<string, string>;

  @IsOptional()
  @IsInt()
  position?: number;
}
