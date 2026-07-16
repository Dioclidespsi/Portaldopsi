import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/** Igual a ProfileService.getPublic: `tenants` não tem RLS, então client cru é o correto (nunca forSystem/forTenant aqui). */
@Injectable()
export class DirectoryService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Busca pública cross-tenant — só psicólogos com `published` E
   * `listedInDirectory` (opt-in explícito e separado, ver Tenant no
   * schema.prisma) aparecem aqui. `specialties` é texto livre separado por
   * vírgula (não uma taxonomia estruturada), então o filtro é um "contains"
   * simples, não uma busca exata por categoria.
   */
  search(q?: string, specialty?: string) {
    return this.prisma.tenant.findMany({
      where: {
        published: true,
        listedInDirectory: true,
        name: q ? { contains: q, mode: 'insensitive' } : undefined,
        specialties: specialty ? { contains: specialty, mode: 'insensitive' } : undefined,
      },
      select: { slug: true, name: true, photoUrl: true, specialties: true, bio: true, colorPalette: true },
      orderBy: { name: 'asc' },
      take: 60,
    });
  }
}
