import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { tenantStorage } from './tenant-context';

/**
 * Fecha o gap documentado desde o F0 mas nunca aplicado: tenant.kind=ESTUDANTE
 * "não deveria ter acesso a nenhum módulo clínico", mas nada checava isso.
 * Guard global (ver APP_GUARD em app.module.ts) em vez de decorar cada
 * controller clínico — allowlist, não blocklist, pra nunca esquecer de gatear
 * um módulo novo por engano (fail-closed).
 *
 * Usa `tenantStorage.getStore()` direto (nunca `getRequestContext()`, que
 * lança) porque rotas públicas/excluídas do AuthMiddleware (signup, webhooks,
 * patient-portal/*, admin/*) não têm contexto de tenant nenhum — nesse caso
 * a restrição simplesmente não se aplica, cada uma tem seu próprio guard.
 */
const ALLOWED_PREFIXES = ['/me', '/courses', '/certificates', '/marketplace', '/offers'];

@Injectable()
export class EstudanteAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = tenantStorage.getStore();
    if (!ctx || ctx.tenantKind !== 'ESTUDANTE') return true;

    const request = context.switchToHttp().getRequest();
    const path: string = request.path ?? request.url ?? '';
    const allowed = ALLOWED_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
    if (!allowed) {
      throw new ForbiddenException(
        'Contas de estudante têm acesso apenas ao ambiente de estudos (Cursos, Certificados, Marketplace, Ofertas).',
      );
    }
    return true;
  }
}
