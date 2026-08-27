import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CreateSiteCommentDto } from './dto/create-site-comment.dto';
import { PublishSiteCommentDto } from './dto/publish-site-comment.dto';
import { SiteLikeDto } from './dto/site-like.dto';

@Injectable()
export class SiteCommentsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Espelha ProfileService.getPublic — rota pública, sem tenant no contexto ainda. */
  private async requirePublishedTenant(slug: string) {
    const tenant = await this.prisma.tenant.findUnique({ where: { slug }, select: { id: true, published: true } });
    if (!tenant || !tenant.published) {
      throw new NotFoundException('Página não encontrada ou ainda não publicada.');
    }
    return tenant;
  }

  /** Só o que está realmente visível na página pública: consentido, publicado pelo profissional, e não vetado pelo admin. */
  async listPublic(slug: string) {
    const tenant = await this.requirePublishedTenant(slug);
    return this.prisma.forTenant(tenant.id).siteComment.findMany({
      where: { consentToPublish: true, publishedByProfessional: true, blockedByAdmin: false },
      orderBy: { createdAt: 'desc' },
      select: { id: true, authorName: true, content: true, createdAt: true, rating: true, importedFrom: true },
    });
  }

  async createComment(slug: string, dto: CreateSiteCommentDto) {
    const tenant = await this.requirePublishedTenant(slug);
    await this.prisma.forTenant(tenant.id).siteComment.create({
      data: {
        tenantId: tenant.id,
        authorName: dto.authorName,
        content: dto.content,
        consentToPublish: dto.consentToPublish,
      },
    });
    return { received: true };
  }

  async getLikes(slug: string, visitorToken?: string) {
    const tenant = await this.requirePublishedTenant(slug);
    const tenantPrisma = this.prisma.forTenant(tenant.id);
    const [count, likedByVisitor] = await Promise.all([
      tenantPrisma.siteLike.count({ where: { tenantId: tenant.id } }),
      visitorToken
        ? tenantPrisma.siteLike.findUnique({ where: { tenantId_visitorToken: { tenantId: tenant.id, visitorToken } } })
        : Promise.resolve(null),
    ]);
    return { count, likedByVisitor: Boolean(likedByVisitor) };
  }

  /** Idempotente: curtir de novo com o mesmo visitorToken não duplica nem dá erro. */
  async like(slug: string, dto: SiteLikeDto) {
    const tenant = await this.requirePublishedTenant(slug);
    const tenantPrisma = this.prisma.forTenant(tenant.id);
    const existing = await tenantPrisma.siteLike.findUnique({
      where: { tenantId_visitorToken: { tenantId: tenant.id, visitorToken: dto.visitorToken } },
    });
    if (!existing) {
      await tenantPrisma.siteLike.create({ data: { tenantId: tenant.id, visitorToken: dto.visitorToken } });
    }
    const count = await tenantPrisma.siteLike.count({ where: { tenantId: tenant.id } });
    return { count, likedByVisitor: true };
  }

  async unlike(slug: string, visitorToken: string) {
    const tenant = await this.requirePublishedTenant(slug);
    const tenantPrisma = this.prisma.forTenant(tenant.id);
    await tenantPrisma.siteLike.deleteMany({ where: { tenantId: tenant.id, visitorToken } });
    const count = await tenantPrisma.siteLike.count({ where: { tenantId: tenant.id } });
    return { count, likedByVisitor: false };
  }

  /** Lado do profissional — vê TODOS os comentários do próprio site, publicados ou não. */
  listOwn() {
    return this.prisma.forCurrentTenant().siteComment.findMany({ orderBy: { createdAt: 'desc' } });
  }

  /**
   * Nunca edita o texto — só alterna se aparece na página pública ou não.
   * Recusa publicar sem consentimento do visitante, e recusa reverter um
   * bloqueio do admin (o profissional pode desmarcar `publish`, mas só o
   * admin remove o próprio `blockedByAdmin`).
   */
  async setPublished(id: string, dto: PublishSiteCommentDto) {
    const tenantPrisma = this.prisma.forCurrentTenant();
    const comment = await tenantPrisma.siteComment.findUnique({ where: { id } });
    if (!comment || comment.tenantId !== getRequestContext().tenantId) {
      throw new NotFoundException('Comentário não encontrado.');
    }
    if (dto.publish && !comment.consentToPublish) {
      throw new BadRequestException('Este visitante não autorizou a publicação deste comentário.');
    }
    if (dto.publish && comment.blockedByAdmin) {
      throw new ForbiddenException('Este comentário foi restringido pela administração e não pode ser publicado.');
    }
    return tenantPrisma.siteComment.update({ where: { id }, data: { publishedByProfessional: dto.publish } });
  }
}
