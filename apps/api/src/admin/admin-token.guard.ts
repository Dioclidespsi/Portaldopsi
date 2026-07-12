import { CanActivate, ExecutionContext, Injectable, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Autenticação do console do administrador da plataforma (não é um tenant,
 * não é um `User`) — um segredo único compartilhado (`ADMIN_TOKEN`), enviado
 * no header `x-admin-token`. Suficiente pro estágio atual (operação por uma
 * pessoa/equipe pequena); se a equipe que opera a plataforma crescer, trocar
 * por um modelo real de admin-user com login próprio.
 */
@Injectable()
export class AdminTokenGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const adminToken = this.config.get<string>('ADMIN_TOKEN');
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
