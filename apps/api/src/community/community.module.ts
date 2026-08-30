import { Module } from '@nestjs/common';
import { CommunityController } from './community.controller';
import { CommunityPublicController } from './community-public.controller';
import { CommunityService } from './community.service';

@Module({
  controllers: [CommunityController, CommunityPublicController],
  providers: [CommunityService],
  exports: [CommunityService],
})
export class CommunityModule {}
