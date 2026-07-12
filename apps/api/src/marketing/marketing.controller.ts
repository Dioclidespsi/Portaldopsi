import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostStatusDto } from './dto/update-post-status.dto';
import { CheckContentDto } from './dto/check-content.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { STAFF_ROLES } from '../common/roles';

@Controller('marketing')
@UseGuards(RolesGuard)
@Roles(...STAFF_ROLES)
export class MarketingController {
  constructor(private readonly marketing: MarketingService) {}

  @Post('check')
  check(@Body() dto: CheckContentDto) {
    return this.marketing.checkContent(dto.content);
  }

  @Post('posts')
  create(@Body() dto: CreatePostDto) {
    return this.marketing.create(dto);
  }

  @Get('posts')
  list() {
    return this.marketing.list();
  }

  @Patch('posts/:id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdatePostStatusDto) {
    return this.marketing.updateStatus(id, dto.status);
  }
}
