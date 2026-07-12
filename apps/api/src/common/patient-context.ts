import { AsyncLocalStorage } from 'node:async_hooks';

export interface PatientRequestContext {
  tenantId: string;
  patientId: string;
}

/**
 * Contexto separado do `tenantStorage` (auth de equipe) de propósito —
 * paciente é uma identidade distinta de User (sem crpStatus/Role), com seu
 * próprio login. Ver patient-portal/patient-auth.middleware.ts.
 */
export const patientStorage = new AsyncLocalStorage<PatientRequestContext>();

export function getPatientContext(): PatientRequestContext {
  const ctx = patientStorage.getStore();
  if (!ctx) {
    throw new Error(
      'PatientRequestContext ausente — esta função só pode ser chamada em uma rota protegida por PatientAuthMiddleware.',
    );
  }
  return ctx;
}
