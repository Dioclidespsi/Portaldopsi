import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
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
   */
  updateOwn(dto: UpdateProfileDto) {
    const { tenantId } = getRequestContext();
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
    const tenant = await this.prisma.tenant.findUnique({ where: { slug }, select: { ...PUBLIC_FIELDS, id: true, published: true } });
    if (!tenant || !tenant.published) {
      throw new NotFoundException('Página não encontrada ou ainda não publicada.');
    }
    const verifiedTitular = await this.prisma.forTenant(tenant.id).user.findFirst({
      where: { role: 'PSICOLOGO_TITULAR', crpStatus: 'VERIFICADO' },
      select: { id: true },
    });
    const { id, published, ...publicProfile } = tenant;
    return { ...publicProfile, crpVerified: Boolean(verifiedTitular) };
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
