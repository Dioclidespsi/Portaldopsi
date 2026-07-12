import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/** Leitura pública-pra-quem-está-logado das Ofertas — sem RLS de propósito (ver Offer no schema.prisma). */
@Injectable()
export class OffersService {
  constructor(private readonly prisma: PrismaService) {}

  listActive() {
    return this.prisma.offer.findMany({ where: { active: true }, orderBy: { createdAt: 'desc' } });
  }
}
