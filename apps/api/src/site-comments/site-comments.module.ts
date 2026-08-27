import { Module } from '@nestjs/common';
import { SiteCommentsController } from './site-comments.controller';
import { SiteCommentsService } from './site-comments.service';

@Module({
  controllers: [SiteCommentsController],
  providers: [SiteCommentsService],
})
export class SiteCommentsModule {}
