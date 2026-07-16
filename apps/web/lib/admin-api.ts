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

export interface PendingSupervisor {
  id: string;
  name: string;
  email: string;
  tenant: { name: string; slug: string };
}

export function listPendingSupervisors() {
  return request<PendingSupervisor[]>('/admin/supervisors/pending');
}

export function approveSupervisor(userId: string) {
  return request(`/admin/supervisors/${userId}/approve`, { method: 'POST' });
}

export function rejectSupervisor(userId: string, reason: string) {
  return request(`/admin/supervisors/${userId}/reject`, { method: 'POST', body: JSON.stringify({ reason }) });
}

export interface CommunityReportItem {
  id: string;
  reason: string;
  createdAt: string;
  reporter: { name: string };
  post?: { id: string; title: string; content: string; authorName: string; removedAt: string | null } | null;
  reply?: { id: string; content: string; authorName: string; postId: string; removedAt: string | null } | null;
}

export function listCommunityReports() {
  return request<CommunityReportItem[]>('/admin/community/reports');
}

export function resolveCommunityReport(id: string) {
  return request(`/admin/community/reports/${id}/resolve`, { method: 'POST' });
}

export function removeCommunityPost(id: string, reason: string) {
  return request(`/admin/community/posts/${id}/remove`, { method: 'POST', body: JSON.stringify({ reason }) });
}

export function removeCommunityReply(id: string, reason: string) {
  return request(`/admin/community/replies/${id}/remove`, { method: 'POST', body: JSON.stringify({ reason }) });
}

export function rejectCrp(userId: string, reason: string) {
  return request(`/admin/crp/${userId}/reject`, { method: 'POST', body: JSON.stringify({ reason }) });
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

export interface AdminLibraryMaterial {
  id: string;
  category: string;
  title: string;
  description?: string | null;
  active: boolean;
  createdAt: string;
}

export function listAdminLibraryMaterials() {
  return request<AdminLibraryMaterial[]>('/admin/library');
}

export async function createLibraryMaterial(category: string, title: string, description: string, file: File) {
  const token = getAdminToken();
  const form = new FormData();
  form.append('category', category);
  form.append('title', title);
  if (description) form.append('description', description);
  form.append('file', file);
  const res = await fetch(`${API_URL}/admin/library`, {
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

export function setLibraryMaterialActive(id: string, active: boolean) {
  return request<AdminLibraryMaterial>(`/admin/library/${id}/active`, { method: 'PATCH', body: JSON.stringify({ active }) });
}

export function deleteLibraryMaterial(id: string) {
  return request(`/admin/library/${id}`, { method: 'DELETE' });
}

export interface AdminMeditationTrack {
  id: string;
  category: string;
  title: string;
  description?: string | null;
  durationSeconds?: number | null;
  active: boolean;
  createdAt: string;
}

export function listAdminMeditationTracks() {
  return request<AdminMeditationTrack[]>('/admin/meditation-tracks');
}

export async function createMeditationTrack(
  category: string,
  title: string,
  description: string,
  durationSeconds: string,
  file: File,
) {
  const token = getAdminToken();
  const form = new FormData();
  form.append('category', category);
  form.append('title', title);
  if (description) form.append('description', description);
  if (durationSeconds) form.append('durationSeconds', durationSeconds);
  form.append('file', file);
  const res = await fetch(`${API_URL}/admin/meditation-tracks`, {
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

export function setMeditationTrackActive(id: string, active: boolean) {
  return request<AdminMeditationTrack>(`/admin/meditation-tracks/${id}/active`, { method: 'PATCH', body: JSON.stringify({ active }) });
}

export function deleteMeditationTrack(id: string) {
  return request(`/admin/meditation-tracks/${id}`, { method: 'DELETE' });
}

export interface AdminBanner {
  id: string;
  position: number;
  imageUrl: string;
  linkUrl?: string | null;
  active: boolean;
  updatedAt: string;
}

export function listBanners() {
  return request<AdminBanner[]>('/admin/banners');
}

/** `position` é 1 ou 2 (únicos, ver schema.prisma) — upsert: cria se não existir, atualiza se já existir. */
export async function upsertBanner(position: 1 | 2, data: { linkUrl?: string; active?: boolean }, file?: File) {
  const token = getAdminToken();
  const form = new FormData();
  if (data.linkUrl) form.append('linkUrl', data.linkUrl);
  if (data.active !== undefined) form.append('active', String(data.active));
  if (file) form.append('file', file);
  const res = await fetch(`${API_URL}/admin/banners/${position}`, {
    method: 'POST',
    headers: token ? { 'x-admin-token': token } : {},
    body: form,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as { message?: string });
    throw new Error(body.message ?? `Erro ${res.status}`);
  }
  return res.json() as Promise<AdminBanner>;
}

export function deleteBanner(position: 1 | 2) {
  return request(`/admin/banners/${position}`, { method: 'DELETE' });
}

export interface AdminPlatformSettings {
  colorPalette: string;
}

export function getPlatformSettings() {
  return request<AdminPlatformSettings>('/admin/settings');
}

export function updatePlatformSettings(colorPalette: string) {
  return request<AdminPlatformSettings>('/admin/settings', { method: 'PATCH', body: JSON.stringify({ colorPalette }) });
}

export interface CertificateTemplatePositions {
  nameX: number;
  nameY: number;
  nameFontSize: number;
  courseX: number;
  courseY: number;
  courseFontSize: number;
  dateX: number;
  dateY: number;
  dateFontSize: number;
  codeX: number;
  codeY: number;
  codeFontSize: number;
}

export interface AdminCertificateTemplate extends CertificateTemplatePositions {
  id: string;
  imagePath: string;
  updatedAt: string;
}

export function getCertificateTemplate() {
  return request<AdminCertificateTemplate | null>('/admin/certificate-template');
}

export async function upsertCertificateTemplate(positions: CertificateTemplatePositions, file?: File) {
  const token = getAdminToken();
  const form = new FormData();
  Object.entries(positions).forEach(([key, value]) => form.append(key, String(value)));
  if (file) form.append('file', file);
  const res = await fetch(`${API_URL}/admin/certificate-template`, {
    method: 'POST',
    headers: token ? { 'x-admin-token': token } : {},
    body: form,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as { message?: string });
    throw new Error(body.message ?? `Erro ${res.status}`);
  }
  return res.json() as Promise<AdminCertificateTemplate>;
}

export async function previewCertificateTemplate(positions: CertificateTemplatePositions): Promise<string> {
  const token = getAdminToken();
  const res = await fetch(`${API_URL}/admin/certificate-template/preview`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'x-admin-token': token } : {}),
    },
    body: JSON.stringify(positions),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as { message?: string });
    throw new Error(body.message ?? `Erro ${res.status}`);
  }
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}

export interface AdminTestQuestionInput {
  type: 'objetiva' | 'subjetiva';
  prompt: string;
  reverseScored?: boolean;
  /** Opções específicas desta pergunta (ex: HAD, Beck) — sobrepõe o responseScale do template. */
  options?: { value: number; label: string }[];
  /** Key de uma entrada em AdminTestTemplate.subscales — instrumentos com múltiplas subescalas (ex: YSQ, Seligman). */
  subscale?: string;
}

export interface AdminTestQuestion extends AdminTestQuestionInput {
  id: string;
  order: number;
}

export interface AdminScoreBand {
  maxScore: number;
  label: string;
}

export interface AdminSubscaleDef {
  key: string;
  label: string;
  scoreBands?: AdminScoreBand[];
}

export interface AdminDerivedScoreDef {
  key: string;
  label: string;
  formula: { subscale: string; weight: number }[];
  scoreBands?: AdminScoreBand[];
}

export interface AdminTestTemplate {
  id: string;
  slug: string;
  title: string;
  category: string;
  source: string;
  disclaimer: string;
  instructions: string;
  responseScale?: { value: number; label: string }[] | null;
  scoreBands?: AdminScoreBand[] | null;
  subscales?: AdminSubscaleDef[] | null;
  derivedScores?: AdminDerivedScoreDef[] | null;
  active: boolean;
  questions: AdminTestQuestion[];
}

export interface UpsertTestTemplateInput {
  slug: string;
  title: string;
  category: string;
  source: string;
  disclaimer: string;
  instructions: string;
  responseScale?: { value: number; label: string }[];
  scoreBands?: AdminScoreBand[];
  subscales?: AdminSubscaleDef[];
  derivedScores?: AdminDerivedScoreDef[];
  questions: AdminTestQuestionInput[];
}

export function listAdminTestTemplates() {
  return request<AdminTestTemplate[]>('/admin/tests');
}

export function createTestTemplate(data: UpsertTestTemplateInput) {
  return request<AdminTestTemplate>('/admin/tests', { method: 'POST', body: JSON.stringify(data) });
}

export function updateTestTemplate(id: string, data: UpsertTestTemplateInput) {
  return request<AdminTestTemplate>(`/admin/tests/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

export function setTestTemplateActive(id: string, active: boolean) {
  return request<AdminTestTemplate>(`/admin/tests/${id}/active`, { method: 'PATCH', body: JSON.stringify({ active }) });
}

export function deleteTestTemplate(id: string) {
  return request(`/admin/tests/${id}`, { method: 'DELETE' });
}

export interface AdminQuizOption {
  id: string;
  label: string;
}

export interface AdminQuizQuestion {
  id: string;
  order: number;
  prompt: string;
  options: AdminQuizOption[];
  correctOptionId: string;
}

export interface AdminCourseQuiz {
  id: string;
  required: boolean;
  passingScorePercent: number;
  questions: AdminQuizQuestion[];
}

export interface AdminCourseMaterial {
  id: string;
  title: string;
  filePath: string;
}

export interface AdminCourseLesson {
  id: string;
  order: number;
  title: string;
  description?: string | null;
  youtubeUrl?: string | null;
  isExtra: boolean;
  materials: AdminCourseMaterial[];
  quiz: AdminCourseQuiz | null;
}

export interface AdminCourseModule {
  id: string;
  order: number;
  title: string;
  free: boolean;
  lessons: AdminCourseLesson[];
}

export interface AdminCourse {
  id: string;
  slug: string;
  title: string;
  description: string;
  priceCents: number | null;
  active: boolean;
  modules: AdminCourseModule[];
}

export function listAdminCourses() {
  return request<AdminCourse[]>('/admin/courses');
}

export function createCourse(data: { slug: string; title: string; description: string; priceCents?: number }) {
  return request<AdminCourse>('/admin/courses', { method: 'POST', body: JSON.stringify(data) });
}

export function updateCourse(id: string, data: Partial<{ title: string; description: string; priceCents: number; active: boolean }>) {
  return request<AdminCourse>(`/admin/courses/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

export function deleteCourse(id: string) {
  return request(`/admin/courses/${id}`, { method: 'DELETE' });
}

export function createCourseModule(courseId: string, data: { order: number; title: string; free?: boolean }) {
  return request<AdminCourseModule>(`/admin/courses/${courseId}/modules`, { method: 'POST', body: JSON.stringify(data) });
}

export function updateCourseModule(id: string, data: Partial<{ order: number; title: string; free: boolean }>) {
  return request<AdminCourseModule>(`/admin/courses/modules/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

export function deleteCourseModule(id: string) {
  return request(`/admin/courses/modules/${id}`, { method: 'DELETE' });
}

export function createCourseLesson(
  moduleId: string,
  data: { order: number; title: string; description?: string; youtubeUrl?: string; isExtra?: boolean },
) {
  return request<AdminCourseLesson>(`/admin/courses/modules/${moduleId}/lessons`, { method: 'POST', body: JSON.stringify(data) });
}

export function updateCourseLesson(
  id: string,
  data: Partial<{ order: number; title: string; description: string; youtubeUrl: string; isExtra: boolean }>,
) {
  return request<AdminCourseLesson>(`/admin/courses/lessons/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

export function deleteCourseLesson(id: string) {
  return request(`/admin/courses/lessons/${id}`, { method: 'DELETE' });
}

export async function addCourseMaterial(lessonId: string, title: string, file: File) {
  const token = getAdminToken();
  const form = new FormData();
  form.append('title', title);
  form.append('file', file);
  const res = await fetch(`${API_URL}/admin/courses/lessons/${lessonId}/materials`, {
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

export function deleteCourseMaterial(id: string) {
  return request(`/admin/courses/materials/${id}`, { method: 'DELETE' });
}

export function upsertCourseQuiz(
  lessonId: string,
  data: { required: boolean; passingScorePercent: number; questions: { prompt: string; options: AdminQuizOption[]; correctOptionId: string }[] },
) {
  return request<AdminCourseQuiz>(`/admin/courses/lessons/${lessonId}/quiz`, { method: 'POST', body: JSON.stringify(data) });
}

export function deleteCourseQuiz(lessonId: string) {
  return request(`/admin/courses/lessons/${lessonId}/quiz`, { method: 'DELETE' });
}
