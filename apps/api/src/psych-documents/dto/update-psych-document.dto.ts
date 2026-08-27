import { IsObject, IsOptional, IsString } from 'class-validator';

export class UpdatePsychDocumentDto {
  @IsObject()
  fields: Record<string, string>;

  @IsOptional()
  @IsString()
  cid?: string;
}
