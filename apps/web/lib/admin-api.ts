const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';
const ADMIN_TOKEN_KEY = 'portal-do-psi:admin-token';

/**
 * Terceiro cliente separado (ver lib/patient-api.ts para o mesmo padrão) —
 * o console do administrador da plataforma não é um tenant nem um paciente,
 * autentica com um segredo único (`ADMIN_TOKEN` do backend) enviado no
 * header `x-admin-token`, nunca um JWT.
 */
export function saveAdminToken(token: string) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function clearAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAdminToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'x-admin-token': token } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as { message?: string });
    throw new Error(body.message ?? `Erro ${res.status}`);
  }
  return res.json();
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  const res = await fetch(`${API_URL}/admin/ping`, { headers: { 'x-admin-token': token } });
  return res.ok;
}

export interface PendingCrp {
  id: string;
  name: string;
  email: string;
  crpNumber: string | null;
  crpStatus: string;
  tenant: { name: string; slug: string };
}

export function listPendingCrp() {
  return request<PendingCrp[]>('/admin/crp/pending');
}

/** Baixa o documento via fetch (nunca como query string na URL, o token é um segredo) e dispara o download no navegador. */
export async function downloadCrpDocument(userId: string, suggestedName: string) {
  const token = getAdminToken();
  const res = await fetch(`${API_URL}/admin/crp/${userId}/document`, {
    headers: token ? { 'x-admin-token': token } : {},
  });
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = suggestedName;
  link.click();
  URL.revokeObjectURL(url);
}

export function approveCrp(userId: string) {
  return request(`/admin/crp/${userId}/approve`, { method: 'POST' });
}

export function rejectCrp(userId: string, reason: string) {
  return request(`/admin/crp/${userId}/reject`, { method: 'POST', body: JSON.stringify({ reason }) });
}

export interface AdminOffer {
  id: string;
  title: string;
  description: string;
  externalUrl: string;
  imageUrl?: string | null;
  active: boolean;
  createdAt: string;
}

export function listAllOffers() {
  return request<AdminOffer[]>('/admin/offers');
}

export function createOffer(data: { title: string; description: string; externalUrl: string; imageUrl?: string }) {
  return request<AdminOffer>('/admin/offers', { method: 'POST', body: JSON.stringify(data) });
}

export function updateOffer(id: string, data: Partial<{ title: string; description: string; externalUrl: string; imageUrl: string; active: boolean }>) {
  return request<AdminOffer>(`/admin/offers/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

export function deleteOffer(id: string) {
  return request(`/admin/offers/${id}`, { method: 'DELETE' });
}

export interface CourseModuleOption {
  courseSlug: string;
  courseTitle: string;
  moduleSlug: string;
  moduleTitle: string;
}

export function listCourseModules() {
  return request<CourseModuleOption[]>('/admin/course-modules');
}

export interface CourseVideo {
  id: string;
  courseSlug: string;
  moduleSlug: string;
  youtubeUrl: string;
}

export function listCourseVideos() {
  return request<CourseVideo[]>('/admin/course-videos');
}

export function upsertCourseVideo(data: { courseSlug: string; moduleSlug: string; youtubeUrl: string }) {
  return request<CourseVideo>('/admin/course-videos', { method: 'POST', body: JSON.stringify(data) });
}

export function deleteCourseVideo(id: string) {
  return request(`/admin/course-videos/${id}`, { method: 'DELETE' });
}

export interface AdminDocumentTemplate {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export function listAdminDocumentTemplates() {
  return request<AdminDocumentTemplate[]>('/admin/document-templates');
}

export async function createDocumentTemplate(title: string, description: string, file: File) {
  const token = getAdminToken();
  const form = new FormData();
  form.append('title', title);
  form.append('description', description);
  form.append('file', file);
  const res = await fetch(`${API_URL}/admin/document-templates`, {
    method: 'POST',
    headers: token ? { 'x-admin-token': token } : {},
    body: form,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as { message?: string });
    throw new Error(body.message ?? `Erro ${res.status}`);
  }
  return res.json();
}

export function deleteDocumentTemplate(id: string) {
  return request(`/admin/document-templates/${id}`, { method: 'DELETE' });
}

export interface CoursePrice {
  courseSlug: string;
  priceCents: number;
  updatedAt: string;
}

export function listCoursePrices() {
  return request<CoursePrice[]>('/admin/course-prices');
}

export function upsertCoursePrice(data: { courseSlug: string; priceCents: number }) {
  return request<CoursePrice>('/admin/course-prices', { method: 'POST', body: JSON.stringify(data) });
}

export function deleteCoursePrice(courseSlug: string) {
  return request(`/admin/course-prices/${courseSlug}`, { method: 'DELETE' });
}
