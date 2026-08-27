import { IsIn, IsInt, IsOptional, Min } from 'class-validator';
import { SITE_COLOR_PALETTES } from '../../profile/dto/update-profile.dto';

export class UpdatePlatformSettingsDto {
  @IsOptional()
  @IsIn(SITE_COLOR_PALETTES)
  colorPalette?: (typeof SITE_COLOR_PALETTES)[number];

  /** null/ausente = volta a usar o valor padrão de billing/plans.ts. */
  @IsOptional()
  @IsInt()
  @Min(100)
  subscriptionMonthlyPriceCents?: number | null;

  @IsOptional()
  @IsInt()
  @Min(100)
  subscriptionYearlyPriceCents?: number | null;
}
