const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';
const PATIENT_TOKEN_KEY = 'portal-do-psi:patient-token';

/**
 * Cliente separado de lib/api.ts de propósito — token de paciente e token de
 * equipe nunca compartilham a mesma chave de localStorage, mesmo que o
 * mesmo navegador seja usado pelos dois (ex: secretária testando o portal).
 */
export function savePatientToken(token: string) {
  localStorage.setItem(PATIENT_TOKEN_KEY, token);
}

export function getPatientToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(PATIENT_TOKEN_KEY);
}

export function clearPatientToken() {
  localStorage.removeItem(PATIENT_TOKEN_KEY);
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getPatientToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as { message?: string });
    throw new Error(body.message ?? `Erro ${res.status}`);
  }
  return res.json();
}

/** Clínica/profissional dono de um item — a conta do paciente é global, cada item pode vir de um vínculo diferente. */
export interface PatientTenant {
  name: string;
  slug: string;
}

/** Login global — sem slug, uma conta só serve pra qualquer clínica. */
export function patientLogin(data: { email: string; password: string }) {
  return request<{ accessToken: string }>('/patient-portal/login', { method: 'POST', body: JSON.stringify(data) });
}

/** Resposta sempre igual, exista ou não a conta — nunca confirma nem nega quem tem cadastro. */
export function requestPatientPasswordReset(data: { email: string }) {
  return request<{ sent: true }>('/patient-portal/request-password-reset', { method: 'POST', body: JSON.stringify(data) });
}

export function resetPatientPassword(data: { token: string; newPassword: string }) {
  return request<{ reset: true }>('/patient-portal/reset-password', { method: 'POST', body: JSON.stringify(data) });
}

/** Autoatendimento via link gerado pela equipe (ver generatePatientActivationLink em lib/api.ts). */
export function activatePatientPortal(data: { token: string; password: string; termsAccepted?: boolean }) {
  return request<{ accessToken: string }>('/patient-portal/activate', { method: 'POST', body: JSON.stringify(data) });
}

export interface PatientMe {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
}

export function fetchPatientMe() {
  return request<PatientMe>('/patient-portal/me');
}

export interface PatientClinic {
  tenantId: string;
  name: string;
  slug: string;
}

/** Clínicas com quem a conta já tem vínculo — usado pra decidir o destino do botão "Marcar consulta". */
export function listMyClinics() {
  return request<PatientClinic[]>('/patient-portal/clinics');
}

export interface PatientAppointment {
  id: string;
  startsAt: string;
  endsAt: string;
  status: string;
  videoRoomUrl: string | null;
  hasVideoRoom: boolean;
  consentAt: string | null;
  tenant: PatientTenant;
}

/** Agrega os agendamentos de TODAS as clínicas vinculadas à conta — não é mais uma clínica só. */
export function listOwnAppointments() {
  return request<PatientAppointment[]>('/patient-portal/appointments');
}

export function confirmOwnAppointment(tenantId: string, id: string) {
  return request<PatientAppointment>(`/patient-portal/tenants/${tenantId}/appointments/${id}/confirm`, { method: 'POST' });
}

export function consentToTeleconsulta(tenantId: string, id: string) {
  return request<PatientAppointment>(`/patient-portal/tenants/${tenantId}/appointments/${id}/consent`, { method: 'POST' });
}

/** Sala é privada — a URL crua não entra sozinha, precisa de um token de curta duração gerado na hora. */
export function getTeleconsultaJoinLink(tenantId: string, id: string) {
  return request<{ url: string }>(`/patient-portal/tenants/${tenantId}/appointments/${id}/teleconsulta-join-link`, { method: 'POST' });
}

export function cancelOwnAppointment(tenantId: string, id: string) {
  return request<{ cancelled: boolean }>(`/patient-portal/tenants/${tenantId}/appointments/${id}/cancel`, { method: 'POST' });
}

// listOwnAvailability/bookOwnAppointment removidos de propósito — não fazem
// mais sentido sem uma clínica fixa. Pra agendar (de novo ou pela primeira
// vez), o paciente vai até a página pública do profissional (/{slug}) —
// ver BookingWidget, que já reconhece quando o paciente está logado.

export function registerPushToken(fcmToken: string) {
  return request<{ registered: number }>('/patient-portal/push-subscriptions', { method: 'POST', body: JSON.stringify({ fcmToken }) });
}

export function unregisterPushToken(fcmToken: string) {
  return request<{ removed: number }>('/patient-portal/push-subscriptions/unsubscribe', { method: 'POST', body: JSON.stringify({ fcmToken }) });
}

export interface PatientHomework {
  id: string;
  title: string;
  instructions: string;
  status: 'pendente' | 'concluido';
  dueDate?: string | null;
  patientNote?: string | null;
  completedAt?: string | null;
  createdAt: string;
  tenant: PatientTenant;
}

export function listOwnHomework() {
  return request<PatientHomework[]>('/patient-portal/homework');
}

export function completeOwnHomework(tenantId: string, id: string, patientNote?: string) {
  return request<PatientHomework>(`/patient-portal/tenants/${tenantId}/homework/${id}/complete`, {
    method: 'POST',
    body: JSON.stringify({ patientNote }),
  });
}

export interface PatientMeditationTrack {
  id: string;
  category: string;
  title: string;
  description?: string | null;
  durationSeconds?: number | null;
}

export function listOwnMeditationTracks() {
  return request<PatientMeditationTrack[]>('/patient-portal/meditation-tracks');
}

/** URL direta pro <audio src>, com o token do paciente como query param — <audio> não manda header Authorization. */
export function meditationAudioUrl(id: string): string {
  const token = getPatientToken();
  return `${API_URL}/patient-portal/meditation-tracks/${id}/audio?token=${encodeURIComponent(token ?? '')}`;
}

// Cursos e certificados removidos de propósito do portal do paciente — ver
// comentário em apps/api/src/patient-portal/patient-portal.controller.ts.

export interface OwnPsychDocument {
  id: string;
  title: string;
  templateSlug: string;
  finalizedAt: string | null;
  releasedToPatientAt: string | null;
  requiresPatientAcceptance: boolean;
  acceptedByPatientAt: string | null;
  tenant: PatientTenant;
}

/** Só documentos que o psicólogo já disponibilizou explicitamente aparecem aqui — de todas as clínicas vinculadas. */
export function listOwnPsychDocuments() {
  return request<OwnPsychDocument[]>('/patient-portal/psych-documents');
}

export function acceptOwnPsychDocument(tenantId: string, id: string) {
  return request(`/patient-portal/tenants/${tenantId}/psych-documents/${id}/accept`, { method: 'POST' });
}

export async function downloadOwnPsychDocument(tenantId: string, id: string, suggestedName: string) {
  const token = getPatientToken();
  const res = await fetch(`${API_URL}/patient-portal/tenants/${tenantId}/psych-documents/${id}/download`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error(`Erro ${res.status} ao baixar documento.`);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = suggestedName;
  a.click();
  URL.revokeObjectURL(url);
}

/** Nunca traz score/resultLabel — comunicar o resultado é decisão do psicólogo, não deste app. */
export interface PatientTestSummary {
  id: string;
  status: 'pendente' | 'respondido' | 'corrigido';
  assignedAt: string;
  submittedAt: string | null;
  testTemplate: { title: string; category: string };
  tenant: PatientTenant;
}

export function listOwnTests() {
  return request<PatientTestSummary[]>('/patient-portal/tests');
}

export interface PatientTestQuestion {
  id: string;
  order: number;
  type: 'objetiva' | 'subjetiva';
  prompt: string;
  /** Sobrepõe testTemplate.responseScale quando preenchido (ex: HAD, Beck). */
  options?: { value: number; label: string }[] | null;
}

export interface PatientTestToAnswer {
  id: string;
  status: string;
  testTemplate: {
    title: string;
    disclaimer: string;
    instructions: string;
    responseScale?: { value: number; label: string }[] | null;
    questions: PatientTestQuestion[];
  };
}

export function getOwnTest(tenantId: string, id: string) {
  return request<PatientTestToAnswer>(`/patient-portal/tenants/${tenantId}/tests/${id}`);
}

export function submitOwnTest(tenantId: string, id: string, answers: Record<string, number | string>) {
  return request<{ id: string; status: string; submittedAt: string }>(`/patient-portal/tenants/${tenantId}/tests/${id}/submit`, {
    method: 'POST',
    body: JSON.stringify({ answers }),
  });
}
