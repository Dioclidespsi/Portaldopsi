import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CreateCommunityPostDto } from './dto/create-post.dto';
import { CreateCommunityReplyDto } from './dto/create-reply.dto';

/**
 * `community_posts`/`community_replies` não têm RLS de propósito (ver
 * schema.prisma) — por isso usa PrismaService direto, nunca
 * forCurrentTenant(). tenantId/authorId aqui são só atribuição de quem
 * postou, não filtro de leitura.
 *
 * `authorName`/`tenantName` são snapshot de texto capturado na criação, via
 * forCurrentTenant() (contexto do autor É o tenant atual, então esse acesso
 * respeita RLS normalmente) — nunca via include ao vivo, que cruzaria pra
 * `users`/`tenants` (RLS) sem app.tenant_id setado e quebraria.
 */
@Injectable()
export class CommunityService {
  constructor(private readonly prisma: PrismaService) {}

  private async currentAuthorSnapshot() {
    const { userId, tenantId } = getRequestContext();
    const user = await this.prisma.forCurrentTenant().user.findUniqueOrThrow({
      where: { id: userId },
      select: { name: true, tenant: { select: { name: true } } },
    });
    return { tenantId, authorId: userId, authorName: user.name, tenantName: user.tenant.name };
  }

  async createPost(dto: CreateCommunityPostDto) {
    const snapshot = await this.currentAuthorSnapshot();
    return this.prisma.communityPost.create({ data: { ...snapshot, title: dto.title, content: dto.content } });
  }

  listPosts() {
    return this.prisma.communityPost.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { replies: true } } },
    });
  }

  async getPost(id: string) {
    const post = await this.prisma.communityPost.findUnique({
      where: { id },
      include: { replies: { orderBy: { createdAt: 'asc' } } },
    });
    if (!post) throw new NotFoundException('Post não encontrado.');
    return post;
  }

  async createReply(postId: string, dto: CreateCommunityReplyDto) {
    const post = await this.prisma.communityPost.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundException('Post não encontrado.');

    const snapshot = await this.currentAuthorSnapshot();
    return this.prisma.communityReply.create({ data: { ...snapshot, postId, content: dto.content } });
  }
}
