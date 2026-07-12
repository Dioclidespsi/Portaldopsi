import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreateCommunityPostDto } from './dto/create-post.dto';
import { CreateCommunityReplyDto } from './dto/create-reply.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { STAFF_ROLES } from '../common/roles';

@Controller('community')
@UseGuards(RolesGuard)
@Roles(...STAFF_ROLES)
export class CommunityController {
  constructor(private readonly community: CommunityService) {}

  @Post('posts')
  createPost(@Body() dto: CreateCommunityPostDto) {
    return this.community.createPost(dto);
  }

  @Get('posts')
  listPosts() {
    return this.community.listPosts();
  }

  @Get('posts/:id')
  getPost(@Param('id') id: string) {
    return this.community.getPost(id);
  }

  @Post('posts/:id/replies')
  createReply(@Param('id') id: string, @Body() dto: CreateCommunityReplyDto) {
    return this.community.createReply(id, dto);
  }
}
