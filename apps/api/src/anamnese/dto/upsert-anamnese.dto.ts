import { IsObject, IsString } from 'class-validator';

export class UpsertAnamneseDto {
  @IsString()
  patientId: string;

  @IsString()
  templateSlug: string;

  @IsObject()
  fields: Record<string, string>;
}
