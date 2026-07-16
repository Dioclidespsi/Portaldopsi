import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsUrl } from 'class-validator';

/** `position` (1 ou 2) vem da URL (:position), não do corpo — ver admin.controller.ts. */
export class UpsertBannerDto {
  @IsOptional()
  @IsUrl({ require_tld: false })
  linkUrl?: string;

  /** Chega como string ("true"/"false") por vir de multipart/form-data junto com o arquivo. */
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  active?: boolean;
}
