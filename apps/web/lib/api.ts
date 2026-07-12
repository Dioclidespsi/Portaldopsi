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
  email?: string;
  phone?: string;
  cpfCnpj?: string;
}

export function listPatients() {
  return request<Patient[]>('/patients');
}

export function createPatient(data: { name: string; email?: string; phone?: string; cpfCnpj?: string }) {
  return request<Patient>('/patients', { method: 'POST', body: JSON.stringify(data) });
}

export interface Appointment {
  id: string;
  startsAt: string;
  endsAt: string;
  status: string;
  patient: { name: string };
  videoRoomUrl?: string | null;
  consentAt?: string | null;
}

export function listAppointments() {
  return request<Appointment[]>('/appointments');
}

export function createAppointment(data: { patientId: string; startsAt: string; endsAt: string }) {
  return request<Appointment>('/appointments', { method: 'POST', body: JSON.stringify(data) });
}

export function updateAppointmentStatus(id: string, status: string) {
  return request<Appointment>(`/appointments/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
}

export interface Invoice {
  id: string;
  amountCents: number;
  dueDate: string;
  status: string;
  patient: { name: string };
  asaasPaymentId?: string | null;
  paymentLink?: string | null;
}

export function listInvoices() {
  return request<Invoice[]>('/invoices');
}

export function createInvoice(data: { patientId: string; amountCents: number; dueDate: string }) {
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
  photoUrl?: string | null;
  specialties?: string | null;
  publicEmail?: string | null;
  publicPhone?: string | null;
  published: boolean;
  payoutProvider?: string | null;
  payoutAccountId?: string | null;
}

export function fetchOwnProfile() {
  return request<Profile>('/profile');
}

export function updateProfile(data: Partial<Pick<Profile, 'bio' | 'photoUrl' | 'specialties' | 'publicEmail' | 'publicPhone' | 'published'>>) {
  return request<Profile>('/profile', { method: 'PATCH', body: JSON.stringify(data) });
}

export type PublicProfile = Omit<Profile, 'published'>;

/** Chamada de Server Component (sem token, sem localStorage) — não passa por request(). */
export async function fetchPublicProfile(slug: string): Promise<PublicProfile | null> {
  const res = await fetch(`${API_URL}/public/tenants/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export interface TestDefinition {
  slug: string;
  title: string;
  category: string;
  source: string;
  disclaimer: string;
  instructions: string;
  responseScale: { value: number; label: string }[];
  items: { id: string; text: string }[];
  scoreBands: { maxScore: number; label: string }[];
}

export interface TestResponseRecord {
  id: string;
  testSlug: string;
  score: number;
  resultLabel: string;
  createdAt: string;
}

export function listTestCatalog() {
  return request<TestDefinition[]>('/psych-tests');
}

export function getTestDefinition(slug: string) {
  return request<TestDefinition>(`/psych-tests/${slug}`);
}

export function submitTestResponse(slug: string, patientId: string, answers: Record<string, number>) {
  return request<TestResponseRecord>(`/psych-tests/${slug}/responses`, {
    method: 'POST',
    body: JSON.stringify({ patientId, answers }),
  });
}

export function listTestResponses(patientId: string) {
  return request<TestResponseRecord[]>(`/psych-tests/responses?patientId=${encodeURIComponent(patientId)}`);
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export function listTeamMembers() {
  return request<TeamMember[]>('/users');
}

export function createTeamMember(data: { name: string; email: string; password: string; role: 'SECRETARIA' | 'SUPERVISOR' }) {
  return request<TeamMember>('/users', { method: 'POST', body: JSON.stringify(data) });
}

export interface CourseModuleView {
  slug: string;
  moduleNumber: string;
  title: string;
  files: string[];
  completed: boolean;
  locked: boolean;
  videoUrl: string | null;
}

export interface CourseBlocoView {
  number: number;
  title: string;
  free: boolean;
  bundleOnly: boolean;
  modules: CourseModuleView[];
}

export interface CourseView {
  slug: string;
  title: string;
  description: string;
  priceCents: number | null;
  blocos: CourseBlocoView[];
}

export function listCourseCatalog() {
  return request<CourseView[]>('/courses');
}

export function markModuleComplete(courseSlug: string, moduleSlug: string) {
  return request<{ completed: boolean }>(`/courses/${courseSlug}/modules/${moduleSlug}/complete`, { method: 'POST' });
}

/** Download autenticado: precisa do header Authorization, então não dá para usar um <a href> puro. */
export async function downloadCourseFile(courseSlug: string, moduleSlug: string, fileType: string, suggestedName: string) {
  const token = getToken();
  const res = await fetch(`${API_URL}/courses/${courseSlug}/modules/${moduleSlug}/files/${fileType}`, {
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

export interface CertificateRecord {
  id: string;
  courseSlug: string;
  verificationCode: string;
  issuedAt: string;
}

export function listMyCertificates() {
  return request<CertificateRecord[]>('/certificates');
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

export interface LibraryResource {
  slug: string;
  title: string;
  category: string;
  summary: string;
  whereToFind: string;
}

export function listLibrary() {
  return request<LibraryResource[]>('/library');
}

export interface SupervisionSession {
  id: string;
  startsAt: string;
  endsAt: string;
  status: string;
  notes?: string | null;
  supervisor: { name: string };
  supervisee: { name: string };
}

export function listSupervisionSessions() {
  return request<SupervisionSession[]>('/supervision-sessions');
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
  blocos: { number: number; title: string; free: boolean; moduleCount: number }[];
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
  convertedPatientId?: string | null;
  createdAt: string;
}

export function listLeads() {
  return request<Lead[]>('/leads');
}

export function createLead(data: { name: string; contact?: string; source?: string }) {
  return request<Lead>('/leads', { method: 'POST', body: JSON.stringify(data) });
}

export function updateLead(id: string, data: { stage?: string; notes?: string }) {
  return request<Lead>(`/leads/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

export function convertLead(id: string) {
  return request<Patient>(`/leads/${id}/convert`, { method: 'POST' });
}

export interface ComplianceFlag {
  match: string;
  reason: string;
}

export interface MarketingPost {
  id: string;
  content: string;
  platform?: string | null;
  scheduledAt?: string | null;
  status: string;
  complianceFlags?: ComplianceFlag[] | null;
  createdAt: string;
}

export function checkMarketingContent(content: string) {
  return request<ComplianceFlag[]>('/marketing/check', { method: 'POST', body: JSON.stringify({ content }) });
}

export function listMarketingPosts() {
  return request<MarketingPost[]>('/marketing/posts');
}

export function createMarketingPost(data: { content: string; platform?: string; scheduledAt?: string }) {
  return request<MarketingPost>('/marketing/posts', { method: 'POST', body: JSON.stringify(data) });
}

export function updateMarketingPostStatus(id: string, status: string) {
  return request<MarketingPost>(`/marketing/posts/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  authorName: string;
  tenantName: string;
  _count?: { replies: number };
}

export interface CommunityReply {
  id: string;
  content: string;
  createdAt: string;
  authorName: string;
  tenantName: string;
}

export interface CommunityPostDetail extends CommunityPost {
  replies: CommunityReply[];
}

export function listCommunityPosts() {
  return request<CommunityPost[]>('/community/posts');
}

export function createCommunityPost(data: { title: string; content: string }) {
  return request<CommunityPost>('/community/posts', { method: 'POST', body: JSON.stringify(data) });
}

export function getCommunityPost(id: string) {
  return request<CommunityPostDetail>(`/community/posts/${id}`);
}

export function replyToCommunityPost(id: string, content: string) {
  return request<CommunityReply>(`/community/posts/${id}/replies`, { method: 'POST', body: JSON.stringify({ content }) });
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

export function summarizeProntuarioWithAi(patientId: string) {
  return request<{ summary: string }>(`/ai/prontuario/${patientId}/summarize`, { method: 'POST' });
}

export function suggestCompliantRewrite(content: string, flagReasons: string[]) {
  return request<{ suggestion: string }>('/ai/marketing/rewrite', { method: 'POST', body: JSON.stringify({ content, flagReasons }) });
}

export function askAiAssistant(question: string) {
  return request<{ answer: string }>('/ai/ask', { method: 'POST', body: JSON.stringify({ question }) });
}

export function listPatientAppointments(patientId: string) {
  return request<Appointment[]>(`/appointments?patientId=${encodeURIComponent(patientId)}`);
}

export function createTeleconsultaRoom(appointmentId: string) {
  return request<Appointment & { videoRoomUrl: string }>(`/appointments/${appointmentId}/teleconsulta/room`, { method: 'POST' });
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

export interface Offer {
  id: string;
  title: string;
  description: string;
  externalUrl: string;
  imageUrl?: string | null;
  active: boolean;
  createdAt: string;
}

export function listOffers() {
  return request<Offer[]>('/offers');
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
