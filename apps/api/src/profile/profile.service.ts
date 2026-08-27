import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { VideoApprovalStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { extractYouTubeId } from '../common/youtube';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreatePublicLeadDto } from './dto/create-public-lead.dto';
import { PROFILE_PHOTO_UPLOAD_DIR } from './profile-photo-upload.config';

/** Origem fixa (não vem do visitante) — permite ao CRM filtrar/reconhecer leads captados pelo site público. */
const PUBLIC_SITE_LEAD_SOURCE = 'Site profissional';

const PUBLIC_FIELDS = {
  name: true,
  slug: true,
  bio: true,
  attendanceInfo: true,
  photoUrl: true,
  specialties: true,
  publicEmail: true,
  publicPhone: true,
  publicAddress: true,
  publicCity: true,
  publicState: true,
  socialInstagram: true,
  socialYoutube: true,
  socialFacebook: true,
  socialLinkedin: true,
  socialTiktok: true,
  colorPalette: true,
  /// Só faz sentido mostrar preço/CTA de agendamento se bookingEnabled — o
  /// frontend decide se mostra o widget checando os dois campos juntos (ver
  /// BookingService.requireBookableTenant, mesma regra do lado do backend).
  sessionPriceCents: true,
  bookingEnabled: true,
} as const;

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  /**
   * `tenants` não tem RLS (ver schema.prisma), então o isolamento aqui depende
   * inteiramente de usar o tenantId do contexto autenticado — nunca um id
   * vindo do corpo da requisição.
   *
   * Publicar a página (`published: true`) exige CRP verificado, mesmo no
   * plano Free — é licença profissional, não feature paga. Só checa quando
   * o pedido está de fato tentando LIGAR a publicação: já publicado
   * continuando publicado, ou desligando, nunca é bloqueado por isso.
   */
  async updateOwn(dto: UpdateProfileDto) {
    const { tenantId } = getRequestContext();

    if (dto.published) {
      const tenantPrisma = this.prisma.forTenant(tenantId);
      const verifiedTitular = await tenantPrisma.user.findFirst({
        where: { role: 'PSICOLOGO_TITULAR', crpStatus: 'VERIFICADO' },
        select: { id: true },
      });
      if (!verifiedTitular) {
        throw new BadRequestException('Seu CRP precisa estar verificado antes de publicar sua página profissional.');
      }
    }

    return this.prisma.tenant.update({ where: { id: tenantId }, data: dto });
  }

  getOwn() {
    const { tenantId } = getRequestContext();
    return this.prisma.tenant.findUniqueOrThrow({ where: { id: tenantId } });
  }

  /**
   * `photoUrl` precisa continuar sendo uma URL completa e usável direto num
   * `<img src>` (igual quando o psicólogo cola uma URL externa) — por isso
   * monta a URL absoluta aqui usando PUBLIC_API_URL, em vez de guardar só o
   * nome do arquivo. Some a foto antiga do disco se havia uma enviada antes
   * (nunca apaga se o valor antigo era uma URL externa colada pelo usuário).
   */
  async uploadPhoto(file?: Express.Multer.File) {
    if (!file) throw new BadRequestException('Envie o arquivo da foto.');
    const { tenantId } = getRequestContext();

    const previous = await this.prisma.tenant.findUniqueOrThrow({ where: { id: tenantId }, select: { photoUrl: true } });
    const publicApiUrl = this.config.get<string>('PUBLIC_API_URL', 'http://localhost:3333');
    const ownUploadPrefix = `${publicApiUrl}/public/photos/`;
    if (previous.photoUrl?.startsWith(ownUploadPrefix)) {
      const oldFilename = previous.photoUrl.slice(ownUploadPrefix.length);
      fs.unlink(path.join(PROFILE_PHOTO_UPLOAD_DIR, oldFilename), () => undefined);
    }

    const photoUrl = `${ownUploadPrefix}${file.filename}`;
    return this.prisma.tenant.update({ where: { id: tenantId }, data: { photoUrl } });
  }

  /** `filename` vem direto da URL (rota pública) — valida contra path traversal antes de tocar o disco. */
  getPhotoPath(filename: string) {
    if (filename !== path.basename(filename) || filename.includes('..')) {
      throw new NotFoundException('Foto não encontrada.');
    }
    const absolutePath = path.join(PROFILE_PHOTO_UPLOAD_DIR, filename);
    if (!fs.existsSync(absolutePath)) throw new NotFoundException('Foto não encontrada.');
    return absolutePath;
  }

  /**
   * Rota pública — sem tenant no contexto, por isso o select explícito de
   * campos não-sensíveis. `crpVerified` é lido via `forTenant(id)` (não o
   * client cru, que erraria por RLS em `users`) — true se QUALQUER titular
   * desta clínica tiver CRP verificado pelo admin da plataforma.
   */
  async getPublic(slug: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { slug },
      select: { ...PUBLIC_FIELDS, id: true, published: true, presentationVideoStatus: true, presentationVideoUrl: true },
    });
    if (!tenant || !tenant.published) {
      throw new NotFoundException('Página não encontrada ou ainda não publicada.');
    }
    const tenantPrisma = this.prisma.forTenant(tenant.id);
    const [verifiedTitular, blocks] = await Promise.all([
      tenantPrisma.user.findFirst({
        where: { role: 'PSICOLOGO_TITULAR', crpStatus: 'VERIFICADO' },
        select: { id: true, crpNumber: true },
      }),
      tenantPrisma.siteProfileBlock.findMany({
        orderBy: { position: 'asc' },
        select: { id: true, type: true, fields: true, position: true },
      }),
    ]);
    const { id, published, presentationVideoStatus, presentationVideoUrl, ...publicProfile } = tenant;
    return {
      ...publicProfile,
      crpVerified: Boolean(verifiedTitular),
      /// Só expõe o número quando o CRP está verificado — nunca um valor não conferido pela equipe.
      crpNumber: verifiedTitular?.crpNumber ?? null,
      presentationVideoUrl: presentationVideoStatus === VideoApprovalStatus.PUBLICADO ? presentationVideoUrl : null,
      /// Conteúdo repetível (formação, experiência, credenciais, FAQ) — ver
      /// SiteProfileBlock. Lista vazia quando o psicólogo não preencheu nada,
      /// nunca um placeholder fabricado.
      blocks,
    };
  }

  /**
   * Só o link é cadastrado (nunca um arquivo) — vídeo hospedado pelo próprio
   * profissional no YouTube como "não listado". Cadastrar outro link
   * sobrescreve o anterior e volta pra EM_ANALISE — nunca publica direto,
   * mesmo que já tivesse sido aprovado antes. Nunca mistura estado de uma
   * tentativa anterior, mesmo padrão de UsersService.submitCrp.
   */
  async setPresentationVideoUrl(url: string) {
    const videoId = extractYouTubeId(url);
    if (!videoId) throw new BadRequestException('Cole um link válido de vídeo do YouTube.');
    const { tenantId } = getRequestContext();

    return this.prisma.tenant.update({
      where: { id: tenantId },
      data: {
        presentationVideoUrl: url,
        presentationVideoStatus: VideoApprovalStatus.EM_ANALISE,
        presentationVideoRejectionReason: null,
      },
      select: { id: true, presentationVideoStatus: true },
    });
  }

  /** Some da página pública (mesmo se já estava PUBLICADO) e limpa o link — o profissional pode cadastrar outro depois. */
  async removePresentationVideo() {
    const { tenantId } = getRequestContext();
    return this.prisma.tenant.update({
      where: { id: tenantId },
      data: {
        presentationVideoUrl: null,
        presentationVideoStatus: VideoApprovalStatus.NAO_ENVIADO,
        presentationVideoRejectionReason: null,
      },
      select: { id: true, presentationVideoStatus: true },
    });
  }

  /**
   * Rota pública — sem tenant no contexto (visitante não autenticado), por
   * isso resolve o tenant pelo slug primeiro e usa `forTenant(id)` explícito
   * (nunca `forCurrentTenant()`, que exigiria contexto). Cai no CRM do
   * profissional como um Lead comum — ele responde pelo contato deixado
   * aqui, fora da plataforma (sem envio automático de e-mail/WhatsApp).
   */
  async createPublicLead(slug: string, dto: CreatePublicLeadDto) {
    const tenant = await this.prisma.tenant.findUnique({ where: { slug }, select: { id: true, published: true } });
    if (!tenant || !tenant.published) {
      throw new NotFoundException('Página não encontrada ou ainda não publicada.');
    }

    await this.prisma.forTenant(tenant.id).lead.create({
      data: {
        tenantId: tenant.id,
        name: dto.name,
        contact: dto.contact,
        source: PUBLIC_SITE_LEAD_SOURCE,
        notes: dto.message,
      },
    });

    return { received: true };
  }
}
