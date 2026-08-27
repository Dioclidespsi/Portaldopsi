import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { tenantStorage } from './tenant-context';
import { AccessGateService } from './access-gate.service';
import { STAFF_ROLES } from './roles';

/**
 * Fecha o gap documentado desde sempre no schema (`User.crpStatus`: "ainda
 * não é checado em nenhum guard") — até agora, CRP/assinatura/termos eram
 * 100% informativos, nada impedia o uso real das ferramentas clínicas.
 *
 * Blocklist (não allowlist, ao contrário do que se poderia esperar): o
 * pedido explícito foi "mostre os recursos mas não permita uso" — as telas
 * continuam navegáveis (GET/listagem funciona sempre), só ações que mutam
 * dado clínico de verdade (emitir documento, completar teste, cobrar, usar
 * IA) ou baixar um arquivo já emitido ficam bloqueadas. Mesmo padrão de
 * global APP_GUARD de EstudanteAccessGuard.
 *
 * Duas listas com exigência diferente, não uma só:
 * - FULL_ACCESS_PREFIXES exige CRP verificado + assinatura ativa + termos
 *   aceitos (Premium: prontuário, documentos, testes, financeiro, IA...).
 * - FREE_TIER_PREFIXES (a Agenda) exige só CRP verificado — junto com o
 *   Site Profissional (nunca gated, ver ProfileService) e o agendamento
 *   público (fonte dos 10% de comissão, ver BookingService), formam o
 *   plano Free, que funciona pra sempre sem assinatura. Mas CRP verificado
 *   continua obrigatório mesmo no Free: é licença profissional, não feature
 *   paga — sem isso, ninguém deveria conseguir abrir agenda pra receber
 *   paciente e pagamento.
 * Teleconsulta é a exceção dentro de `/appointments` que continua Premium
 * (ver BLOCKED_SEGMENTS abaixo), porque é um serviço adicional de verdade,
 * não o agendamento em si.
 */
const FULL_ACCESS_PREFIXES = [
  '/patients',
  '/homework',
  '/psych-documents',
  '/anamnese',
  '/psych-tests',
  '/invoices',
  '/ai',
];

const FREE_TIER_PREFIXES = ['/appointments', '/availability'];

/**
 * Igual aos prefixos acima, mas testado com `.includes()` em vez de prefixo
 * — pra pegar sub-rotas de um controller cujo prefixo em si é Free (ex.:
 * `/appointments/:id/teleconsulta`, onde `/appointments` sozinho é Free mas
 * esse sub-recurso específico exige acesso Premium completo).
 */
const FULL_ACCESS_SEGMENTS = ['/teleconsulta'];

const MUTATING_METHODS = new Set(['POST', 'PATCH', 'PUT', 'DELETE']);

function matchesAny(path: string, prefixes: string[]): boolean {
  return prefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

@Injectable()
export class ClinicalAccessGuard implements CanActivate {
  constructor(private readonly accessGate: AccessGateService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = tenantStorage.getStore();
    if (!ctx || ctx.tenantKind !== 'CLINICA' || !STAFF_ROLES.includes(ctx.role)) return true;

    const request = context.switchToHttp().getRequest();
    const path: string = request.path ?? request.url ?? '';
    const method: string = request.method ?? 'GET';

    const requiresFullAccess =
      matchesAny(path, FULL_ACCESS_PREFIXES) || FULL_ACCESS_SEGMENTS.some((segment) => path.includes(segment));
    const requiresCrpOnly = !requiresFullAccess && matchesAny(path, FREE_TIER_PREFIXES);
    if (!requiresFullAccess && !requiresCrpOnly) return true;

    const isGatedAction = MUTATING_METHODS.has(method) || path.endsWith('/download');
    if (!isGatedAction) return true;

    const status = await this.accessGate.checkFullAccess();

    if (requiresCrpOnly) {
      if (!status.missingCrp) return true;
      throw new ForbiddenException('Falta completar: CRP verificado — antes disso, a Agenda fica bloqueada.');
    }

    if (status.ok) return true;
    const missing = [
      status.missingCrp && 'CRP verificado',
      status.missingSubscription && 'assinatura ativa',
      status.missingTerms && 'aceite dos termos de uso',
    ].filter(Boolean);
    throw new ForbiddenException(`Falta completar: ${missing.join(', ')} — antes disso, ações clínicas ficam bloqueadas.`);
  }
}
