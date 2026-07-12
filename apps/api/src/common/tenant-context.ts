import { AsyncLocalStorage } from 'node:async_hooks';
import { Role, TenantKind } from '@prisma/client';

export interface RequestContext {
  tenantId: string;
  userId: string;
  role: Role;
  tenantKind: TenantKind;
}

export const tenantStorage = new AsyncLocalStorage<RequestContext>();

/**
 * Só deve ser chamado dentro de uma rota autenticada (depois do AuthMiddleware
 * ter rodado). Lançar em vez de retornar undefined evita que um bug esqueça de
 * escopar uma query por tenant e acabe lendo dado de outro tenant.
 */
export function getRequestContext(): RequestContext {
  const ctx = tenantStorage.getStore();
  if (!ctx) {
    throw new Error(
      'RequestContext ausente — esta função só pode ser chamada em uma rota protegida por AuthMiddleware.',
    );
  }
  return ctx;
}
