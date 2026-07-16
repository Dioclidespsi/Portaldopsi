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

export function patientLogin(data: { slug: string; email: string; password: string }) {
  return request<{ accessToken: string }>('/patient-portal/login', { method: 'POST', body: JSON.stringify(data) });
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

export interface PatientAppointment {
  id: string;
  startsAt: string;
  endsAt: string;
  status: string;
  videoRoomUrl: string | null;
  hasVideoRoom: boolean;
  consentAt: string | null;
}

export function listOwnAppointments() {
  return request<PatientAppointment[]>('/patient-portal/appointments');
}

export function confirmOwnAppointment(id: string) {
  return request<PatientAppointment>(`/patient-portal/appointments/${id}/confirm`, { method: 'POST' });
}

export function consentToTeleconsulta(id: string) {
  return request<PatientAppointment>(`/patient-portal/appointments/${id}/consent`, { method: 'POST' });
}

/** Nunca traz score/resultLabel — comunicar o resultado é decisão do psicólogo, não deste app. */
export interface PatientTestSummary {
  id: string;
  status: 'pendente' | 'respondido' | 'corrigido';
  assignedAt: string;
  submittedAt: string | null;
  testTemplate: { title: string; category: string };
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

export function getOwnTest(id: string) {
  return request<PatientTestToAnswer>(`/patient-portal/tests/${id}`);
}

export function submitOwnTest(id: string, answers: Record<string, number | string>) {
  return request<{ id: string; status: string; submittedAt: string }>(`/patient-portal/tests/${id}/submit`, {
    method: 'POST',
    body: JSON.stringify({ answers }),
  });
}
