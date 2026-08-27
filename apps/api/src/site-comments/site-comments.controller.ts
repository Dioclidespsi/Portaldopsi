import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SiteCommentsService } from './site-comments.service';
import { CreateSiteCommentDto } from './dto/create-site-comment.dto';
import { PublishSiteCommentDto } from './dto/publish-site-comment.dto';
import { SiteLikeDto } from './dto/site-like.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller()
export class SiteCommentsController {
  constructor(private readonly siteComments: SiteCommentsService) {}

  /** Pública — excluída do AuthMiddleware em auth.module.ts. */
  @Get('public/tenants/:slug/comments')
  listPublic(@Param('slug') slug: string) {
    return this.siteComments.listPublic(slug);
  }

  /** Pública — excluída do AuthMiddleware em auth.module.ts. */
  @Post('public/tenants/:slug/comments')
  createComment(@Param('slug') slug: string, @Body() dto: CreateSiteCommentDto) {
    return this.siteComments.createComment(slug, dto);
  }

  /** Pública — excluída do AuthMiddleware em auth.module.ts. */
  @Get('public/tenants/:slug/likes')
  getLikes(@Param('slug') slug: string, @Query('visitorToken') visitorToken?: string) {
    return this.siteComments.getLikes(slug, visitorToken);
  }

  /** Pública — excluída do AuthMiddleware em auth.module.ts. */
  @Post('public/tenants/:slug/likes')
  like(@Param('slug') slug: string, @Body() dto: SiteLikeDto) {
    return this.siteComments.like(slug, dto);
  }

  /** Pública — excluída do AuthMiddleware em auth.module.ts. */
  @Delete('public/tenants/:slug/likes')
  unlike(@Param('slug') slug: string, @Body() dto: SiteLikeDto) {
    return this.siteComments.unlike(slug, dto.visitorToken);
  }

  @Get('site-comments')
  @UseGuards(RolesGuard)
  @Roles(Role.PSICOLOGO_TITULAR)
  listOwn() {
    return this.siteComments.listOwn();
  }

  @Patch('site-comments/:id/publish')
  @UseGuards(RolesGuard)
  @Roles(Role.PSICOLOGO_TITULAR)
  setPublished(@Param('id') id: string, @Body() dto: PublishSiteCommentDto) {
    return this.siteComments.setPublished(id, dto);
  }
}
