import { IsBoolean } from 'class-validator';

export class PublishSiteCommentDto {
  @IsBoolean()
  publish: boolean;
}
