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
  tenant: { name: string; slug: string; publicPhone: string | null };
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
  tenant: { name: string; slug: string; publicPhone: string | null };
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

export interface AdminSiteComment {
  id: string;
  authorName: string;
  content: string;
  consentToPublish: boolean;
  publishedByProfessional: boolean;
  blockedByAdmin: boolean;
  blockedReason: string | null;
  createdAt: string;
  tenant: { name: string; slug: string };
}

/** Só o que o profissional já publicou de fato — ver AdminService.listSiteComments. */
export function listAdminSiteComments() {
  return request<AdminSiteComment[]>('/admin/site-comments');
}

export function blockSiteComment(id: string, reason: string) {
  return request<AdminSiteComment>(`/admin/site-comments/${id}/block`, { method: 'POST', body: JSON.stringify({ reason }) });
}

export function unblockSiteComment(id: string) {
  return request<AdminSiteComment>(`/admin/site-comments/${id}/unblock`, { method: 'POST' });
}

export interface PendingPresentationVideo {
  id: string;
  name: string;
  slug: string;
  presentationVideoUrl: string;
}

export function listPendingPresentationVideos() {
  return request<PendingPresentationVideo[]>('/admin/presentation-videos/pending');
}

export function approvePresentationVideo(tenantId: string) {
  return request(`/admin/presentation-videos/${tenantId}/approve`, { method: 'POST' });
}

export function rejectPresentationVideo(tenantId: string, reason: string) {
  return request(`/admin/presentation-videos/${tenantId}/reject`, { method: 'POST', body: JSON.stringify({ reason }) });
}

export function rejectCrp(userId: string, reason: string) {
  return request(`/admin/crp/${userId}/reject`, { method: 'POST', body: JSON.stringify({ reason }) });
}

export interface PendingStudentVerification {
  id: string;
  name: string;
  email: string;
  studentInstitution: string | null;
  studentEnrollmentNumber: string | null;
  studentVerificationNote: string | null;
  tenant: { name: string; slug: string; publicPhone: string | null };
}

export function listPendingStudentVerifications() {
  return request<PendingStudentVerification[]>('/admin/student-verifications/pending');
}

export async function downloadStudentDocument(userId: string, suggestedName: string) {
  const token = getAdminToken();
  const res = await fetch(`${API_URL}/admin/student-verifications/${userId}/document`, {
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

export function approveStudentVerification(userId: string) {
  return request(`/admin/student-verifications/${userId}/approve`, { method: 'POST' });
}

export function rejectStudentVerification(userId: string, reason: string) {
  return request(`/admin/student-verifications/${userId}/reject`, { method: 'POST', body: JSON.stringify({ reason }) });
}

export type DocumentTemplateAudience = 'STAFF' | 'ESTUDANTE';

export interface AdminDocumentTemplate {
  id: string;
  title: string;
  description: string;
  requiresAcceptance: boolean;
  audience: DocumentTemplateAudience;
  createdAt: string;
}

export function listAdminDocumentTemplates() {
  return request<AdminDocumentTemplate[]>('/admin/document-templates');
}

export async function createDocumentTemplate(
  title: string,
  description: string,
  requiresAcceptance: boolean,
  audience: DocumentTemplateAudience,
  file: File,
) {
  const token = getAdminToken();
  const form = new FormData();
  form.append('title', title);
  form.append('description', description);
  form.append('requiresAcceptance', String(requiresAcceptance));
  form.append('audience', audience);
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

export interface AdminDocumentAcceptance {
  acceptedAt: string;
  user: { name: string; email: string; tenant: { name: string; slug: string } };
}

export function listDocumentAcceptances(id: string) {
  return request<{ template: AdminDocumentTemplate; accepted: AdminDocumentAcceptance[]; totalTitulares: number }>(
    `/admin/document-templates/${id}/acceptances`,
  );
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
  /** null = usa o valor padrão de apps/api/src/billing/plans.ts. */
  subscriptionMonthlyPriceCents: number | null;
  subscriptionYearlyPriceCents: number | null;
}

export function getPlatformSettings() {
  return request<AdminPlatformSettings>('/admin/settings');
}

export function updatePlatformSettings(data: {
  colorPalette?: string;
  subscriptionMonthlyPriceCents?: number | null;
  subscriptionYearlyPriceCents?: number | null;
}) {
  return request<AdminPlatformSettings>('/admin/settings', { method: 'PATCH', body: JSON.stringify(data) });
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

export async function getCertificateTemplate() {
  const { template } = await request<{ template: AdminCertificateTemplate | null }>('/admin/certificate-template');
  return template;
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

export interface AdminIssuedCertificate {
  id: string;
  issuedAt: string;
  verificationCode: string;
  courseSlug: string;
  course: { title: string };
  tenant: { name: string; slug: string };
  user: { name: string } | null;
  patient: { name: string } | null;
}

export function listIssuedCertificates() {
  return request<AdminIssuedCertificate[]>('/admin/certificates');
}

export async function downloadIssuedCertificate(id: string, suggestedName: string) {
  const token = getAdminToken();
  const res = await fetch(`${API_URL}/admin/certificates/${id}/download`, {
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

export type CourseAudience = 'ESTUDANTES' | 'PROFISSIONAIS_GRATIS' | 'PROFISSIONAIS_PAGO';

export interface AdminCourse {
  id: string;
  slug: string;
  title: string;
  description: string;
  priceCents: number | null;
  audience: CourseAudience;
  active: boolean;
  modules: AdminCourseModule[];
}

export function listAdminCourses() {
  return request<AdminCourse[]>('/admin/courses');
}

export function createCourse(data: { slug: string; title: string; description: string; priceCents?: number; audience?: CourseAudience }) {
  return request<AdminCourse>('/admin/courses', { method: 'POST', body: JSON.stringify(data) });
}

export function updateCourse(
  id: string,
  data: Partial<{ title: string; description: string; priceCents: number; audience: CourseAudience; active: boolean }>,
) {
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

export interface AdminProntuarioPatient {
  id: string;
  name: string;
  socialName?: string | null;
  email?: string | null;
  active: boolean;
}

export interface AdminProntuarioTenantPatients {
  tenant: { id: string; name: string; slug: string };
  patients: AdminProntuarioPatient[];
}

/** Exigência do CRP: buscar o(s) paciente(s) de uma clínica pelo slug, pra depois exportar o prontuário. */
export function listPatientsByTenantSlug(slug: string) {
  return request<AdminProntuarioTenantPatients>(`/admin/prontuario/tenants/${encodeURIComponent(slug)}/patients`);
}

export interface AdminProntuarioEntry {
  content: string;
  createdAt: string;
  author: { name: string; role: string };
}

export interface AdminProntuarioPatientDetail {
  patient: {
    name: string;
    socialName?: string | null;
    cpfCnpj?: string | null;
    birthDate?: string | null;
    email?: string | null;
    tenant: { name: string; slug: string };
  };
  entries: AdminProntuarioEntry[];
}

export function getPatientProntuario(patientId: string) {
  return request<AdminProntuarioPatientDetail>(`/admin/prontuario/patients/${patientId}`);
}

/** PDF não editável — exportação oficial do prontuário (nunca inclui a anotação privada do psicólogo). */
export async function downloadProntuarioPdf(patientId: string, suggestedName: string) {
  const token = getAdminToken();
  const res = await fetch(`${API_URL}/admin/prontuario/patients/${patientId}/pdf`, {
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

export interface AdminRevenueSummary {
  subscriptionsByStatus: { status: string; count: number }[];
  activeSubscriptionsCount: number;
  complimentaryActiveCount: number;
  mrrCents: number;
  subscriptionsMissingAsaasData: number;
  patientInvoices: {
    totalPaidCents: number;
    paidCount: number;
    platformFeePercent: number;
    platformFeeCents: number;
  };
  marketplace: {
    totalCents: number;
    count: number;
  };
}

export function getRevenueSummary() {
  return request<AdminRevenueSummary>('/admin/revenue-summary');
}

export type PlanCondition = 'sem_assinatura' | 'inativa' | 'cortesia_piloto' | 'premium_pago';

export interface AdminTenantOverview {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  published: boolean;
  email: string | null;
  phone: string | null;
  crpStatus: 'NAO_ENVIADO' | 'EM_ANALISE' | 'VERIFICADO' | 'REJEITADO' | null;
  planCondition: PlanCondition;
  usage: {
    perfil: boolean;
    paciente: boolean;
    agenda: boolean;
    financeiro: boolean;
    teleconsulta: boolean;
  };
}

export interface AdminUsersOverview {
  summary: {
    total: number;
    byCrpStatus: Record<string, number>;
    byPlanCondition: Record<string, number>;
    published: number;
    usageMilestones: {
      perfil: number;
      paciente: number;
      agenda: number;
      financeiro: number;
      teleconsulta: number;
    };
  };
  tenants: AdminTenantOverview[];
}

export function getUsersOverview() {
  return request<AdminUsersOverview>('/admin/users-overview');
}

export type CampaignLeadStatus = 'NOVO' | 'CONTATADO' | 'CONVERTIDO' | 'DESCARTADO';

export interface AdminCampaignLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  consentedAt: string;
  status: CampaignLeadStatus;
  convertedTenantId: string | null;
  notes: string | null;
  createdAt: string;
}

/** Programa Piloto (100 psicólogos, 3 meses grátis) — ver CampaignLead no schema, nível de plataforma. */
export function listCampaignLeads() {
  return request<AdminCampaignLead[]>('/admin/campaign-leads');
}

export function updateCampaignLead(id: string, data: { status?: CampaignLeadStatus; notes?: string }) {
  return request<AdminCampaignLead>(`/admin/campaign-leads/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

/** `tenantSlug` precisa já existir (a pessoa se cadastra em /signup antes) — ver AdminService.grantComplimentaryTrial. */
export function grantComplimentaryTrial(id: string, tenantSlug: string) {
  return request<AdminCampaignLead>(`/admin/campaign-leads/${id}/grant-trial`, {
    method: 'POST',
    body: JSON.stringify({ tenantSlug }),
  });
}

/** Remoção manual e definitiva — não tem volta, ver AdminService.deleteCampaignLead. */
export function deleteCampaignLead(id: string) {
  return request<{ deleted: true }>(`/admin/campaign-leads/${id}`, { method: 'DELETE' });
}

export interface CampaignLeadActivation {
  perfil: boolean;
  paciente: boolean;
  agenda: boolean;
  financeiro: boolean;
  teleconsulta: boolean;
  score: number;
}

/** Só retorna algo pra lead CONVERTIDO (com tenant vinculado) — ver AdminService.getCampaignLeadActivation. */
export function getCampaignLeadActivation(id: string) {
  return request<CampaignLeadActivation | null>(`/admin/campaign-leads/${id}/activation`);
}

export interface AdminTenantSearchResult {
  id: string;
  name: string;
  slug: string;
}

/** Busca por nome ou slug pra usar no grant-trial em vez de digitar o slug de cabeça. */
export function searchTenants(q: string) {
  return request<AdminTenantSearchResult[]>(`/admin/tenants/search?q=${encodeURIComponent(q)}`);
}
