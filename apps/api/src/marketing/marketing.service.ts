import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CreatePostDto } from './dto/create-post.dto';
import { MARKETING_POST_STATUSES } from './dto/update-post-status.dto';
import { checkCompliance } from './compliance/rules';

type MarketingPostStatus = (typeof MARKETING_POST_STATUSES)[number];

@Injectable()
export class MarketingService {
  constructor(private readonly prisma: PrismaService) {}

  checkContent(content: string) {
    return checkCompliance(content);
  }

  create(dto: CreatePostDto) {
    const { tenantId } = getRequestContext();
    const flags = checkCompliance(dto.content);
    return this.prisma.forCurrentTenant().marketingPost.create({
      data: {
        tenantId,
        content: dto.content,
        platform: dto.platform,
        scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
        complianceFlags: flags.length > 0 ? flags : undefined,
      },
    });
  }

  list() {
    return this.prisma.forCurrentTenant().marketingPost.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async updateStatus(id: string, status: MarketingPostStatus) {
    const tenantPrisma = this.prisma.forCurrentTenant();
    const post = await tenantPrisma.marketingPost.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post não encontrado.');
    return tenantPrisma.marketingPost.update({ where: { id }, data: { status } });
  }
}
