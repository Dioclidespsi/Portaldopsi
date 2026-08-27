import { AsyncLocalStorage } from 'node:async_hooks';

export interface PatientRequestContext {
  /** Conta global (PatientAccount), não um Patient de uma clínica específica — ver patient-portal.service.ts. */
  patientAccountId: string;
}

/**
 * Contexto separado do `tenantStorage` (auth de equipe) de propósito —
 * paciente é uma identidade distinta de User (sem crpStatus/Role), com seu
 * próprio login. Ver patient-portal/patient-auth.middleware.ts.
 *
 * Sem tenantId de propósito: a conta do paciente é global (cross-clínica),
 * não presa a um tenant fixo — cada método de PatientPortalService resolve
 * qual(is) tenant(s) são relevantes a partir de PatientAccount.patients
 * (ver myPatientRows()), nunca de um valor fixo no token.
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
