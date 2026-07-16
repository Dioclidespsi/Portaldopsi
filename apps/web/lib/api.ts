const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';
const TOKEN_KEY = 'portal-do-psi:token';

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

/** Decodifica o payload do JWT no cliente — não é segredo, só evita mais uma chamada de rede pra saber o tipo de conta. */
export function getTenantKind(): 'CLINICA' | 'ESTUDANTE' | null {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.tenantKind ?? null;
  } catch {
    return null;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
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

export function signup(data: { clinicName: string; slug: string; name: string; email: string; password: string }) {
  return request<{ accessToken: string }>('/auth/signup', { method: 'POST', body: JSON.stringify(data) });
}

export function login(data: { slug: string; email: string; password: string }) {
  return request<{ accessToken: string }>('/auth/login', { method: 'POST', body: JSON.stringify(data) });
}

export interface Me {
  id: string;
  name: string;
  email: string;
  role: string;
  tenantId: string;
  createdAt: string;
  crpNumber?: string | null;
  crpStatus: 'NAO_ENVIADO' | 'EM_ANALISE' | 'VERIFICADO' | 'REJEITADO';
  crpRejectionReason?: string | null;
}

export function fetchMe() {
  return request<Me>('/me');
}

export interface Patient {
  id: string;
  name: string;
  socialName?: string;
  email?: string;
  phone?: string;
  cpfCnpj?: string;
  active: boolean;
}

export function listPatients(active?: boolean) {
  const qs = active === undefined ? '' : `?active=${active}`;
  return request<Patient[]>(`/patients${qs}`);
}

export function createPatient(data: { name: string; socialName?: string; email?: string; phone?: string; cpfCnpj?: string }) {
  return request<Patient>('/patients', { method: 'POST', body: JSON.stringify(data) });
}

export function setPatientActive(id: string, active: boolean) {
  return request<Patient>(`/patients/${id}/active`, { method: 'PATCH', body: JSON.stringify({ active }) });
}

export interface Appointment {
  id: string;
  startsAt: string;
  endsAt: string;
  status: string;
  patient: { name: string };
  videoRoomUrl?: string | null;
  consentAt?: string | null;
  cancelReason?: string | null;
}

export function listAppointments(params?: { from?: string; to?: string; patientId?: string }) {
  const qs = new URLSearchParams();
  if (params?.from) qs.set('from', params.from);
  if (params?.to) qs.set('to', params.to);
  if (params?.patientId) qs.set('patientId', params.patientId);
  const suffix = qs.toString() ? `?${qs.toString()}` : '';
  return request<Appointment[]>(`/appointments${suffix}`);
}

export function createAppointment(data: { patientId: string; startsAt: string; endsAt: string }) {
  return request<Appointment>('/appointments', { method: 'POST', body: JSON.stringify(data) });
}

export function updateAppointmentStatus(id: string, status: string, cancelReason?: string) {
  return request<Appointment>(`/appointments/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status, cancelReason }),
  });
}

export interface AvailabilitySlot {
  id: string;
  startsAt: string;
  endsAt: string;
  status: string;
  heldUntil?: string | null;
}

export function listAvailability() {
  return request<AvailabilitySlot[]>('/availability');
}

export function createAvailabilitySlot(data: { startsAt: string; endsAt: string }) {
  return request<AvailabilitySlot>('/availability', { method: 'POST', body: JSON.stringify(data) });
}

export function deleteAvailabilitySlot(id: string) {
  return request(`/availability/${id}`, { method: 'DELETE' });
}

export interface Invoice {
  id: string;
  amountCents: number;
  dueDate: string;
  status: string;
  paidAt?: string | null;
  patient: { name: string };
  appointmentId?: string | null;
  appointment?: { startsAt: string } | null;
  asaasPaymentId?: string | null;
  paymentLink?: string | null;
}

export function listInvoices(params?: { status?: string; from?: string; to?: string; patientId?: string }) {
  const qs = new URLSearchParams();
  if (params?.status) qs.set('status', params.status);
  if (params?.from) qs.set('from', params.from);
  if (params?.to) qs.set('to', params.to);
  if (params?.patientId) qs.set('patientId', params.patientId);
  const suffix = qs.toString() ? `?${qs.toString()}` : '';
  return request<Invoice[]>(`/invoices${suffix}`);
}

export interface InvoiceSummary {
  receivedThisMonthCents: number;
  pendingCents: number;
  overdueCents: number;
}

export function fetchInvoiceSummary() {
  return request<InvoiceSummary>('/invoices/summary');
}

export function createInvoice(data: { patientId: string; amountCents: number; dueDate: string; appointmentId?: string }) {
  return request<Invoice>('/invoices', { method: 'POST', body: JSON.stringify(data) });
}

export function updateInvoiceStatus(id: string, status: string) {
  return request<Invoice>(`/invoices/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
}

export function chargeInvoiceViaAsaas(id: string) {
  return request<Invoice>(`/invoices/${id}/charge`, { method: 'POST' });
}

export function createPayoutAccount(data: { name: string; email: string; cpfCnpj: string; mobilePhone: string }) {
  return request<{ payoutProvider: string; payoutAccountId: string }>('/asaas/payout-account', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export interface Profile {
  name: string;
  slug: string;
  bio?: string | null;
  attendanceInfo?: string | null;
  photoUrl?: string | null;
  specialties?: string | null;
  publicEmail?: string | null;
  publicPhone?: string | null;
  colorPalette: string;
  published: boolean;
  payoutProvider?: string | null;
  payoutAccountId?: string | null;
  sessionPriceCents?: number | null;
  bookingEnabled: boolean;
  listedInDirectory: boolean;
}

export function fetchOwnProfile() {
  return request<Profile>('/profile');
}

export function updateProfile(
  data: Partial<
    Pick<
      Profile,
      | 'bio'
      | 'attendanceInfo'
      | 'photoUrl'
      | 'specialties'
      | 'publicEmail'
      | 'publicPhone'
      | 'published'
      | 'colorPalette'
      | 'sessionPriceCents'
      | 'bookingEnabled'
      | 'listedInDirectory'
    >
  >,
) {
  return request<Profile>('/profile', { method: 'PATCH', body: JSON.stringify(data) });
}

export async function uploadProfilePhoto(file: File) {
  const token = getToken();
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_URL}/profile/photo`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as { message?: string });
    throw new Error(body.message ?? `Erro ${res.status}`);
  }
  return res.json() as Promise<Profile>;
}

export type PublicProfile = Omit<Profile, 'published'> & { crpVerified: boolean };

/** Chamada de Server Component (sem token, sem localStorage) — não passa por request(). */
export async function fetchPublicProfile(slug: string): Promise<PublicProfile | null> {
  const res = await fetch(`${API_URL}/public/tenants/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export interface PublicBanner {
  id: string;
  position: number;
  imageUrl: string;
  linkUrl?: string | null;
}

/** Banners da home da plataforma (configurados em /admin/banners) — usado em app/page.tsx. */
export async function fetchPublicBanners(): Promise<PublicBanner[]> {
  const res = await fetch(`${API_URL}/public/banners`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export interface DirectoryResult {
  slug: string;
  name: string;
  photoUrl?: string | null;
  specialties?: string | null;
  bio?: string | null;
  colorPalette: string;
}

/** Busca pública de profissionais (só aparece quem ativou "listedInDirectory") — usado em app/profissionais/page.tsx. */
export async function searchDirectory(params: { q?: string; specialty?: string }): Promise<DirectoryResult[]> {
  const qs = new URLSearchParams();
  if (params.q) qs.set('q', params.q);
  if (params.specialty) qs.set('specialty', params.specialty);
  const suffix = qs.toString() ? `?${qs.toString()}` : '';
  const res = await fetch(`${API_URL}/public/directory${suffix}`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

/** Formulário de contato da página pública — vira Lead automaticamente no CRM do profissional. */
export async function submitPublicLead(slug: string, data: { name: string; contact: string; message?: string }) {
  const res = await fetch(`${API_URL}/public/tenants/${slug}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as { message?: string });
    throw new Error(body.message ?? `Erro ${res.status}`);
  }
  return res.json();
}

export interface PublicSlot {
  id: string;
  startsAt: string;
  endsAt: string;
}

/** Agendamento público — só retorna algo além de slots vazios se o profissional ligou bookingEnabled e definiu sessionPriceCents. */
export async function fetchPublicAvailability(slug: string): Promise<{ sessionPriceCents: number | null; slots: PublicSlot[] }> {
  const res = await fetch(`${API_URL}/public/tenants/${slug}/availability`, { cache: 'no-store' });
  if (!res.ok) return { sessionPriceCents: null, slots: [] };
  return res.json();
}

export interface PublicBookingResult {
  appointmentId: string;
  holdExpiresAt: string;
  paymentLink: string;
}

/** Reserva o horário por 15min e gera o link de pagamento via Asaas (split pro profissional). */
export async function submitPublicBooking(
  slug: string,
  data: { slotId: string; name: string; email: string; phone: string; cpfCnpj: string },
) {
  const res = await fetch(`${API_URL}/public/tenants/${slug}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as { message?: string });
    throw new Error(body.message ?? `Erro ${res.status}`);
  }
  return res.json() as Promise<PublicBookingResult>;
}

export interface TestQuestion {
  id: string;
  order: number;
  type: 'objetiva' | 'subjetiva';
  prompt: string;
  reverseScored?: boolean;
  options?: { value: number; label: string }[] | null;
  subscale?: string | null;
}

export interface ScoreBand {
  maxScore: number;
  label: string;
}

export interface SubscaleDef {
  key: string;
  label: string;
  scoreBands?: ScoreBand[] | null;
}

export interface DerivedScoreDef {
  key: string;
  label: string;
  formula: { subscale: string; weight: number }[];
  scoreBands?: ScoreBand[] | null;
}

export interface NamedScoreResult {
  key: string;
  label: string;
  score: number;
  resultLabel: string | null;
}

export interface TestTemplate {
  id: string;
  slug: string;
  title: string;
  category: string;
  source: string;
  disclaimer: string;
  instructions: string;
  responseScale?: { value: number; label: string }[] | null;
  scoreBands?: ScoreBand[] | null;
  subscales?: SubscaleDef[] | null;
  derivedScores?: DerivedScoreDef[] | null;
  active: boolean;
  questions: TestQuestion[];
}

export interface TestAssignment {
  id: string;
  patientId: string;
  testTemplateId: string;
  assignedAt: string;
  status: 'pendente' | 'respondido' | 'corrigido';
  answers?: Record<string, number | string> | null;
  submittedAt?: string | null;
  suggestedScore?: number | null;
  suggestedResultLabel?: string | null;
  suggestedSubscaleScores?: NamedScoreResult[] | null;
  suggestedDerivedScores?: NamedScoreResult[] | null;
  finalScore?: number | null;
  finalResultLabel?: string | null;
  communicationNote?: string | null;
  correctedAt?: string | null;
  attachedToProntuario: boolean;
  prontuarioEntryId?: string | null;
  testTemplate: TestTemplate;
}

export function listTestCatalog() {
  return request<TestTemplate[]>('/psych-tests/catalog');
}

export function assignTest(patientId: string, testTemplateId: string) {
  return request<TestAssignment>('/psych-tests/assign', {
    method: 'POST',
    body: JSON.stringify({ patientId, testTemplateId }),
  });
}

export function listTestAssignments(patientId: string) {
  return request<TestAssignment[]>(`/psych-tests/assignments?patientId=${encodeURIComponent(patientId)}`);
}

export function getTestAssignment(id: string) {
  return request<TestAssignment>(`/psych-tests/assignments/${id}`);
}

export function correctTestAssignment(id: string, data: { finalScore?: number; finalResultLabel?: string; communicationNote?: string }) {
  return request<TestAssignment>(`/psych-tests/assignments/${id}/correct`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function attachTestToProntuario(id: string) {
  return request<TestAssignment>(`/psych-tests/assignments/${id}/attach-prontuario`, { method: 'POST' });
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  /** Só relevante quando role=SUPERVISOR — null pra qualquer outro papel. */
  supervisorApprovalStatus?: 'PENDENTE' | 'APROVADO' | 'REJEITADO' | null;
}

export function listTeamMembers() {
  return request<TeamMember[]>('/users');
}

export function createTeamMember(data: { name: string; email: string; password: string; role: 'SECRETARIA' | 'SUPERVISOR' }) {
  return request<TeamMember>('/users', { method: 'POST', body: JSON.stringify(data) });
}

export interface CourseQuizSummary {
  id: string;
  required: boolean;
  passingScorePercent: number;
  questionCount: number;
  bestScorePercent: number | null;
  passed: boolean;
  attemptCount: number;
}

export interface CourseLessonView {
  id: string;
  order: number;
  title: string;
  description?: string | null;
  youtubeUrl?: string | null;
  isExtra: boolean;
  completed: boolean;
  locked: boolean;
  materials: { id: string; title: string }[];
  quiz: CourseQuizSummary | null;
}

export interface CourseModuleView {
  id: string;
  order: number;
  title: string;
  free: boolean;
  locked: boolean;
  lessons: CourseLessonView[];
}

export interface CourseView {
  id: string;
  slug: string;
  title: string;
  description: string;
  priceCents: number | null;
  modules: CourseModuleView[];
}

export function listCourseCatalog() {
  return request<CourseView[]>('/courses');
}

export function markLessonComplete(lessonId: string) {
  return request<{ completed: boolean }>(`/courses/lessons/${lessonId}/complete`, { method: 'POST' });
}

/** Download autenticado: precisa do header Authorization, então não dá para usar um <a href> puro. */
export async function downloadCourseMaterial(materialId: string, suggestedName: string) {
  const token = getToken();
  const res = await fetch(`${API_URL}/courses/materials/${materialId}/download`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error(`Erro ${res.status} ao baixar arquivo.`);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = suggestedName;
  a.click();
  URL.revokeObjectURL(url);
}

export interface QuizOption {
  id: string;
  label: string;
}

export interface QuizQuestionForStudent {
  id: string;
  prompt: string;
  options: QuizOption[];
}

export interface QuizAttemptSummary {
  id: string;
  scorePercent: number;
  passed: boolean;
  createdAt: string;
}

export interface QuizForStudent {
  id: string;
  required: boolean;
  passingScorePercent: number;
  questions: QuizQuestionForStudent[];
  attempts: QuizAttemptSummary[];
}

export function getLessonQuiz(lessonId: string) {
  return request<QuizForStudent>(`/courses/lessons/${lessonId}/quiz`);
}

export function submitQuizAttempt(lessonId: string, answers: Record<string, string>) {
  return request<{ scorePercent: number; passed: boolean; correctCount: number; totalCount: number }>(
    `/courses/lessons/${lessonId}/quiz/attempts`,
    { method: 'POST', body: JSON.stringify({ answers }) },
  );
}

export interface CertificateRecord {
  id: string;
  courseSlug: string;
  course: { title: string };
  verificationCode: string;
  issuedAt: string;
}

export function listMyCertificates() {
  return request<CertificateRecord[]>('/certificates');
}

export async function downloadCertificate(id: string, suggestedName: string) {
  const token = getToken();
  const res = await fetch(`${API_URL}/certificates/${id}/download`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
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

export interface CertificateVerification {
  holderName: string;
  clinicName: string;
  courseTitle: string;
  issuedAt: string;
  verificationCode: string;
}

export async function verifyCertificate(code: string): Promise<CertificateVerification | null> {
  const res = await fetch(`${API_URL}/certificates/verify/${code}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export interface LibraryMaterial {
  id: string;
  category: string;
  title: string;
  description?: string | null;
  createdAt: string;
}

export function listLibrary() {
  return request<LibraryMaterial[]>('/library');
}

export async function downloadLibraryMaterial(id: string, suggestedName: string) {
  const token = getToken();
  const res = await fetch(`${API_URL}/library/${id}/download`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
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

export interface SupervisionSession {
  id: string;
  supervisorId: string;
  superviseeId: string;
  startsAt: string;
  endsAt: string;
  status: string;
  notes?: string | null;
  supervisor: { name: string };
  supervisee: { name: string };
  videoRoomUrl?: string | null;
  videoRoomName?: string | null;
}

export function listSupervisionSessions() {
  return request<SupervisionSession[]>('/supervision-sessions');
}

export function createSupervisionTeleconsultaRoom(sessionId: string) {
  return request<SupervisionSession>(`/supervision-sessions/${sessionId}/teleconsulta/room`, { method: 'POST' });
}

export interface SupervisionMessage {
  id: string;
  content: string;
  createdAt: string;
  sender: { id: string; name: string };
}

export function listSupervisionMessages(partnerId: string) {
  return request<SupervisionMessage[]>(`/supervision-sessions/messages/${partnerId}`);
}

export function sendSupervisionMessage(partnerId: string, content: string) {
  return request<SupervisionMessage>(`/supervision-sessions/messages/${partnerId}`, { method: 'POST', body: JSON.stringify({ content }) });
}

export function createSupervisionSession(data: { supervisorId: string; startsAt: string; endsAt: string }) {
  return request<SupervisionSession>('/supervision-sessions', { method: 'POST', body: JSON.stringify(data) });
}

export function updateSupervisionSession(id: string, data: { status?: string; notes?: string }) {
  return request<SupervisionSession>(`/supervision-sessions/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

export interface MarketplaceCourse {
  slug: string;
  title: string;
  description: string;
  priceCents: number | null;
  modules: { order: number; title: string; free: boolean; lessonCount: number }[];
}

/** Chamada pública (vitrine) — sem token, funciona sem estar logado. */
export async function listMarketplaceCourses(): Promise<MarketplaceCourse[]> {
  const res = await fetch(`${API_URL}/marketplace/courses`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Não foi possível carregar o catálogo.');
  return res.json();
}

export interface Lead {
  id: string;
  name: string;
  contact?: string | null;
  source?: string | null;
  stage: string;
  notes?: string | null;
  assignedToId?: string | null;
  assignedTo?: { id: string; name: string } | null;
  convertedPatientId?: string | null;
  createdAt: string;
}

export function listLeads(filters?: { search?: string; stage?: string }) {
  const params = new URLSearchParams();
  if (filters?.search) params.set('search', filters.search);
  if (filters?.stage) params.set('stage', filters.stage);
  const qs = params.toString();
  return request<Lead[]>(`/leads${qs ? `?${qs}` : ''}`);
}

export function createLead(data: { name: string; contact?: string; source?: string }) {
  return request<Lead>('/leads', { method: 'POST', body: JSON.stringify(data) });
}

export function updateLead(id: string, data: { name?: string; contact?: string; source?: string; stage?: string; notes?: string; assignedToId?: string | null }) {
  return request<Lead>(`/leads/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

export function deleteLead(id: string) {
  return request(`/leads/${id}`, { method: 'DELETE' });
}

export interface LeadActivity {
  id: string;
  content: string;
  createdAt: string;
  author: { id: string; name: string };
}

export function listLeadActivities(leadId: string) {
  return request<LeadActivity[]>(`/leads/${leadId}/activities`);
}

export function addLeadActivity(leadId: string, content: string) {
  return request<LeadActivity>(`/leads/${leadId}/activities`, { method: 'POST', body: JSON.stringify({ content }) });
}

export interface LeadFunnelReport {
  total: number;
  countByStage: Record<string, number>;
  conversionRate: number;
  staleCount: number;
  staleDaysThreshold: number;
}

export function getLeadFunnelReport() {
  return request<LeadFunnelReport>('/leads/report');
}

export function convertLead(id: string) {
  return request<{ patient: Patient; matchedExisting: boolean }>(`/leads/${id}/convert`, { method: 'POST' });
}

export type CommunityCategory = 'INDICACAO' | 'CASO_CLINICO' | 'GESTAO_CONSULTORIO' | 'ABORDAGENS_TECNICAS' | 'CARREIRA_FORMACAO' | 'GERAL';

export const COMMUNITY_CATEGORY_LABEL: Record<CommunityCategory, string> = {
  INDICACAO: 'Indicação/Encaminhamento',
  CASO_CLINICO: 'Caso Clínico',
  GESTAO_CONSULTORIO: 'Gestão de Consultório',
  ABORDAGENS_TECNICAS: 'Abordagens e Técnicas',
  CARREIRA_FORMACAO: 'Carreira e Formação',
  GERAL: 'Geral',
};

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  category: CommunityCategory;
  createdAt: string;
  authorName: string;
  tenantName: string;
  authorCrpVerified: boolean;
  authorSpecialty?: string | null;
  likedByMe: boolean;
  _count?: { replies: number; likes: number };
}

export interface CommunityReply {
  id: string;
  content: string;
  createdAt: string;
  authorName: string;
  tenantName: string;
  authorCrpVerified: boolean;
  authorSpecialty?: string | null;
  likedByMe: boolean;
  _count?: { likes: number };
}

export interface CommunityPostDetail extends CommunityPost {
  replies: CommunityReply[];
}

export interface CommunityPostList {
  posts: CommunityPost[];
  total: number;
  page: number;
  take: number;
}

export function listCommunityPosts(filters?: { category?: CommunityCategory; search?: string; page?: number }) {
  const params = new URLSearchParams();
  if (filters?.category) params.set('category', filters.category);
  if (filters?.search) params.set('search', filters.search);
  if (filters?.page) params.set('page', String(filters.page));
  const qs = params.toString();
  return request<CommunityPostList>(`/community/posts${qs ? `?${qs}` : ''}`);
}

export function createCommunityPost(data: { title: string; content: string; category: CommunityCategory }) {
  return request<CommunityPost>('/community/posts', { method: 'POST', body: JSON.stringify(data) });
}

export function getCommunityPost(id: string) {
  return request<CommunityPostDetail>(`/community/posts/${id}`);
}

export function replyToCommunityPost(id: string, content: string) {
  return request<CommunityReply>(`/community/posts/${id}/replies`, { method: 'POST', body: JSON.stringify({ content }) });
}

export function toggleCommunityPostLike(id: string) {
  return request<{ liked: boolean; count: number }>(`/community/posts/${id}/like`, { method: 'POST' });
}

export function toggleCommunityReplyLike(id: string) {
  return request<{ liked: boolean; count: number }>(`/community/replies/${id}/like`, { method: 'POST' });
}

export function reportCommunityPost(id: string, reason: string) {
  return request(`/community/posts/${id}/report`, { method: 'POST', body: JSON.stringify({ reason }) });
}

export function reportCommunityReply(id: string, reason: string) {
  return request(`/community/replies/${id}/report`, { method: 'POST', body: JSON.stringify({ reason }) });
}

export interface CommunityNotification {
  id: string;
  postId: string;
  replyId?: string | null;
  message: string;
  readAt?: string | null;
  createdAt: string;
}

export function listCommunityNotifications() {
  return request<CommunityNotification[]>('/community/notifications');
}

export function markCommunityNotificationRead(id: string) {
  return request<CommunityNotification>(`/community/notifications/${id}/read`, { method: 'POST' });
}

export function markAllCommunityNotificationsRead() {
  return request('/community/notifications/read-all', { method: 'POST' });
}

export interface PatientDetail extends Patient {
  portalEnabled: boolean;
  birthDate?: string | null;
}

export function getPatient(id: string) {
  return request<PatientDetail>(`/patients/${id}`);
}

export interface ProntuarioEntry {
  id: string;
  content: string;
  createdAt: string;
  author: { name: string; role: string };
}

export function listProntuario(patientId: string) {
  return request<ProntuarioEntry[]>(`/patients/${patientId}/prontuario`);
}

export function addProntuarioEntry(patientId: string, content: string) {
  return request<ProntuarioEntry>(`/patients/${patientId}/prontuario`, { method: 'POST', body: JSON.stringify({ content }) });
}

export function enablePatientPortal(patientId: string, password: string) {
  return request<PatientDetail>(`/patients/${patientId}/portal`, { method: 'PATCH', body: JSON.stringify({ password }) });
}

/** Alternativa a enablePatientPortal: gera um token pro próprio paciente definir a senha (ver /paciente/ativar). */
export function generatePatientActivationLink(patientId: string) {
  return request<{ activationToken: string }>(`/patients/${patientId}/activation-link`, { method: 'POST' });
}

export function summarizeProntuarioWithAi(patientId: string) {
  return request<{ summary: string }>(`/ai/prontuario/${patientId}/summarize`, { method: 'POST' });
}

export interface AiChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

export function askAiAssistant(question: string, history?: AiChatTurn[]) {
  return request<{ answer: string }>('/ai/ask', { method: 'POST', body: JSON.stringify({ question, history }) });
}

export interface AiUsage {
  used: number;
  limit: number;
}

export function getAiUsage() {
  return request<AiUsage>('/ai/usage');
}

export function listPatientAppointments(patientId: string) {
  return request<Appointment[]>(`/appointments?patientId=${encodeURIComponent(patientId)}`);
}

export function createTeleconsultaRoom(appointmentId: string) {
  return request<Appointment & { videoRoomUrl: string }>(`/appointments/${appointmentId}/teleconsulta/room`, { method: 'POST' });
}

export interface Homework {
  id: string;
  title: string;
  instructions: string;
  status: 'pendente' | 'concluido';
  dueDate?: string | null;
  patientNote?: string | null;
  completedAt?: string | null;
  createdAt: string;
}

export function listHomeworkForPatient(patientId: string) {
  return request<Homework[]>(`/homework?patientId=${encodeURIComponent(patientId)}`);
}

export function createHomework(data: { patientId: string; title: string; instructions: string; dueDate?: string }) {
  return request<Homework>('/homework', { method: 'POST', body: JSON.stringify(data) });
}

export function deleteHomework(id: string) {
  return request(`/homework/${id}`, { method: 'DELETE' });
}

export function suggestLeadFollowUpMessage(leadId: string) {
  return request<{ message: string }>(`/leads/${leadId}/suggest-message`, { method: 'POST' });
}

export type PlanKey = 'MONTHLY' | 'YEARLY';

export interface Plan {
  cycle: 'MONTHLY' | 'YEARLY';
  valueCents: number;
  label: string;
}

export function listPlans() {
  return request<Record<PlanKey, Plan>>('/billing/plans');
}

/** Mesma rota de listPlans(), mas via fetch puro (sem localStorage) — segura pra chamar de Server Component, igual fetchPublicBanners/fetchPublicProfile. */
export async function fetchPublicPlans(): Promise<Record<PlanKey, Plan> | null> {
  const res = await fetch(`${API_URL}/billing/plans`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export interface PlatformSettings {
  colorPalette: string;
}

/** Paleta de cores da plataforma em si (home, logins, loja) — escolhida pelo admin, diferente da paleta individual de cada psicólogo. Usada em app/layout.tsx. */
export async function fetchPlatformSettings(): Promise<PlatformSettings> {
  const res = await fetch(`${API_URL}/public/settings`, { cache: 'no-store' });
  if (!res.ok) return { colorPalette: 'salvia' };
  return res.json();
}

export interface SubscriptionInfo {
  status: 'TRIALING' | 'ACTIVE' | 'PAST_DUE' | 'CANCELED';
  currentPeriodEnd?: string | null;
  hasStripe: boolean;
  hasAsaas: boolean;
}

export function fetchSubscription() {
  return request<SubscriptionInfo>('/billing/subscription');
}

export function createStripeCheckout(plan: PlanKey, successUrl: string, cancelUrl: string) {
  return request<{ checkoutUrl: string | null }>('/billing/checkout', {
    method: 'POST',
    body: JSON.stringify({ plan, successUrl, cancelUrl }),
  });
}

export function createAsaasCheckout(data: { name: string; cpfCnpj: string; email: string; plan: PlanKey }) {
  return request<{ asaasSubscriptionId: string }>('/billing/checkout-asaas', { method: 'POST', body: JSON.stringify(data) });
}

export async function submitCrp(crpNumber: string, document: File) {
  const token = getToken();
  const form = new FormData();
  form.append('crpNumber', crpNumber);
  form.append('document', document);
  const res = await fetch(`${API_URL}/users/me/crp`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as { message?: string });
    throw new Error(body.message ?? `Erro ${res.status}`);
  }
  return res.json();
}

export interface DocumentTemplate {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export function listDocumentTemplates() {
  return request<DocumentTemplate[]>('/document-templates');
}

export async function downloadDocumentTemplate(id: string, suggestedName: string) {
  const token = getToken();
  const res = await fetch(`${API_URL}/document-templates/${id}/download`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
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

export function purchaseCourse(data: {
  name: string;
  slug: string;
  email: string;
  password: string;
  courseSlug: string;
  provider: 'STRIPE' | 'ASAAS';
  cpfCnpj?: string;
  successUrl?: string;
  cancelUrl?: string;
}) {
  return request<{ accessToken: string; checkoutUrl?: string; paymentLink?: string }>('/marketplace/purchase', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function enrollInCourse(data: {
  courseSlug: string;
  provider: 'STRIPE' | 'ASAAS';
  cpfCnpj?: string;
  successUrl?: string;
  cancelUrl?: string;
}) {
  return request<{ checkoutUrl?: string; paymentLink?: string }>('/marketplace/enroll', { method: 'POST', body: JSON.stringify(data) });
}
