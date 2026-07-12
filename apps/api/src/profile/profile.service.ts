import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { UpdateProfileDto } from './dto/update-profile.dto';

const PUBLIC_FIELDS = {
  name: true,
  slug: true,
  bio: true,
  photoUrl: true,
  specialties: true,
  publicEmail: true,
  publicPhone: true,
} as const;

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

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

  /** Rota pública — sem tenant no contexto, por isso o select explícito de campos não-sensíveis. */
  async getPublic(slug: string) {
    const tenant = await this.prisma.tenant.findUnique({ where: { slug }, select: { ...PUBLIC_FIELDS, published: true } });
    if (!tenant || !tenant.published) {
      throw new NotFoundException('Página não encontrada ou ainda não publicada.');
    }
    const { published, ...publicProfile } = tenant;
    return publicProfile;
  }
}
