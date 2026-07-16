import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateLibraryMaterialDto {
  @IsString()
  @MinLength(1)
  category: string;

  @IsString()
  @MinLength(1)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}
