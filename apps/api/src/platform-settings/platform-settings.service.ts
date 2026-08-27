import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PLANS } from '../billing/plans';
import { UpdatePlatformSettingsDto } from './dto/update-platform-settings.dto';

function formatBRL(cents: number): string {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/** Singleton — sempre no máximo uma linha (ver schema.prisma). `platform_settings` não tem RLS/tenantId: config global da plataforma, não do tenant. */
@Injectable()
export class PlatformSettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async get() {
    const existing = await this.prisma.platformSettings.findFirst();
    return existing ?? this.prisma.platformSettings.create({ data: {} });
  }

  async update(dto: UpdatePlatformSettingsDto) {
    const existing = await this.get();
    return this.prisma.platformSettings.update({
      where: { id: existing.id },
      data: {
        ...(dto.colorPalette !== undefined && { colorPalette: dto.colorPalette }),
        ...(dto.subscriptionMonthlyPriceCents !== undefined && { subscriptionMonthlyPriceCents: dto.subscriptionMonthlyPriceCents }),
        ...(dto.subscriptionYearlyPriceCents !== undefined && { subscriptionYearlyPriceCents: dto.subscriptionYearlyPriceCents }),
      },
    });
  }

  /**
   * PLANS (billing/plans.ts) é o valor normal — aqui aplicamos o override
   * salvo pelo admin, se houver (ex: promoção relâmpago por valor
   * simbólico). Usado tanto pela listagem de planos (tela de assinatura)
   * quanto pela cobrança de verdade no Asaas — nunca os dois lugares
   * podem divergir, por isso os dois leem daqui, nunca de PLANS direto.
   */
  async getEffectivePlans(): Promise<typeof PLANS> {
    const settings = await this.get();
    const monthlyCents = settings.subscriptionMonthlyPriceCents ?? PLANS.MONTHLY.valueCents;
    const yearlyCents = settings.subscriptionYearlyPriceCents ?? PLANS.YEARLY.valueCents;
    return {
      MONTHLY: { cycle: 'MONTHLY', valueCents: monthlyCents, label: `Mensal — ${formatBRL(monthlyCents)}/mês` },
      YEARLY: { cycle: 'YEARLY', valueCents: yearlyCents, label: `Anual — ${formatBRL(yearlyCents)}/ano` },
    };
  }
}
