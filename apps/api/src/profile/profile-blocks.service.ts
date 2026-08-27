import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { getSiteProfileBlockType, listSiteProfileBlockTypes } from './block-catalog';
import { CreateProfileBlockDto } from './dto/create-profile-block.dto';
import { UpdateProfileBlockDto } from './dto/update-profile-block.dto';

/**
 * Conteúdo repetível do Site Profissional (formação, experiência,
 * credenciais, FAQ) — CRUD do próprio titular, isolado por RLS via
 * `forCurrentTenant()` (mesmo padrão de PsychDocumentsService). A validade
 * do `type` é sempre conferida contra o catálogo em código; nunca aceita um
 * tipo desconhecido.
 */
@Injectable()
export class ProfileBlocksService {
  constructor(private readonly prisma: PrismaService) {}

  listCatalog() {
    return listSiteProfileBlockTypes();
  }

  listOwn() {
    return this.prisma.forCurrentTenant().siteProfileBlock.findMany({ orderBy: { position: 'asc' } });
  }

  async create(dto: CreateProfileBlockDto) {
    if (!getSiteProfileBlockType(dto.type)) {
      throw new BadRequestException('Tipo de bloco inválido.');
    }
    const { tenantId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();
    const last = await tenantPrisma.siteProfileBlock.findFirst({
      orderBy: { position: 'desc' },
      select: { position: true },
    });

    return tenantPrisma.siteProfileBlock.create({
      data: { tenantId, type: dto.type, fields: dto.fields, position: (last?.position ?? -1) + 1 },
    });
  }

  private async getOwnOrThrow(id: string) {
    const block = await this.prisma.forCurrentTenant().siteProfileBlock.findUnique({ where: { id } });
    if (!block) throw new NotFoundException('Bloco não encontrado.');
    return block;
  }

  async update(id: string, dto: UpdateProfileBlockDto) {
    await this.getOwnOrThrow(id);
    return this.prisma.forCurrentTenant().siteProfileBlock.update({
      where: { id },
      data: {
        ...(dto.fields ? { fields: dto.fields } : {}),
        ...(dto.position !== undefined ? { position: dto.position } : {}),
      },
    });
  }

  async delete(id: string) {
    await this.getOwnOrThrow(id);
    await this.prisma.forCurrentTenant().siteProfileBlock.delete({ where: { id } });
    return { ok: true };
  }
}
