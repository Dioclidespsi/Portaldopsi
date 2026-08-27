import { CanActivate, ExecutionContext, Injectable, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { PlatformSettingsService } from '../platform-settings/platform-settings.service';

/**
 * Autenticação do console do administrador da plataforma (não é um tenant,
 * não é um `User`) — um segredo único compartilhado, enviado no header
 * `x-admin-token`. Suficiente pro estágio atual (operação por uma
 * pessoa/equipe pequena); se a equipe que opera a plataforma crescer, trocar
 * por um modelo real de admin-user com login próprio.
 *
 * O valor efetivo vem de PlatformSettingsService.getEffectiveAdminToken()
 * (banco, com fallback pro ADMIN_TOKEN do .env) — não mais direto do
 * ConfigService — pra permitir trocar o segredo em runtime (ver "esqueci o
 * token", AdminRecoveryController) sem precisar reiniciar a API.
 */
@Injectable()
export class AdminTokenGuard implements CanActivate {
  constructor(private readonly platformSettings: PlatformSettingsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const adminToken = await this.platformSettings.getEffectiveAdminToken();
    if (!adminToken) {
      throw new ServiceUnavailableException(
        'Console do administrador ainda não configurado: defina ADMIN_TOKEN em apps/api/.env.',
      );
    }
    const request = context.switchToHttp().getRequest();
    const provided = request.headers['x-admin-token'];
    if (provided !== adminToken) {
      throw new UnauthorizedException('Token de administrador inválido.');
    }
    return true;
  }
}
