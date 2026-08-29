import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateProspectSearchRequestDto {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  specialty?: string;

  @IsOptional()
  @IsString()
  approach?: string;

  @IsOptional()
  @IsString()
  audience?: string;

  @IsOptional()
  @IsString()
  serviceMode?: string;

  /** Texto livre, separado por vírgula — palavras que devem aparecer na busca. */
  @IsOptional()
  @IsString()
  includeKeywords?: string;

  /** Texto livre, separado por vírgula — palavras que devem ser evitadas. */
  @IsOptional()
  @IsString()
  excludeKeywords?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(200)
  quantity?: number;
}
