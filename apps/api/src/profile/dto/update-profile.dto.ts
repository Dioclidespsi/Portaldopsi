import { IsBoolean, IsEmail, IsIn, IsInt, IsOptional, IsString, IsUrl, Max, MaxLength, Min } from 'class-validator';

export const SITE_COLOR_PALETTES = ['salvia', 'terracota', 'oceano', 'lavanda', 'areia', 'vinho', 'amarela', 'rosa', 'coral', 'grafite'] as const;

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  bio?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  attendanceInfo?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  photoUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  specialties?: string;

  @IsOptional()
  @IsEmail()
  publicEmail?: string;

  @IsOptional()
  @IsString()
  publicPhone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  publicAddress?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  publicCity?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2)
  publicState?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  @MaxLength(300)
  socialInstagram?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  @MaxLength(300)
  socialYoutube?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  @MaxLength(300)
  socialFacebook?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  @MaxLength(300)
  socialLinkedin?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  @MaxLength(300)
  socialTiktok?: string;

  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @IsOptional()
  @IsIn(SITE_COLOR_PALETTES)
  colorPalette?: (typeof SITE_COLOR_PALETTES)[number];

  /** Preço da sessão em centavos — precisa estar preenchido (>0) pra bookingEnabled surtir efeito. */
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100_000_00)
  sessionPriceCents?: number;

  /** Liga o widget de agendamento público em /{slug} — ver BookingService.requireBookableTenant. */
  @IsOptional()
  @IsBoolean()
  bookingEnabled?: boolean;

  /** Opt-in separado de `published` — ver DirectoryService.search. */
  @IsOptional()
  @IsBoolean()
  listedInDirectory?: boolean;
}
