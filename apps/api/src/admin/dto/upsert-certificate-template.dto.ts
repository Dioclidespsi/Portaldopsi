import { Type } from 'class-transformer';
import { IsInt, IsNumber } from 'class-validator';

/** Reutilizado tanto no upload (multipart, campos chegam como string) quanto no preview (JSON) — @Type converte os dois casos. */
export class UpsertCertificateTemplateDto {
  @Type(() => Number)
  @IsNumber()
  nameX: number;

  @Type(() => Number)
  @IsNumber()
  nameY: number;

  @Type(() => Number)
  @IsInt()
  nameFontSize: number;

  @Type(() => Number)
  @IsNumber()
  courseX: number;

  @Type(() => Number)
  @IsNumber()
  courseY: number;

  @Type(() => Number)
  @IsInt()
  courseFontSize: number;

  @Type(() => Number)
  @IsNumber()
  dateX: number;

  @Type(() => Number)
  @IsNumber()
  dateY: number;

  @Type(() => Number)
  @IsInt()
  dateFontSize: number;

  @Type(() => Number)
  @IsNumber()
  codeX: number;

  @Type(() => Number)
  @IsNumber()
  codeY: number;

  @Type(() => Number)
  @IsInt()
  codeFontSize: number;
}
