import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { CRP_UPLOAD_DIR } from '../users/crp-upload.config';
import { DOCUMENT_TEMPLATE_UPLOAD_DIR } from '../document-templates/document-template-upload.config';
import { LIBRARY_MATERIAL_UPLOAD_DIR } from '../library/library-material-upload.config';
import { CERTIFICATE_TEMPLATE_UPLOAD_DIR } from '../certificates/certificate-template-upload.config';
import { BANNER_UPLOAD_DIR } from '../banners/banner-upload.config';
import { renderCertificateBuffer } from '../certificates/certificate-renderer';
import { CrpStatus, Prisma } from '@prisma/client';
import { UpsertCertificateTemplateDto } from './dto/upsert-certificate-template.dto';
import { UpsertTestTemplateDto } from './dto/upsert-test-template.dto';
import { UpsertBannerDto } from './dto/upsert-banner.dto';

/**
 * Serviço do console do administrador da plataforma — opera deliberadamente
 * cross-tenant. `users` tem RLS forçado (ver rls.sql), então consultas aqui
 * usam `PrismaService.forSystem()` (seta o sentinela '__system__', permitido
 * pela policy), nunca o client cru — o client cru sempre volta zero linhas
 * em tabela com RLS, sem exceção, mesmo pra quem autentica fora do fluxo de
 * tenant (foi um bug real: a primeira versão usava o client cru e a fila de
 * CRP pendente aparecia sempre vazia).
 */
@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
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

  /**
   * Gate independente do CRP (ver schema.prisma) — aprova especificamente a
   * atuação como SUPERVISOR na plataforma, decisão do admin, não do titular
   * que cria a conta (ver UsersService.createTeamMember).
   */
  listPendingSupervisors() {
    return this.prisma.forSystem().user.findMany({
      where: { supervisorApprovalStatus: 'PENDENTE' },
      select: {
        id: true,
        name: true,
        email: true,
        tenant: { select: { name: true, slug: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  approveSupervisor(userId: string) {
    return this.prisma.forSystem().user.update({
      where: { id: userId },
      data: { supervisorApprovalStatus: 'APROVADO', supervisorRejectionReason: null },
      select: { id: true, name: true, supervisorApprovalStatus: true },
    });
  }

  rejectSupervisor(userId: string, reason: string) {
    return this.prisma.forSystem().user.update({
      where: { id: userId },
      data: { supervisorApprovalStatus: 'REJEITADO', supervisorRejectionReason: reason },
      select: { id: true, name: true, supervisorApprovalStatus: true, supervisorRejectionReason: true },
    });
  }

  /**
   * `forSystem()` bypassa RLS de propósito — denúncia pode envolver post/
   * resposta/denunciante de qualquer tenant (Comunidade é cross-tenant, ver
   * schema.prisma). Só o admin da plataforma modera esse espaço.
   */
  listCommunityReports() {
    return this.prisma.forSystem().communityReport.findMany({
      where: { resolvedAt: null },
      orderBy: { createdAt: 'asc' },
      include: {
        post: { select: { id: true, title: true, content: true, authorName: true, removedAt: true } },
        reply: { select: { id: true, content: true, authorName: true, postId: true, removedAt: true } },
        reporter: { select: { name: true } },
      },
    });
  }

  async resolveCommunityReport(id: string) {
    const report = await this.prisma.forSystem().communityReport.findUnique({ where: { id } });
    if (!report) throw new NotFoundException('Denúncia não encontrada.');
    return this.prisma.forSystem().communityReport.update({ where: { id }, data: { resolvedAt: new Date() } });
  }

  async removeCommunityPost(id: string, reason: string) {
    const post = await this.prisma.forSystem().communityPost.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post não encontrado.');
    return this.prisma.forSystem().communityPost.update({ where: { id }, data: { removedAt: new Date(), removedReason: reason } });
  }

  async removeCommunityReply(id: string, reason: string) {
    const reply = await this.prisma.forSystem().communityReply.findUnique({ where: { id } });
    if (!reply) throw new NotFoundException('Resposta não encontrada.');
    return this.prisma.forSystem().communityReply.update({ where: { id }, data: { removedAt: new Date(), removedReason: reason } });
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

  listLibraryMaterials() {
    return this.prisma.libraryMaterial.findMany({ orderBy: [{ category: 'asc' }, { title: 'asc' }] });
  }

  createLibraryMaterial(category: string, title: string, description: string | undefined, file?: Express.Multer.File) {
    if (!file) throw new BadRequestException('Envie o arquivo do material.');
    return this.prisma.libraryMaterial.create({ data: { category, title, description, filePath: file.filename } });
  }

  async setLibraryMaterialActive(id: string, active: boolean) {
    const material = await this.prisma.libraryMaterial.findUnique({ where: { id } });
    if (!material) throw new NotFoundException('Material não encontrado.');
    return this.prisma.libraryMaterial.update({ where: { id }, data: { active } });
  }

  async deleteLibraryMaterial(id: string) {
    const material = await this.prisma.libraryMaterial.findUnique({ where: { id } });
    if (!material) throw new NotFoundException('Material não encontrado.');
    fs.unlink(path.join(LIBRARY_MATERIAL_UPLOAD_DIR, material.filePath), () => undefined);
    await this.prisma.libraryMaterial.delete({ where: { id } });
    return { deleted: true };
  }

  listBanners() {
    return this.prisma.banner.findMany({ orderBy: { position: 'asc' } });
  }

  /**
   * Upsert por posição (1 ou 2, únicas — ver schema.prisma) — mesmo padrão de
   * upsertCertificateTemplate (singleton por chave), com limpeza do arquivo
   * antigo do disco quando uma imagem nova substitui a anterior. `imageUrl`
   * guarda a URL pública já pronta (igual ProfileService.uploadPhoto), não só
   * o nome do arquivo, porque o frontend usa direto num <img src>.
   */
  async upsertBanner(position: number, dto: UpsertBannerDto, file?: Express.Multer.File) {
    if (position !== 1 && position !== 2) throw new BadRequestException('Posição do banner precisa ser 1 ou 2.');
    const existing = await this.prisma.banner.findUnique({ where: { position } });
    if (!existing && !file) throw new BadRequestException('Envie a imagem do banner.');

    const publicApiUrl = this.config.get<string>('PUBLIC_API_URL', 'http://localhost:3333');
    const ownUploadPrefix = `${publicApiUrl}/public/banner-images/`;

    let imageUrl = existing?.imageUrl;
    if (file) {
      if (existing?.imageUrl.startsWith(ownUploadPrefix)) {
        const oldFilename = existing.imageUrl.slice(ownUploadPrefix.length);
        fs.unlink(path.join(BANNER_UPLOAD_DIR, oldFilename), () => undefined);
      }
      imageUrl = `${ownUploadPrefix}${file.filename}`;
    }

    return this.prisma.banner.upsert({
      where: { position },
      create: { position, imageUrl: imageUrl!, linkUrl: dto.linkUrl, active: dto.active ?? true },
      update: { imageUrl, linkUrl: dto.linkUrl, active: dto.active },
    });
  }

  async deleteBanner(position: number) {
    const banner = await this.prisma.banner.findUnique({ where: { position } });
    if (!banner) throw new NotFoundException('Banner não encontrado.');
    const publicApiUrl = this.config.get<string>('PUBLIC_API_URL', 'http://localhost:3333');
    const ownUploadPrefix = `${publicApiUrl}/public/banner-images/`;
    if (banner.imageUrl.startsWith(ownUploadPrefix)) {
      fs.unlink(path.join(BANNER_UPLOAD_DIR, banner.imageUrl.slice(ownUploadPrefix.length)), () => undefined);
    }
    await this.prisma.banner.delete({ where: { position } });
    return { deleted: true };
  }

  getCertificateTemplate() {
    return this.prisma.certificateTemplate.findFirst();
  }

  /**
   * Singleton (sempre uma linha só): se já existe, atualiza posições (e a
   * imagem, se uma nova foi enviada, apagando a antiga do disco); se não
   * existe, exige a imagem na primeira vez. Certificados já emitidos NÃO são
   * re-renderizados retroativamente — só passam a usar o modelo novo os
   * emitidos depois desta chamada.
   */
  async upsertCertificateTemplate(dto: UpsertCertificateTemplateDto, file?: Express.Multer.File) {
    const existing = await this.prisma.certificateTemplate.findFirst();
    if (!existing && !file) throw new BadRequestException('Envie a imagem do modelo de certificado.');

    if (existing) {
      if (file) fs.unlink(path.join(CERTIFICATE_TEMPLATE_UPLOAD_DIR, existing.imagePath), () => undefined);
      return this.prisma.certificateTemplate.update({
        where: { id: existing.id },
        data: { ...dto, imagePath: file ? file.filename : existing.imagePath },
      });
    }
    return this.prisma.certificateTemplate.create({ data: { ...dto, imagePath: file!.filename } });
  }

  async previewCertificateTemplate(dto: UpsertCertificateTemplateDto) {
    const existing = await this.prisma.certificateTemplate.findFirst();
    if (!existing) throw new BadRequestException('Envie a imagem do modelo antes de pré-visualizar.');
    return renderCertificateBuffer(path.join(CERTIFICATE_TEMPLATE_UPLOAD_DIR, existing.imagePath), dto, {
      name: 'Maria da Silva Exemplo',
      courseTitle: 'Curso de Exemplo',
      dateStr: new Date().toLocaleDateString('pt-BR'),
      code: 'PREVIA-0000-0000',
    });
  }

  listTestTemplates() {
    return this.prisma.testTemplate.findMany({
      orderBy: [{ category: 'asc' }, { title: 'asc' }],
      include: { questions: { orderBy: { order: 'asc' } } },
    });
  }

  async createTestTemplate(dto: UpsertTestTemplateDto) {
    const existing = await this.prisma.testTemplate.findUnique({ where: { slug: dto.slug } });
    if (existing) throw new BadRequestException('Já existe um teste com esse slug.');
    return this.prisma.testTemplate.create({
      data: {
        slug: dto.slug,
        title: dto.title,
        category: dto.category,
        source: dto.source,
        disclaimer: dto.disclaimer,
        instructions: dto.instructions,
        responseScale: (dto.responseScale as unknown as Prisma.InputJsonValue) ?? undefined,
        scoreBands: (dto.scoreBands as unknown as Prisma.InputJsonValue) ?? undefined,
        subscales: (dto.subscales as unknown as Prisma.InputJsonValue) ?? undefined,
        derivedScores: (dto.derivedScores as unknown as Prisma.InputJsonValue) ?? undefined,
        questions: {
          create: dto.questions.map((q, i) => ({ order: i + 1, type: q.type, prompt: q.prompt, reverseScored: q.reverseScored ?? false, options: (q.options as unknown as Prisma.InputJsonValue) ?? undefined, subscale: q.subscale })),
        },
      },
      include: { questions: true },
    });
  }

  async updateTestTemplate(id: string, dto: UpsertTestTemplateDto) {
    await this.findTestTemplate(id);
    await this.prisma.testQuestion.deleteMany({ where: { testTemplateId: id } });
    return this.prisma.testTemplate.update({
      where: { id },
      data: {
        slug: dto.slug,
        title: dto.title,
        category: dto.category,
        source: dto.source,
        disclaimer: dto.disclaimer,
        instructions: dto.instructions,
        responseScale: (dto.responseScale as unknown as Prisma.InputJsonValue) ?? undefined,
        scoreBands: (dto.scoreBands as unknown as Prisma.InputJsonValue) ?? undefined,
        subscales: (dto.subscales as unknown as Prisma.InputJsonValue) ?? undefined,
        derivedScores: (dto.derivedScores as unknown as Prisma.InputJsonValue) ?? undefined,
        questions: {
          create: dto.questions.map((q, i) => ({ order: i + 1, type: q.type, prompt: q.prompt, reverseScored: q.reverseScored ?? false, options: (q.options as unknown as Prisma.InputJsonValue) ?? undefined, subscale: q.subscale })),
        },
      },
      include: { questions: true },
    });
  }

  async setTestTemplateActive(id: string, active: boolean) {
    await this.findTestTemplate(id);
    return this.prisma.testTemplate.update({ where: { id }, data: { active } });
  }

  async deleteTestTemplate(id: string) {
    await this.findTestTemplate(id);
    const inUse = await this.prisma.testAssignment.count({ where: { testTemplateId: id } });
    if (inUse > 0) {
      throw new BadRequestException('Este teste já foi aplicado a pacientes — desative em vez de excluir.');
    }
    await this.prisma.testTemplate.delete({ where: { id } });
    return { deleted: true };
  }

  private async findTestTemplate(id: string) {
    const template = await this.prisma.testTemplate.findUnique({ where: { id } });
    if (!template) throw new NotFoundException('Teste não encontrado.');
    return template;
  }
}
