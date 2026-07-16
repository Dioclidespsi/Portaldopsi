import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/** Singleton — sempre no máximo uma linha (ver schema.prisma). `platform_settings` não tem RLS/tenantId: config global da plataforma, não do tenant. */
@Injectable()
export class PlatformSettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async get() {
    const existing = await this.prisma.platformSettings.findFirst();
    return existing ?? this.prisma.platformSettings.create({ data: {} });
  }

  async update(colorPalette: string) {
    const existing = await this.get();
    return this.prisma.platformSettings.update({ where: { id: existing.id }, data: { colorPalette } });
  }
}
