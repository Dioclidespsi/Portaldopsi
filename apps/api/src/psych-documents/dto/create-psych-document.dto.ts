import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreatePsychDocumentDto {
  @IsString()
  patientId: string;

  @IsString()
  templateSlug: string;

  @IsObject()
  fields: Record<string, string>;

  @IsOptional()
  @IsString()
  cid?: string;
}
