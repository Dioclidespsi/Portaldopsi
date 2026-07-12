import { IsBoolean, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class UpsertOfferDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(3)
  description: string;

  @IsUrl()
  externalUrl: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
