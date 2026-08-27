import { IsString, MinLength } from 'class-validator';

/** `visitorToken` vem do localStorage do navegador — gerado uma vez, sem cadastro (ver SiteLike no schema.prisma). */
export class SiteLikeDto {
  @IsString()
  @MinLength(8)
  visitorToken: string;
}
