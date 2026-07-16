import type { CourseView, QuizForStudent, CertificateRecord } from './api';

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

/** Autoatendimento via link gerado pela equipe (ver generatePatientActivationLink em lib/api.ts). */
export function activatePatientPortal(data: { slug: string; token: string; password: string }) {
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

export function cancelOwnAppointment(id: string) {
  return request<{ cancelled: boolean }>(`/patient-portal/appointments/${id}/cancel`, { method: 'POST' });
}

export interface PatientSlot {
  id: string;
  startsAt: string;
  endsAt: string;
}

export function listOwnAvailability() {
  return request<{ sessionPriceCents: number | null; slots: PatientSlot[] }>('/patient-portal/availability');
}

export function bookOwnAppointment(slotId: string) {
  return request<{ appointmentId: string; holdExpiresAt: string; paymentLink: string }>('/patient-portal/bookings', {
    method: 'POST',
    body: JSON.stringify({ slotId }),
  });
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
}

export function listOwnHomework() {
  return request<PatientHomework[]>('/patient-portal/homework');
}

export function completeOwnHomework(id: string, patientNote?: string) {
  return request<PatientHomework>(`/patient-portal/homework/${id}/complete`, {
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

/** Vitrine — sem progresso, mesmo catálogo de /loja. */
export function listOwnCourseCatalog() {
  return request<{ slug: string; title: string; description: string; priceCents: number | null; modules: { order: number; title: string; free: boolean; lessonCount: number }[] }[]>(
    '/patient-portal/courses',
  );
}

/** Com progresso/bloqueio, já considerando o que o paciente comprou. */
export function listOwnCoursesWithProgress() {
  return request<CourseView[]>('/patient-portal/courses/mine');
}

export function purchaseOwnCourse(slug: string, cpfCnpj: string) {
  return request<{ paymentId: string; paymentLink: string }>(`/patient-portal/courses/${slug}/purchase`, {
    method: 'POST',
    body: JSON.stringify({ cpfCnpj }),
  });
}

export function markOwnLessonComplete(lessonId: string) {
  return request<{ completed: boolean }>(`/patient-portal/courses/lessons/${lessonId}/complete`, { method: 'POST' });
}

export function getOwnLessonQuiz(lessonId: string) {
  return request<QuizForStudent>(`/patient-portal/courses/lessons/${lessonId}/quiz`);
}

export function submitOwnQuizAttempt(lessonId: string, answers: Record<string, string>) {
  return request<{ scorePercent: number; passed: boolean; correctCount: number; totalCount: number }>(
    `/patient-portal/courses/lessons/${lessonId}/quiz`,
    { method: 'POST', body: JSON.stringify({ answers }) },
  );
}

export function listOwnCertificates() {
  return request<CertificateRecord[]>('/patient-portal/certificates');
}

/** Download autenticado: precisa do header Authorization, então não dá pra usar um <a href> puro. */
export async function downloadOwnCertificate(id: string, suggestedName: string) {
  const token = getPatientToken();
  const res = await fetch(`${API_URL}/patient-portal/certificates/${id}/download`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error(`Erro ${res.status} ao baixar certificado.`);
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
