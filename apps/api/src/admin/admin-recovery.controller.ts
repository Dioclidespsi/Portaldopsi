import { Controller, Post, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { PlatformSettingsService } from '../platform-settings/platform-settings.service';

/**
 * "Esqueci o token" — deliberadamente SEM AdminTokenGuard (bloquearia a
 * própria recuperação). Não recebe nem devolve nenhum e-mail/identidade: o
 * token novo só é enviado pro endereço fixo configurado em
 * ADMIN_RECOVERY_EMAIL, nunca na resposta HTTP — ver
 * PlatformSettingsService.rotateAdminToken.
 */
@Controller('admin')
export class AdminRecoveryController {
  constructor(private readonly platformSettings: PlatformSettingsService) {}

  @Post('request-token-reset')
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 3, ttl: 60 * 60 * 1000 } })
  requestTokenReset() {
    return this.platformSettings.rotateAdminToken();
  }
}
