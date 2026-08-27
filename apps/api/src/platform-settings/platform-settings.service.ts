import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { PLANS } from '../billing/plans';
import { UpdatePlatformSettingsDto } from './dto/update-platform-settings.dto';

function formatBRL(cents: number): string {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/** Singleton — sempre no máximo uma linha (ver schema.prisma). `platform_settings` não tem RLS/tenantId: config global da plataforma, não do tenant. */
@Injectable()
export class PlatformSettingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly email: EmailService,
    private readonly config: ConfigService,
  ) {}

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

  /** null cai no ADMIN_TOKEN do .env (comportamento original) — ver AdminTokenGuard. */
  async getEffectiveAdminToken(): Promise<string | undefined> {
    const settings = await this.get();
    return settings.adminToken ?? this.config.get<string>('ADMIN_TOKEN');
  }

  /**
   * "Esqueci o token" — gera um segredo novo e substitui o efetivo em
   * runtime (grava em `adminToken`, sem precisar reiniciar a API). O valor
   * novo nunca volta na resposta HTTP, só vai por e-mail pro endereço fixo
   * configurado em ADMIN_RECOVERY_EMAIL — sem isso, o reset fica
   * silenciosamente desativado (mesmo padrão de BREVO_API_KEY ausente).
   */
  async rotateAdminToken(): Promise<{ sent: boolean }> {
    const recoveryEmail = this.config.get<string>('ADMIN_RECOVERY_EMAIL');
    if (!recoveryEmail) return { sent: false };

    const existing = await this.get();
    const newToken = randomBytes(24).toString('hex');
    await this.prisma.platformSettings.update({ where: { id: existing.id }, data: { adminToken: newToken } });
    await this.email.sendAdminTokenReset({ email: recoveryEmail, newToken });
    return { sent: true };
  }
}
