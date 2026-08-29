import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PROSPECT_STAGES } from './update-prospect.dto';

export class ListProspectsDto {
  /** Busca por nome, cidade ou especialidade (contains, case-insensitive). */
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(PROSPECT_STAGES)
  stage?: (typeof PROSPECT_STAGES)[number];

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  minScore?: number;

  @IsOptional()
  @IsIn(['true', 'false'])
  hasWebsite?: 'true' | 'false';

  @IsOptional()
  @IsIn(['true', 'false'])
  hasInstagram?: 'true' | 'false';

  @IsOptional()
  @IsIn(['true', 'false'])
  hasWhatsapp?: 'true' | 'false';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(200)
  pageSize?: number = 50;
}
