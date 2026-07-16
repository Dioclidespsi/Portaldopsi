import { IsIn } from 'class-validator';
import { SITE_COLOR_PALETTES } from '../../profile/dto/update-profile.dto';

export class UpdatePlatformSettingsDto {
  @IsIn(SITE_COLOR_PALETTES)
  colorPalette: (typeof SITE_COLOR_PALETTES)[number];
}
