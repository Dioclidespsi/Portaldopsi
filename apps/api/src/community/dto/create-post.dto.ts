import { IsIn, IsString, MinLength } from 'class-validator';

export const COMMUNITY_CATEGORIES = [
  'INDICACAO',
  'CASO_CLINICO',
  'GESTAO_CONSULTORIO',
  'ABORDAGENS_TECNICAS',
  'CARREIRA_FORMACAO',
  'GERAL',
] as const;

export class CreateCommunityPostDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  @MinLength(1)
  content: string;

  @IsIn(COMMUNITY_CATEGORIES)
  category: (typeof COMMUNITY_CATEGORIES)[number];
}
