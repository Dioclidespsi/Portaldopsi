import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSiteCommentDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  authorName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(2000)
  content: string;

  /** Marcado pelo próprio visitante — nunca inferido. Ver comentário no schema.prisma (SiteComment). */
  @IsBoolean()
  consentToPublish: boolean;
}
