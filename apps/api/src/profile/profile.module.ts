import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ProfileBlocksController } from './profile-blocks.controller';
import { ProfileBlocksService } from './profile-blocks.service';

@Module({
  controllers: [ProfileController, ProfileBlocksController],
  providers: [ProfileService, ProfileBlocksService],
})
export class ProfileModule {}
