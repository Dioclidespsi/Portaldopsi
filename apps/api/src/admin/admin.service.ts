import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { CRP_UPLOAD_DIR } from '../users/crp-upload.config';
import { DOCUMENT_TEMPLATE_UPLOAD_DIR } from '../document-templates/document-template-upload.config';
import { CrpStatus } from '@prisma/client';
import { UpsertOfferDto } from './dto/upsert-offer.dto';
import { UpsertCourseVideoDto } from './dto/upsert-course-video.dto';
import { UpsertCoursePriceDto } from './dto/upsert-course-price.dto';
import { CoursesService } from '../courses/courses.service';

/**
 * Serviço do console do administrador da plataforma — opera deliberadamente
 * cross-tenant. `users` tem RLS forçado (ver rls.sql), então consultas aqui
 * usam `PrismaService.forSystem()` (seta o sentinela '__system__', permitido
 * pela policy), nunca o client cru — o client cru sempre volta zero linhas
 * em tabela com RLS, sem exceção, mesmo pra quem autentica fora do fluxo de
 * tenant (foi um bug real: a primeira versão usava o client cru e a fila de
 * CRP pendente aparecia sempre vazia). `offers` não tem RLS, então usa o
 * client cru normalmente.
 */
@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly courses: CoursesService,
  ) {}

  listPendingCrp() {
    return this.prisma.forSystem().user.findMany({
      where: { crpStatus: CrpStatus.EM_ANALISE },
      select: {
        id: true,
        name: true,
        email: true,
        crpNumber: true,
        crpStatus: true,
        tenant: { select: { name: true, slug: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getCrpDocumentPath(userId: string) {
    const user = await this.prisma.forSystem().user.findUnique({ where: { id: userId }, select: { crpDocumentPath: true } });
    if (!user?.crpDocumentPath) throw new NotFoundException('Nenhum documento enviado por este usuário.');
    return path.join(CRP_UPLOAD_DIR, user.crpDocumentPath);
  }

  approveCrp(userId: string) {
    return this.prisma.forSystem().user.update({
      where: { id: userId },
      data: { crpStatus: CrpStatus.VERIFICADO, crpRejectionReason: null },
      select: { id: true, name: true, crpStatus: true },
    });
  }

  rejectCrp(userId: string, reason: string) {
    return this.prisma.forSystem().user.update({
      where: { id: userId },
      data: { crpStatus: CrpStatus.REJEITADO, crpRejectionReason: reason },
      select: { id: true, name: true, crpStatus: true, crpRejectionReason: true },
    });
  }

  listOffers() {
    return this.prisma.offer.findMany({ orderBy: { createdAt: 'desc' } });
  }

  createOffer(dto: UpsertOfferDto) {
    return this.prisma.offer.create({ data: dto });
  }

  async updateOffer(id: string, dto: Partial<UpsertOfferDto>) {
    await this.findOffer(id);
    return this.prisma.offer.update({ where: { id }, data: dto });
  }

  async deleteOffer(id: string) {
    await this.findOffer(id);
    await this.prisma.offer.delete({ where: { id } });
    return { deleted: true };
  }

  private async findOffer(id: string) {
    const offer = await this.prisma.offer.findUnique({ where: { id } });
    if (!offer) throw new NotFoundException('Oferta não encontrada.');
    return offer;
  }

  listCourseModules() {
    return this.courses.listModulesFlat();
  }

  listCourseVideos() {
    return this.prisma.courseModuleVideo.findMany({ orderBy: [{ courseSlug: 'asc' }, { moduleSlug: 'asc' }] });
  }

  upsertCourseVideo(dto: UpsertCourseVideoDto) {
    return this.prisma.courseModuleVideo.upsert({
      where: { courseSlug_moduleSlug: { courseSlug: dto.courseSlug, moduleSlug: dto.moduleSlug } },
      create: dto,
      update: { youtubeUrl: dto.youtubeUrl },
    });
  }

  async deleteCourseVideo(id: string) {
    await this.prisma.courseModuleVideo.delete({ where: { id } });
    return { deleted: true };
  }

  listDocumentTemplates() {
    return this.prisma.documentTemplate.findMany({ orderBy: { createdAt: 'desc' } });
  }

  createDocumentTemplate(title: string, description: string, file?: Express.Multer.File) {
    if (!file) throw new BadRequestException('Envie o arquivo do modelo de documento.');
    return this.prisma.documentTemplate.create({ data: { title, description, filePath: file.filename } });
  }

  async deleteDocumentTemplate(id: string) {
    const template = await this.prisma.documentTemplate.findUnique({ where: { id } });
    if (!template) throw new NotFoundException('Modelo de documento não encontrado.');
    fs.unlink(path.join(DOCUMENT_TEMPLATE_UPLOAD_DIR, template.filePath), () => undefined);
    await this.prisma.documentTemplate.delete({ where: { id } });
    return { deleted: true };
  }

  listCoursePrices() {
    return this.prisma.coursePrice.findMany({ orderBy: { courseSlug: 'asc' } });
  }

  upsertCoursePrice(dto: UpsertCoursePriceDto) {
    return this.prisma.coursePrice.upsert({
      where: { courseSlug: dto.courseSlug },
      create: dto,
      update: { priceCents: dto.priceCents },
    });
  }

  async deleteCoursePrice(courseSlug: string) {
    await this.prisma.coursePrice.delete({ where: { courseSlug } });
    return { deleted: true };
  }
}
