import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreateCommunityPostDto } from './dto/create-post.dto';
import { CreateCommunityReplyDto } from './dto/create-reply.dto';
import { ListCommunityPostsDto } from './dto/list-posts.dto';
import { ReportContentDto } from './dto/report-content.dto';
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
  listPosts(@Query() query: ListCommunityPostsDto) {
    return this.community.listPosts(query);
  }

  @Get('posts/:id')
  getPost(@Param('id') id: string) {
    return this.community.getPost(id);
  }

  @Post('posts/:id/replies')
  createReply(@Param('id') id: string, @Body() dto: CreateCommunityReplyDto) {
    return this.community.createReply(id, dto);
  }

  @Post('posts/:id/like')
  togglePostLike(@Param('id') id: string) {
    return this.community.togglePostLike(id);
  }

  @Post('replies/:id/like')
  toggleReplyLike(@Param('id') id: string) {
    return this.community.toggleReplyLike(id);
  }

  @Post('posts/:id/report')
  reportPost(@Param('id') id: string, @Body() dto: ReportContentDto) {
    return this.community.reportPost(id, dto.reason);
  }

  @Post('replies/:id/report')
  reportReply(@Param('id') id: string, @Body() dto: ReportContentDto) {
    return this.community.reportReply(id, dto.reason);
  }

  @Get('notifications')
  listNotifications() {
    return this.community.listNotifications();
  }

  @Post('notifications/:id/read')
  markNotificationRead(@Param('id') id: string) {
    return this.community.markNotificationRead(id);
  }

  @Post('notifications/read-all')
  markAllNotificationsRead() {
    return this.community.markAllNotificationsRead();
  }
}
