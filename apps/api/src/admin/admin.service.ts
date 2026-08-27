import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { CRP_UPLOAD_DIR } from '../users/crp-upload.config';
import { STUDENT_DOCUMENT_UPLOAD_DIR } from '../users/student-document-upload.config';
import { DOCUMENT_TEMPLATE_UPLOAD_DIR } from '../document-templates/document-template-upload.config';
import { LIBRARY_MATERIAL_UPLOAD_DIR } from '../library/library-material-upload.config';
import { MEDITATION_UPLOAD_DIR } from '../meditation/meditation-upload.config';
import { CERTIFICATE_OUTPUT_DIR, CERTIFICATE_TEMPLATE_UPLOAD_DIR } from '../certificates/certificate-template-upload.config';
import { BANNER_UPLOAD_DIR } from '../banners/banner-upload.config';
import { renderCertificateBuffer } from '../certificates/certificate-renderer';
import { CampaignLeadStatus, CrpStatus, DocumentTemplateAudience, Prisma, Role, SubscriptionStatus, VideoApprovalStatus } from '@prisma/client';
import { UpsertCertificateTemplateDto } from './dto/upsert-certificate-template.dto';
import { UpsertTestTemplateDto } from './dto/upsert-test-template.dto';
import { UpsertBannerDto } from './dto/upsert-banner.dto';
import { CreateMeditationTrackDto } from './dto/create-meditation-track.dto';
import { UpdateCampaignLeadDto } from './dto/update-campaign-lead.dto';
import { GrantComplimentaryTrialDto } from './dto/grant-complimentary-trial.dto';
import { AsaasService } from '../asaas/asaas.service';

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
    private readonly asaas: AsaasService,
  ) {}

  /**
   * Resumo de receita da plataforma — três fontes distintas:
   * (1) assinaturas de tenants (MRR aproximado — não persistimos plano/valor
   * escolhido na criação, só o asaasSubscriptionId, então busca ao vivo no
   * Asaas pra cada assinatura ACTIVE; lista é pequena, não é rota quente);
   * (2) taxa de plataforma retida nas cobranças de paciente com split
   * (ASAAS_PLATFORM_FEE_PERCENT do valor pago, via Financeiro de cada tenant);
   * (3) compras avulsas de curso na Loja (Marketplace), que vão inteiras pra
   * plataforma, sem split — soma `CourseEnrollment.priceCents` gravado no
   * momento da compra (pode ser null em matrícula sem cobrança, ex: cortesia
   * do admin — por isso o filtro `not: null`).
   */
  async getRevenueSummary() {
    const system = this.prisma.forSystem();

    const subscriptionsByStatusRaw = await system.subscription.groupBy({
      by: ['status'],
      _count: { _all: true },
    });
    const subscriptionsByStatus = subscriptionsByStatusRaw.map((s) => ({ status: s.status, count: s._count._all }));

    const activeSubscriptions = await system.subscription.findMany({
      where: { status: 'ACTIVE', asaasSubscriptionId: { not: null } },
      select: { tenantId: true, asaasSubscriptionId: true, tenant: { select: { name: true, slug: true } } },
    });
    const details = await Promise.all(
      activeSubscriptions.map((s) => this.asaas.getSubscriptionValueAndCycle(s.asaasSubscriptionId as string)),
    );
    const mrrCents = details.reduce((sum, d) => {
      if (!d) return sum;
      return sum + (d.cycle === 'YEARLY' ? Math.round(d.valueCents / 12) : d.valueCents);
    }, 0);
    const subscriptionsMissingAsaasData = details.filter((d) => !d).length;

    // Cortesias (Programa Piloto) são status ACTIVE mas nunca têm
    // asaasSubscriptionId — já ficam fora do MRR acima por causa do filtro,
    // mas ainda entram no `subscriptionsByStatus` (groupBy) junto com as
    // pagas; contadas à parte aqui pra não distorcer a leitura de receita.
    const complimentaryActiveCount = await system.subscription.count({
      where: { status: 'ACTIVE', isComplimentary: true },
    });

    const paidInvoicesAgg = await system.invoice.aggregate({
      where: { status: 'pago' },
      _sum: { amountCents: true },
      _count: { _all: true },
    });
    const platformFeePercent = Number(this.config.get<string>('ASAAS_PLATFORM_FEE_PERCENT') ?? '0');
    const patientRevenueTotalCents = paidInvoicesAgg._sum.amountCents ?? 0;
    const platformFeeCents = Math.round(patientRevenueTotalCents * (platformFeePercent / 100));

    const marketplaceAgg = await system.courseEnrollment.aggregate({
      where: { source: 'MARKETPLACE', priceCents: { not: null } },
      _sum: { priceCents: true },
      _count: { _all: true },
    });

    return {
      subscriptionsByStatus,
      activeSubscriptionsCount: activeSubscriptions.length,
      complimentaryActiveCount,
      mrrCents,
      subscriptionsMissingAsaasData,
      patientInvoices: {
        totalPaidCents: patientRevenueTotalCents,
        paidCount: paidInvoicesAgg._count._all,
        platformFeePercent,
        platformFeeCents,
      },
      marketplace: {
        totalCents: marketplaceAgg._sum.priceCents ?? 0,
        count: marketplaceAgg._count._all,
      },
    };
  }

  /**
   * Visão geral de quem está cadastrado na plataforma: quantos tenants
   * (psicólogos/clínicas), em que condição (CRP, plano) e o que já usaram
   * de fato — mesmos marcos do Índice de Ativação do Programa Piloto (ver
   * getCampaignLeadActivation), só que calculados pra TODOS os tenants
   * CLINICA de uma vez (não só quem veio da campanha). Uma query de
   * distinct tenantId por marco em vez de N+1 por tenant — mesma lógica,
   * escala melhor. `tenants` não tem RLS, mas `users`/`subscription`/
   * `patients`/`appointments`/`invoices` têm (ver rls.sql), por isso
   * forSystem() em tudo aqui (mesmo padrão do resto deste arquivo).
   */
  async getUsersOverview() {
    const system = this.prisma.forSystem();

    const [tenants, patientRows, appointmentRows, invoiceRows, teleconsultaRows, convertedLeads] = await Promise.all([
      system.tenant.findMany({
        where: { kind: 'CLINICA' },
        select: {
          id: true,
          name: true,
          slug: true,
          published: true,
          createdAt: true,
          publicPhone: true,
          users: { where: { role: 'PSICOLOGO_TITULAR' }, select: { email: true, crpStatus: true }, take: 1 },
          subscription: { select: { status: true, isComplimentary: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      system.patient.findMany({ distinct: ['tenantId'], select: { tenantId: true } }),
      system.appointment.findMany({ distinct: ['tenantId'], select: { tenantId: true } }),
      system.invoice.findMany({ distinct: ['tenantId'], select: { tenantId: true } }),
      system.appointment.findMany({
        where: { videoRoomUrl: { not: null } },
        distinct: ['tenantId'],
        select: { tenantId: true },
      }),
      // Telefone capturado no opt-in do Programa Piloto — costuma estar
      // preenchido bem mais vezes do que o publicPhone (que depende do
      // psicólogo configurar o Site Profissional), então serve de fallback.
      system.campaignLead.findMany({
        where: { convertedTenantId: { not: null } },
        select: { convertedTenantId: true, phone: true },
      }),
    ]);

    const toSet = (rows: { tenantId: string }[]) => new Set(rows.map((r) => r.tenantId));
    const hasPatient = toSet(patientRows);
    const hasAgenda = toSet(appointmentRows);
    const hasFinanceiro = toSet(invoiceRows);
    const hasTeleconsulta = toSet(teleconsultaRows);
    const leadPhoneByTenantId = new Map(convertedLeads.map((l) => [l.convertedTenantId as string, l.phone]));

    const rows = tenants.map((t) => {
      const crpStatus = t.users[0]?.crpStatus ?? null;
      const planCondition: 'sem_assinatura' | 'inativa' | 'cortesia_piloto' | 'premium_pago' = !t.subscription
        ? 'sem_assinatura'
        : t.subscription.status !== 'ACTIVE'
          ? 'inativa'
          : t.subscription.isComplimentary
            ? 'cortesia_piloto'
            : 'premium_pago';

      return {
        id: t.id,
        name: t.name,
        slug: t.slug,
        createdAt: t.createdAt,
        published: t.published,
        email: t.users[0]?.email ?? null,
        phone: t.publicPhone ?? leadPhoneByTenantId.get(t.id) ?? null,
        crpStatus,
        planCondition,
        usage: {
          perfil: t.published,
          paciente: hasPatient.has(t.id),
          agenda: hasAgenda.has(t.id),
          financeiro: hasFinanceiro.has(t.id),
          teleconsulta: hasTeleconsulta.has(t.id),
        },
      };
    });

    const countBy = <T extends string>(values: T[]): Record<string, number> =>
      values.reduce((acc, v) => ({ ...acc, [v]: (acc[v] ?? 0) + 1 }), {} as Record<string, number>);

    return {
      summary: {
        total: rows.length,
        byCrpStatus: countBy(rows.map((r) => r.crpStatus ?? 'sem_titular')),
        byPlanCondition: countBy(rows.map((r) => r.planCondition)),
        published: rows.filter((r) => r.published).length,
        usageMilestones: {
          perfil: rows.filter((r) => r.usage.perfil).length,
          paciente: rows.filter((r) => r.usage.paciente).length,
          agenda: rows.filter((r) => r.usage.agenda).length,
          financeiro: rows.filter((r) => r.usage.financeiro).length,
          teleconsulta: rows.filter((r) => r.usage.teleconsulta).length,
        },
      },
      tenants: rows,
    };
  }

  listPendingCrp() {
    return this.prisma.forSystem().user.findMany({
      where: { crpStatus: CrpStatus.EM_ANALISE },
      select: {
        id: true,
        name: true,
        email: true,
        crpNumber: true,
        crpStatus: true,
        tenant: { select: { name: true, slug: true, publicPhone: true } },
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
   * Fila de matrícula de estudante de psicologia (item 4) — mesmo padrão da
   * fila de CRP: só chega aqui quem a IA não conseguiu aprovar sozinha
   * (EM_ANALISE), nunca quem já foi VERIFICADO automaticamente.
   */
  listPendingStudentVerifications() {
    return this.prisma.forSystem().user.findMany({
      where: { studentVerificationStatus: 'EM_ANALISE' },
      select: {
        id: true,
        name: true,
        email: true,
        studentInstitution: true,
        studentEnrollmentNumber: true,
        studentVerificationNote: true,
        tenant: { select: { name: true, slug: true, publicPhone: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getStudentDocumentPath(userId: string) {
    const user = await this.prisma.forSystem().user.findUnique({ where: { id: userId }, select: { studentDocumentPath: true } });
    if (!user?.studentDocumentPath) throw new NotFoundException('Nenhum documento enviado por este usuário.');
    return path.join(STUDENT_DOCUMENT_UPLOAD_DIR, user.studentDocumentPath);
  }

  approveStudentVerification(userId: string) {
    return this.prisma.forSystem().user.update({
      where: { id: userId },
      data: { studentVerificationStatus: 'VERIFICADO', studentVerificationNote: null },
      select: { id: true, name: true, studentVerificationStatus: true },
    });
  }

  rejectStudentVerification(userId: string, reason: string) {
    return this.prisma.forSystem().user.update({
      where: { id: userId },
      data: { studentVerificationStatus: 'REJEITADO', studentVerificationNote: reason },
      select: { id: true, name: true, studentVerificationStatus: true, studentVerificationNote: true },
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
        tenant: { select: { name: true, slug: true, publicPhone: true } },
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

  /**
   * Fila de revisão: só o que o profissional já publicou de fato (o que está
   * ou esteve visível na página pública) — comentário que o visitante não
   * autorizou, ou que o profissional nunca publicou, é feedback privado entre
   * eles e não é assunto do admin da plataforma. `forSystem()` bypassa RLS de
   * propósito (site_comments tem a exceção '__system__', ver rls.sql).
   */
  listSiteComments() {
    return this.prisma.forSystem().siteComment.findMany({
      where: { publishedByProfessional: true },
      orderBy: { createdAt: 'desc' },
      include: { tenant: { select: { name: true, slug: true } } },
    });
  }

  /** Veto por violação do código de ética do CRP (ou outra política da plataforma) — some da página pública, o profissional não consegue reverter. */
  async blockSiteComment(id: string, reason: string) {
    const comment = await this.prisma.forSystem().siteComment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Comentário não encontrado.');
    return this.prisma.forSystem().siteComment.update({ where: { id }, data: { blockedByAdmin: true, blockedReason: reason } });
  }

  /** Reverte um bloqueio (ex: revisão concluiu que não havia violação) — o comentário volta a depender só da escolha do profissional. */
  async unblockSiteComment(id: string) {
    const comment = await this.prisma.forSystem().siteComment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Comentário não encontrado.');
    return this.prisma.forSystem().siteComment.update({ where: { id }, data: { blockedByAdmin: false, blockedReason: null } });
  }

  /**
   * Fila de vídeos de apresentação aguardando revisão — `tenants` não tem RLS
   * (raiz do isolamento, ver rls.sql), então não precisa de forSystem() aqui.
   */
  listPendingPresentationVideos() {
    return this.prisma.tenant.findMany({
      where: { presentationVideoStatus: VideoApprovalStatus.EM_ANALISE },
      select: { id: true, name: true, slug: true, presentationVideoUrl: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  /** Único jeito do vídeo virar visível na página pública — nunca o próprio profissional. */
  approvePresentationVideo(tenantId: string) {
    return this.prisma.tenant.update({
      where: { id: tenantId },
      data: { presentationVideoStatus: VideoApprovalStatus.PUBLICADO, presentationVideoRejectionReason: null },
      select: { id: true, name: true, presentationVideoStatus: true },
    });
  }

  rejectPresentationVideo(tenantId: string, reason: string) {
    return this.prisma.tenant.update({
      where: { id: tenantId },
      data: { presentationVideoStatus: VideoApprovalStatus.REJEITADO, presentationVideoRejectionReason: reason },
      select: { id: true, name: true, presentationVideoStatus: true, presentationVideoRejectionReason: true },
    });
  }

  listDocumentTemplates() {
    return this.prisma.documentTemplate.findMany({ orderBy: { createdAt: 'desc' } });
  }

  createDocumentTemplate(
    title: string,
    description: string,
    requiresAcceptance: boolean | undefined,
    audience: DocumentTemplateAudience | undefined,
    file?: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Envie o arquivo do modelo de documento.');
    return this.prisma.documentTemplate.create({
      data: { title, description, filePath: file.filename, requiresAcceptance: requiresAcceptance ?? false, audience: audience ?? 'STAFF' },
    });
  }

  /** Quem já aceitou (e quem falta) um contrato específico — visão do admin. */
  async listDocumentAcceptances(documentTemplateId: string) {
    const template = await this.prisma.documentTemplate.findUnique({ where: { id: documentTemplateId } });
    if (!template) throw new NotFoundException('Contrato não encontrado.');
    // Denominador depende do público do termo (ver DocumentTemplateAudience) — STAFF conta
    // titulares de tenant CLINICA, ESTUDANTE conta usuários de tenant ESTUDANTE (mesmo role
    // PSICOLOGO_TITULAR nos dois casos, ver AuthService.createTenantWithUser).
    const tenantKind = template.audience === 'ESTUDANTE' ? 'ESTUDANTE' : 'CLINICA';
    const [accepted, allTitulares] = await Promise.all([
      // forSystem(): o join com `users` (que tem RLS forçado) precisa do
      // sentinela '__system__', senão a relação obrigatória `user` volta
      // null e o Prisma lança "Inconsistent query result" (mesma classe de
      // bug já documentada neste projeto pro console do admin).
      this.prisma.forSystem().documentAcceptance.findMany({
        where: { documentTemplateId },
        select: { acceptedAt: true, user: { select: { name: true, email: true, tenant: { select: { name: true, slug: true } } } } },
        orderBy: { acceptedAt: 'desc' },
      }),
      this.prisma.forSystem().user.count({ where: { role: Role.PSICOLOGO_TITULAR, tenant: { kind: tenantKind } } }),
    ]);
    return { template, accepted, totalTitulares: allTitulares };
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

  listMeditationTracks() {
    return this.prisma.meditationTrack.findMany({ orderBy: [{ category: 'asc' }, { title: 'asc' }] });
  }

  createMeditationTrack(dto: CreateMeditationTrackDto, file?: Express.Multer.File) {
    if (!file) throw new BadRequestException('Envie o arquivo de áudio.');
    return this.prisma.meditationTrack.create({
      data: {
        category: dto.category,
        title: dto.title,
        description: dto.description,
        durationSeconds: dto.durationSeconds,
        audioPath: file.filename,
      },
    });
  }

  async setMeditationTrackActive(id: string, active: boolean) {
    const track = await this.prisma.meditationTrack.findUnique({ where: { id } });
    if (!track) throw new NotFoundException('Trilha não encontrada.');
    return this.prisma.meditationTrack.update({ where: { id }, data: { active } });
  }

  async deleteMeditationTrack(id: string) {
    const track = await this.prisma.meditationTrack.findUnique({ where: { id } });
    if (!track) throw new NotFoundException('Trilha não encontrada.');
    fs.unlink(path.join(MEDITATION_UPLOAD_DIR, track.audioPath), () => undefined);
    await this.prisma.meditationTrack.delete({ where: { id } });
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

  /**
   * NestJS/Express não serializa um retorno `null` de controller como JSON
   * "null" — trata como "sem corpo" (Content-Length: 0). O frontend faz
   * `res.json()` nessa resposta vazia, que lança erro de parse — capturado
   * pelo .catch() da página, que interpreta qualquer erro como "não
   * autenticado" e redireciona pro login. Era exatamente esse o bug: sem
   * modelo cadastrado -> findFirst() devolve null -> resposta vazia -> parse
   * falha -> redirect. Envolver em `{ template }` garante objeto de verdade,
   * nunca null no nível raiz da resposta.
   */
  async getCertificateTemplate() {
    const template = await this.prisma.certificateTemplate.findFirst();
    return { template };
  }

  /** `certificates` não tem RLS (ver rls.sql) — cross-tenant já é o normal aqui, sem forSystem(). */
  listIssuedCertificates() {
    return this.prisma.certificate.findMany({
      orderBy: { issuedAt: 'desc' },
      select: {
        id: true,
        issuedAt: true,
        verificationCode: true,
        courseSlug: true,
        course: { select: { title: true } },
        tenant: { select: { name: true, slug: true } },
        user: { select: { name: true } },
        patient: { select: { name: true } },
      },
      take: 200,
    });
  }

  async getIssuedCertificateFilePath(id: string) {
    const cert = await this.prisma.certificate.findUnique({ where: { id }, select: { filePath: true } });
    if (!cert?.filePath) throw new NotFoundException('Certificado não encontrado ou sem arquivo gerado.');
    return path.join(CERTIFICATE_OUTPUT_DIR, cert.filePath);
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

  /** Programa Piloto — captação de leads de nível de plataforma (ver CampaignLead no schema, sem tenantId/RLS). */
  listCampaignLeads() {
    return this.prisma.campaignLead.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async updateCampaignLead(id: string, dto: UpdateCampaignLeadDto) {
    const lead = await this.prisma.campaignLead.findUnique({ where: { id } });
    if (!lead) throw new NotFoundException('Lead não encontrado.');
    return this.prisma.campaignLead.update({
      where: { id },
      data: { status: dto.status, notes: dto.notes },
    });
  }

  /** Remoção manual e definitiva — usada pelo admin pra limpar duplicatas (ver bloqueio de reenvio em CampaignLeadsService.create) ou qualquer entrada indesejada. */
  async deleteCampaignLead(id: string) {
    const lead = await this.prisma.campaignLead.findUnique({ where: { id } });
    if (!lead) throw new NotFoundException('Lead não encontrado.');
    await this.prisma.campaignLead.delete({ where: { id } });
    return { deleted: true };
  }

  /**
   * Concede 3 meses de acesso ativo sem cobrança real (Programa Piloto) —
   * exige que a pessoa já tenha se cadastrado de verdade em /signup (o
   * tenant precisa existir). `isComplimentary: true` distingue de
   * assinatura paga no painel de receita (getRevenueSummary) e é o que o
   * cron de expiração verifica antes de rebaixar o status.
   */
  async grantComplimentaryTrial(leadId: string, dto: GrantComplimentaryTrialDto) {
    const lead = await this.prisma.campaignLead.findUnique({ where: { id: leadId } });
    if (!lead) throw new NotFoundException('Lead não encontrado.');

    const tenant = await this.prisma.tenant.findUnique({ where: { slug: dto.tenantSlug }, select: { id: true, name: true } });
    if (!tenant) {
      throw new NotFoundException(`Nenhum tenant encontrado com o identificador "${dto.tenantSlug}" — a pessoa precisa se cadastrar em /signup antes.`);
    }

    const currentPeriodEnd = new Date();
    currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 3);

    // subscriptions tem RLS forçado (ver rls.sql) — client cru sempre volta
    // zero linhas afetadas aqui, precisa de forSystem() (mesmo padrão do
    // resto deste arquivo, ex: listPendingCrp).
    await this.prisma.forSystem().subscription.upsert({
      where: { tenantId: tenant.id },
      create: { tenantId: tenant.id, status: SubscriptionStatus.ACTIVE, currentPeriodEnd, isComplimentary: true },
      update: { status: SubscriptionStatus.ACTIVE, currentPeriodEnd, isComplimentary: true },
    });

    return this.prisma.campaignLead.update({
      where: { id: leadId },
      data: { status: CampaignLeadStatus.CONVERTIDO, convertedTenantId: tenant.id },
    });
  }

  /**
   * Índice de Ativação — a métrica que importa de verdade no Programa
   * Piloto não é quantos se inscreveram, é quantos estão usando o produto
   * de fato. Calculado sob demanda em cima do que já existe (Patient/
   * Appointment/Invoice), sem tabela de eventos nova — a escala do piloto
   * (até 100 tenants) não justifica isso. `patients`/`appointments`/
   * `invoices` têm RLS forçado (ver rls.sql), por isso forSystem() aqui,
   * mesmo padrão de grantComplimentaryTrial.
   */
  async getCampaignLeadActivation(leadId: string) {
    const lead = await this.prisma.campaignLead.findUnique({ where: { id: leadId } });
    if (!lead) throw new NotFoundException('Lead não encontrado.');
    if (!lead.convertedTenantId) return null;

    const system = this.prisma.forSystem();
    const tenantId = lead.convertedTenantId;
    const [tenant, patientCount, appointmentCount, invoiceCount, teleconsultaCount] = await Promise.all([
      this.prisma.tenant.findUnique({ where: { id: tenantId }, select: { published: true, bio: true } }),
      system.patient.count({ where: { tenantId } }),
      system.appointment.count({ where: { tenantId } }),
      system.invoice.count({ where: { tenantId } }),
      system.appointment.count({ where: { tenantId, videoRoomUrl: { not: null } } }),
    ]);

    const milestones = {
      perfil: Boolean(tenant?.published || tenant?.bio),
      paciente: patientCount > 0,
      agenda: appointmentCount > 0,
      financeiro: invoiceCount > 0,
      teleconsulta: teleconsultaCount > 0,
    };

    return { ...milestones, score: Object.values(milestones).filter(Boolean).length };
  }

  /**
   * Busca de tenant por nome ou slug pra concessão de trial do Programa
   * Piloto — antes disso o admin digitava o slug de cabeça, sem validação
   * nenhuma. `tenants` não tem RLS (raiz do isolamento), então client cru
   * já basta, sem forSystem().
   */
  searchTenants(query: string) {
    const q = query.trim();
    if (!q) return [];
    return this.prisma.tenant.findMany({
      where: {
        OR: [{ name: { contains: q, mode: 'insensitive' } }, { slug: { contains: q, mode: 'insensitive' } }],
      },
      select: { id: true, name: true, slug: true },
      take: 10,
      orderBy: { name: 'asc' },
    });
  }
}
