import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CreateCommunityPostDto } from './dto/create-post.dto';
import { CreateCommunityReplyDto } from './dto/create-reply.dto';
import { ListCommunityPostsDto } from './dto/list-posts.dto';

/**
 * `community_*` não têm RLS de propósito (ver schema.prisma) — por isso usa
 * PrismaService direto, nunca forCurrentTenant(). tenantId/authorId aqui são
 * só atribuição de quem postou, não filtro de leitura.
 *
 * `authorName`/`tenantName`/`authorCrpVerified`/`authorSpecialty` são
 * snapshot de texto capturado na criação, via forCurrentTenant() (contexto
 * do autor É o tenant atual, então esse acesso respeita RLS normalmente) —
 * nunca via include ao vivo, que cruzaria pra `users`/`tenants` (RLS) sem
 * app.tenant_id setado e quebraria.
 */
@Injectable()
export class CommunityService {
  constructor(private readonly prisma: PrismaService) {}

  private async currentAuthorSnapshot() {
    const { userId, tenantId } = getRequestContext();
    const user = await this.prisma.forCurrentTenant().user.findUniqueOrThrow({
      where: { id: userId },
      select: { name: true, crpStatus: true, tenant: { select: { name: true, specialties: true } } },
    });
    return {
      tenantId,
      authorId: userId,
      authorName: user.name,
      tenantName: user.tenant.name,
      authorCrpVerified: user.crpStatus === 'VERIFICADO',
      authorSpecialty: user.tenant.specialties,
    };
  }

  async createPost(dto: CreateCommunityPostDto) {
    const snapshot = await this.currentAuthorSnapshot();
    return this.prisma.communityPost.create({
      data: { ...snapshot, title: dto.title, content: dto.content, category: dto.category },
    });
  }

  async listPosts(query: ListCommunityPostsDto) {
    const { userId } = getRequestContext();
    const page = query.page ?? 1;
    const take = query.take ?? 20;

    const where = {
      removedAt: null,
      category: query.category,
      ...(query.search
        ? {
            OR: [
              { title: { contains: query.search, mode: 'insensitive' as const } },
              { content: { contains: query.search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    const [posts, total] = await Promise.all([
      this.prisma.communityPost.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * take,
        take,
        include: { _count: { select: { replies: { where: { removedAt: null } }, likes: true } } },
      }),
      this.prisma.communityPost.count({ where }),
    ]);

    const likedPostIds = posts.length
      ? new Set(
          (
            await this.prisma.communityLike.findMany({
              where: { userId, postId: { in: posts.map((p) => p.id) } },
              select: { postId: true },
            })
          ).map((l) => l.postId),
        )
      : new Set<string | null>();

    return {
      posts: posts.map((p) => ({ ...p, likedByMe: likedPostIds.has(p.id) })),
      total,
      page,
      take,
    };
  }

  async getPost(id: string) {
    const { userId } = getRequestContext();
    const post = await this.prisma.communityPost.findUnique({
      where: { id },
      include: {
        replies: { where: { removedAt: null }, orderBy: { createdAt: 'asc' }, include: { _count: { select: { likes: true } } } },
        _count: { select: { likes: true } },
      },
    });
    if (!post || post.removedAt) throw new NotFoundException('Post não encontrado.');

    const likedIds = new Set(
      (
        await this.prisma.communityLike.findMany({
          where: {
            userId,
            OR: [{ postId: id }, { replyId: { in: post.replies.map((r) => r.id) } }],
          },
          select: { postId: true, replyId: true },
        })
      ).map((l) => l.postId ?? l.replyId),
    );

    return {
      ...post,
      likedByMe: likedIds.has(post.id),
      replies: post.replies.map((r) => ({ ...r, likedByMe: likedIds.has(r.id) })),
    };
  }

  async createReply(postId: string, dto: CreateCommunityReplyDto) {
    const post = await this.prisma.communityPost.findUnique({ where: { id: postId } });
    if (!post || post.removedAt) throw new NotFoundException('Post não encontrado.');

    const snapshot = await this.currentAuthorSnapshot();
    const reply = await this.prisma.communityReply.create({ data: { ...snapshot, postId, content: dto.content } });

    if (post.authorId !== snapshot.authorId) {
      await this.prisma.communityNotification.create({
        data: {
          userId: post.authorId,
          postId,
          replyId: reply.id,
          message: `${snapshot.authorName} respondeu ao seu post "${post.title}".`,
        },
      });
    }

    return reply;
  }

  async togglePostLike(postId: string) {
    const { userId } = getRequestContext();
    const post = await this.prisma.communityPost.findUnique({ where: { id: postId } });
    if (!post || post.removedAt) throw new NotFoundException('Post não encontrado.');

    const existing = await this.prisma.communityLike.findUnique({ where: { userId_postId: { userId, postId } } });
    if (existing) {
      await this.prisma.communityLike.delete({ where: { id: existing.id } });
    } else {
      await this.prisma.communityLike.create({ data: { userId, postId } });
    }
    const count = await this.prisma.communityLike.count({ where: { postId } });
    return { liked: !existing, count };
  }

  async toggleReplyLike(replyId: string) {
    const { userId } = getRequestContext();
    const reply = await this.prisma.communityReply.findUnique({ where: { id: replyId } });
    if (!reply || reply.removedAt) throw new NotFoundException('Resposta não encontrada.');

    const existing = await this.prisma.communityLike.findUnique({ where: { userId_replyId: { userId, replyId } } });
    if (existing) {
      await this.prisma.communityLike.delete({ where: { id: existing.id } });
    } else {
      await this.prisma.communityLike.create({ data: { userId, replyId } });
    }
    const count = await this.prisma.communityLike.count({ where: { replyId } });
    return { liked: !existing, count };
  }

  async reportPost(postId: string, reason: string) {
    const { userId } = getRequestContext();
    const post = await this.prisma.communityPost.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundException('Post não encontrado.');
    await this.prisma.communityReport.create({ data: { postId, reporterId: userId, reason } });
    return { reported: true };
  }

  async reportReply(replyId: string, reason: string) {
    const { userId } = getRequestContext();
    const reply = await this.prisma.communityReply.findUnique({ where: { id: replyId } });
    if (!reply) throw new NotFoundException('Resposta não encontrada.');
    await this.prisma.communityReport.create({ data: { replyId, reporterId: userId, reason } });
    return { reported: true };
  }

  listNotifications() {
    const { userId } = getRequestContext();
    return this.prisma.communityNotification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async markNotificationRead(id: string) {
    const { userId } = getRequestContext();
    const notification = await this.prisma.communityNotification.findUnique({ where: { id } });
    if (!notification || notification.userId !== userId) throw new NotFoundException('Notificação não encontrada.');
    if (notification.readAt) return notification;
    return this.prisma.communityNotification.update({ where: { id }, data: { readAt: new Date() } });
  }

  async markAllNotificationsRead() {
    const { userId } = getRequestContext();
    await this.prisma.communityNotification.updateMany({
      where: { userId, readAt: null },
      data: { readAt: new Date() },
    });
    return { updated: true };
  }
}
