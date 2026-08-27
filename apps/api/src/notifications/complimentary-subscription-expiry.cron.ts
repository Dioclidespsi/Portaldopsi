import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Cortesias concedidas pelo admin (Programa Piloto — ver
 * AdminService.grantComplimentaryTrial) nunca têm assinatura real no
 * Asaas, então nunca recebem o webhook que rebaixaria o status ao vencer.
 * Sem este cron, uma cortesia ficaria `ACTIVE` pra sempre depois dos 3
 * meses, mesmo sem cobrança nenhuma.
 */
@Injectable()
export class ComplimentarySubscriptionExpiryCron {
  private readonly logger = new Logger(ComplimentarySubscriptionExpiryCron.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron('0 3 * * *')
  async expireOverdueComplimentarySubscriptions() {
    // subscriptions tem RLS forçado — forSystem() (mesmo padrão do resto do projeto pra essa tabela).
    const result = await this.prisma.forSystem().subscription.updateMany({
      where: { isComplimentary: true, status: 'ACTIVE', currentPeriodEnd: { lt: new Date() } },
      data: { status: 'CANCELED' },
    });
    if (result.count > 0) {
      this.logger.log(`${result.count} cortesia(s) do Programa Piloto expirada(s).`);
    }
  }
}
