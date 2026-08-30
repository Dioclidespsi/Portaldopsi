const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';
const TOKEN_KEY = 'portal-do-psi:token';
const VISITOR_TOKEN_KEY = 'portal-do-psi:visitor';

/** Identificador anônimo do visitante (sem conta/login) — só pra evitar curtida duplicada do mesmo navegador, ver SiteLike. */
export function getVisitorToken(): string {
  if (typeof window === 'undefined') return '';
  let token = localStorage.getItem(VISITOR_TOKEN_KEY);
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem(VISITOR_TOKEN_KEY, token);
  }
  return token;
}

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

/** Mesma ideia de getTenantKind — usado pra só mostrar "Nome da clínica" em /dashboard/conta pro titular. */
export function getRole(): 'PSICOLOGO_TITULAR' | 'SECRETARIA' | 'SUPERVISOR' | 'PACIENTE' | null {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role ?? null;
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

export function signup(data: { clinicName: string; slug: string; name: string; email: string; phone: string; password: string }) {
  return request<{ accessToken: string }>('/auth/signup', { method: 'POST', body: JSON.stringify(data) });
}

export async function verifyEmailToken(token: string): Promise<boolean> {
  const res = await fetch(`${API_URL}/auth/verify-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
    cache: 'no-store',
  });
  return res.ok;
}

export function login(data: { slug: string; email: string; password: string }) {
  return request<{ accessToken: string }>('/auth/login', { method: 'POST', body: JSON.stringify(data) });
}

/** Resposta sempre igual, exista ou não a conta — nunca confirma nem nega quem tem cadastro. */
export function requestPasswordReset(data: { slug: string; email: string }) {
  return request<{ sent: true }>('/auth/request-password-reset', { method: 'POST', body: JSON.stringify(data) });
}

export function resetPassword(data: { token: string; newPassword: string }) {
  return request<{ reset: true }>('/auth/reset-password', { method: 'POST', body: JSON.stringify(data) });
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
  /** Rascunho privado do psicólogo — nunca visível ao paciente. */
  privateNote?: string | null;
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

export function setPatientPrivateNote(id: string, privateNote: string) {
  return request<Patient>(`/patients/${id}/private-note`, { method: 'PATCH', body: JSON.stringify({ privateNote }) });
}

export interface Appointment {
  id: string;
  patientId?: string;
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

export function rescheduleAppointment(id: string, data: { startsAt: string; endsAt: string }) {
  return request<Appointment>(`/appointments/${id}/reschedule`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
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

export interface CreateSlotBlockResult {
  created: number;
  skippedConflict: number;
  skippedPast: number;
  slots: AvailabilitySlot[];
}

/** Substitui a antiga liberação horário-a-horário — ver AvailabilityService.createSlotBlock. */
export function createAvailabilitySlotBlock(data: {
  fromDate: string;
  toDate: string;
  daysOfWeek: number[];
  startTime: string;
  endTime: string;
  durationMinutes: number;
  intervalMinutes?: number;
}) {
  return request<CreateSlotBlockResult>('/availability/block', { method: 'POST', body: JSON.stringify(data) });
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

export function createPayoutAccount(data: {
  name: string;
  email: string;
  cpfCnpj: string;
  mobilePhone: string;
  birthDate: string;
  incomeValueCents: number;
  address: string;
  addressNumber: string;
  complement?: string;
  province: string;
  postalCode: string;
}) {
  return request<{ payoutProvider: string; payoutAccountId: string }>('/asaas/payout-account', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/** Pra quem já tem conta Asaas própria — evita o erro de CPF/e-mail já em uso ao tentar criar sub-conta nova. */
export function linkExistingPayoutAccount(walletId: string) {
  return request<{ payoutProvider: string; payoutAccountId: string }>('/asaas/payout-account/link', {
    method: 'POST',
    body: JSON.stringify({ walletId }),
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
  publicAddress?: string | null;
  publicCity?: string | null;
  publicState?: string | null;
  socialInstagram?: string | null;
  socialYoutube?: string | null;
  socialFacebook?: string | null;
  socialLinkedin?: string | null;
  socialTiktok?: string | null;
  colorPalette: string;
  published: boolean;
  payoutProvider?: string | null;
  payoutAccountId?: string | null;
  sessionPriceCents?: number | null;
  bookingEnabled: boolean;
  listedInDirectory: boolean;
  /** Fica em EM_ANALISE até o admin da plataforma publicar — nunca o próprio profissional. */
  presentationVideoStatus: 'NAO_ENVIADO' | 'EM_ANALISE' | 'PUBLICADO' | 'REJEITADO';
  presentationVideoRejectionReason?: string | null;
  presentationVideoUrl?: string | null;
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
      | 'publicAddress'
      | 'publicCity'
      | 'publicState'
      | 'socialInstagram'
      | 'socialYoutube'
      | 'socialFacebook'
      | 'socialLinkedin'
      | 'socialTiktok'
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

export interface AccountInfo {
  name: string;
  email: string;
  tenantName: string;
}

export function fetchAccount() {
  return request<AccountInfo>('/account');
}

export function changeAccountEmail(newEmail: string, currentPassword: string) {
  return request<{ id: string; email: string }>('/account/email', {
    method: 'PATCH',
    body: JSON.stringify({ newEmail, currentPassword }),
  });
}

export function changeAccountPassword(currentPassword: string, newPassword: string) {
  return request<{ ok: true }>('/account/password', {
    method: 'PATCH',
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

/** Só o titular pode chamar — ver AccountController.updateTenantName. */
export function updateTenantName(name: string) {
  return request<{ id: string; name: string }>('/account/tenant-name', { method: 'PATCH', body: JSON.stringify({ name }) });
}

/** `templates` vem `null` até o titular configurar em /dashboard/conta — o frontend cai nos padrões embutidos nesse caso (ver lib/whatsapp.ts). */
export function fetchWhatsAppTemplates() {
  return request<{ templates: { label: string; text: string }[] | null }>('/account/whatsapp-templates');
}

/** Só o titular pode chamar — ver AccountController.updateWhatsAppTemplates. Sempre exatamente 5 modelos. */
export function updateWhatsAppTemplates(templates: { label: string; text: string }[]) {
  return request<{ templates: { label: string; text: string }[] | null }>('/account/whatsapp-templates', {
    method: 'PATCH',
    body: JSON.stringify({ templates }),
  });
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

/** Fica em EM_ANALISE até o admin da plataforma revisar — cadastrar outro link sobrescreve o anterior. */
export function setPresentationVideoUrl(url: string) {
  return request<{ id: string; presentationVideoStatus: Profile['presentationVideoStatus'] }>('/profile/video', {
    method: 'POST',
    body: JSON.stringify({ url }),
  });
}

/** Some da página pública mesmo se já estava publicado — pode cadastrar outro link depois. */
export function removePresentationVideo() {
  return request<{ id: string; presentationVideoStatus: Profile['presentationVideoStatus'] }>('/profile/video', {
    method: 'DELETE',
  });
}

/** Conteúdo repetível do Site Profissional (formação, experiência, credenciais, FAQ) — ver SiteProfileBlock. */
export interface SiteProfileBlockField {
  key: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export interface SiteProfileBlockType {
  type: string;
  label: string;
  fields: SiteProfileBlockField[];
}

export interface SiteProfileBlock {
  id: string;
  type: string;
  fields: Record<string, string>;
  position: number;
}

export function getSiteProfileBlockCatalog() {
  return request<SiteProfileBlockType[]>('/profile/blocks/catalog');
}

export function listOwnSiteProfileBlocks() {
  return request<SiteProfileBlock[]>('/profile/blocks');
}

export function createSiteProfileBlock(data: { type: string; fields: Record<string, string> }) {
  return request<SiteProfileBlock>('/profile/blocks', { method: 'POST', body: JSON.stringify(data) });
}

export function updateSiteProfileBlock(id: string, data: { fields?: Record<string, string>; position?: number }) {
  return request<SiteProfileBlock>(`/profile/blocks/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

export function deleteSiteProfileBlock(id: string) {
  return request(`/profile/blocks/${id}`, { method: 'DELETE' });
}

export type PublicProfile = Omit<
  Profile,
  'published' | 'presentationVideoStatus' | 'presentationVideoRejectionReason' | 'presentationVideoUrl'
> & {
  crpVerified: boolean;
  /** Só vem preenchido quando o CRP do titular está VERIFICADO — nunca um valor não conferido. */
  crpNumber: string | null;
  /** Só vem preenchido quando presentationVideoStatus=PUBLICADO — link do YouTube, pronto pra embed. */
  presentationVideoUrl: string | null;
  /** Vazio quando o psicólogo não preencheu nenhum bloco — nunca vem com conteúdo fabricado. */
  blocks: SiteProfileBlock[];
};

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

/** Formulário público da página /programa-piloto — capta interesse no Programa Piloto (100 vagas, 3 meses grátis). */
export async function submitCampaignLead(data: { name: string; email: string; phone: string; consent: boolean }) {
  const res = await fetch(`${API_URL}/public/campaign-leads`, {
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

/** Contador real de vagas do Programa Piloto (só conta quem já virou tenant ativo — nunca escassez artificial). */
export async function getPilotProgress(): Promise<{ converted: number; remaining: number }> {
  const res = await fetch(`${API_URL}/public/campaign-leads/count`);
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  return res.json();
}

export interface PublicSiteComment {
  id: string;
  authorName: string;
  content: string;
  createdAt: string;
  rating: number | null;
  importedFrom: string | null;
}

export async function fetchPublicComments(slug: string): Promise<PublicSiteComment[]> {
  const res = await fetch(`${API_URL}/public/tenants/${slug}/comments`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export async function submitPublicComment(
  slug: string,
  data: { authorName: string; content: string; consentToPublish: boolean },
) {
  const res = await fetch(`${API_URL}/public/tenants/${slug}/comments`, {
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

export interface SiteLikesInfo {
  count: number;
  likedByVisitor: boolean;
}

export async function fetchSiteLikes(slug: string, visitorToken: string): Promise<SiteLikesInfo> {
  const res = await fetch(`${API_URL}/public/tenants/${slug}/likes?visitorToken=${encodeURIComponent(visitorToken)}`, { cache: 'no-store' });
  if (!res.ok) return { count: 0, likedByVisitor: false };
  return res.json();
}

export async function likeSite(slug: string, visitorToken: string): Promise<SiteLikesInfo> {
  const res = await fetch(`${API_URL}/public/tenants/${slug}/likes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ visitorToken }),
  });
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  return res.json();
}

export async function unlikeSite(slug: string, visitorToken: string): Promise<SiteLikesInfo> {
  const res = await fetch(`${API_URL}/public/tenants/${slug}/likes`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ visitorToken }),
  });
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  return res.json();
}

/** Lado do profissional — vê todos os próprios comentários, publicados ou não. */
export interface OwnSiteComment {
  id: string;
  authorName: string;
  content: string;
  consentToPublish: boolean;
  publishedByProfessional: boolean;
  blockedByAdmin: boolean;
  blockedReason: string | null;
  createdAt: string;
  rating: number | null;
  importedFrom: string | null;
}

export function listOwnSiteComments() {
  return request<OwnSiteComment[]>('/site-comments');
}

export function setSiteCommentPublished(id: string, publish: boolean) {
  return request<OwnSiteComment>(`/site-comments/${id}/publish`, { method: 'PATCH', body: JSON.stringify({ publish }) });
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
  /** Só vem preenchido no fluxo anônimo — cria a PatientAccount (login automático) na hora do primeiro agendamento. */
  accessToken?: string;
}

/**
 * Reserva o horário por 15min e gera o link de pagamento via Asaas (split
 * pro profissional). Fluxo anônimo — visitante sem conta ainda, cria a
 * PatientAccount (login único, cross-clínica) junto com o agendamento.
 */
export async function submitPublicBooking(
  slug: string,
  data: { slotId: string; name: string; email: string; phone: string; cpfCnpj: string; password: string; termsAccepted: boolean },
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

/** Paciente já logado (qualquer clínica) — só o horário importa, o resto já vem da conta. */
export async function submitAuthenticatedBooking(slug: string, slotId: string, patientToken: string) {
  const res = await fetch(`${API_URL}/public/tenants/${slug}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${patientToken}` },
    body: JSON.stringify({ slotId }),
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
  /** true quando o próprio profissional digitou as respostas numa aplicação ao vivo, em vez do paciente responder sozinho. */
  appliedLiveByStaff: boolean;
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

export function applyTestLive(id: string, answers: Record<string, number | string>) {
  return request<TestAssignment>(`/psych-tests/assignments/${id}/apply-live`, {
    method: 'POST',
    body: JSON.stringify({ answers }),
  });
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

/** Só funciona enquanto a aplicação ainda está "pendente" — o backend recusa depois de respondida. */
export function deleteTestAssignment(id: string) {
  return request<{ ok: true }>(`/psych-tests/assignments/${id}`, { method: 'DELETE' });
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
  audience: 'ESTUDANTES' | 'PROFISSIONAIS_GRATIS' | 'PROFISSIONAIS_PAGO';
  enrolled: boolean;
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
  authorId: string | null;
  authorName: string;
  authorPhotoUrl?: string | null;
  tenantName: string;
  authorCrpVerified: boolean;
  authorSpecialty?: string | null;
  imageUrl?: string | null;
  likedByMe: boolean;
  _count?: { replies: number; likes: number };
}

export interface CommunityReply {
  id: string;
  content: string;
  createdAt: string;
  authorName: string;
  authorPhotoUrl?: string | null;
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

/** Só o próprio autor consegue — o backend confere authorId. */
export function updateCommunityPost(id: string, data: Partial<{ title: string; content: string; category: CommunityCategory }>) {
  return request<CommunityPost>(`/community/posts/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

/** Exclusão de verdade pelo próprio autor — diferente da remoção por moderação (admin, com motivo). */
export function deleteCommunityPost(id: string) {
  return request<{ deleted: true }>(`/community/posts/${id}`, { method: 'DELETE' });
}

/** Opcional — pra posts de data comemorativa que o psicólogo baixa e compartilha nas próprias redes. */
export async function uploadCommunityPostImage(id: string, file: File) {
  const token = getToken();
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_URL}/community/posts/${id}/image`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as { message?: string });
    throw new Error(body.message ?? `Erro ${res.status}`);
  }
  return res.json() as Promise<CommunityPost>;
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
  /** Vínculo com a conta global do Aplicativo do Paciente — null enquanto não convidado pro portal. */
  patientAccountId: string | null;
  birthDate?: string | null;
}

export function getPatient(id: string) {
  return request<PatientDetail>(`/patients/${id}`);
}

export interface EnablePortalResult {
  id: string;
  name: string;
  email: string | null;
  patientAccountId: string;
  /** true quando o e-mail já tinha conta em outra clínica — a senha enviada foi ignorada, só linkamos. */
  linkedExistingAccount: boolean;
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
  return request<EnablePortalResult>(`/patients/${patientId}/portal`, { method: 'PATCH', body: JSON.stringify({ password }) });
}

/** Alternativa a enablePatientPortal: gera um token pro próprio paciente definir a senha (ver /paciente/ativar). */
export function generatePatientActivationLink(patientId: string) {
  return request<{ activationToken: string }>(`/patients/${patientId}/activation-link`, { method: 'POST' });
}

export function summarizeProntuarioWithAi(patientId: string) {
  return request<{ summary: string }>(`/ai/prontuario/${patientId}/summarize`, { method: 'POST' });
}

export interface AnamneseSection {
  key: string;
  label: string;
  placeholder: string;
}

export interface AnamneseTemplate {
  slug: string;
  title: string;
  suggestedAgeRange: { min: number; max: number | null };
  sections: AnamneseSection[];
}

export interface AnamneseEntry {
  id: string;
  patientId: string;
  templateSlug: string;
  fields: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export function getAnamneseCatalog() {
  return request<AnamneseTemplate[]>('/anamnese/catalog');
}

/** Sempre editável — não existe "rascunho"/"finalizado" aqui, ver AnamneseService. */
export function getAnamnese(patientId: string) {
  return request<{ entry: AnamneseEntry | null; suggestedTemplateSlug: string | null }>(
    `/anamnese?patientId=${patientId}`,
  );
}

export function upsertAnamnese(patientId: string, templateSlug: string, fields: Record<string, string>) {
  return request<AnamneseEntry>('/anamnese', {
    method: 'PUT',
    body: JSON.stringify({ patientId, templateSlug, fields }),
  });
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

/** Sala é privada — a URL crua não entra sozinha, precisa de um token de curta duração gerado na hora. */
export function getTeleconsultaJoinLink(appointmentId: string) {
  return request<{ url: string }>(`/appointments/${appointmentId}/teleconsulta/join-link`, { method: 'POST' });
}

/** Link com papel de paciente (não moderador) — pra copiar e mandar manualmente (WhatsApp etc.) quando o fluxo automático dentro do app do paciente falhar. */
export function getTeleconsultaPatientJoinLink(appointmentId: string) {
  return request<{ url: string }>(`/appointments/${appointmentId}/teleconsulta/patient-join-link`, { method: 'POST' });
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

/**
 * Autenticado de propósito — os valores da assinatura só devem aparecer pro
 * profissional já logado, na tela Assinatura, nunca na home pública.
 */
export function listPlans() {
  return request<Record<PlanKey, Plan>>('/billing/plans');
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
  return request<{ asaasSubscriptionId: string; paymentLink: string | null }>('/billing/checkout-asaas', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function fetchAsaasPaymentLink() {
  return request<{ paymentLink: string | null }>('/billing/asaas-payment-link');
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
  requiresAcceptance: boolean;
  createdAt: string;
}

export function listDocumentTemplates() {
  return request<DocumentTemplate[]>('/document-templates');
}

/** Contratos/termos com requiresAcceptance=true que o usuário logado ainda não aceitou. */
export function listPendingAcceptance() {
  return request<DocumentTemplate[]>('/document-templates/pending-acceptance');
}

export function acceptDocumentTemplate(id: string) {
  return request(`/document-templates/${id}/accept`, { method: 'POST' });
}

export interface AccessStatus {
  ok: boolean;
  missingCrp: boolean;
  missingSubscription: boolean;
  missingTerms: boolean;
}

/** As 3 condições pra liberar o uso real das ferramentas clínicas — ver ClinicalAccessGuard. */
export function getAccessStatus() {
  return request<AccessStatus>('/me/access-status');
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

/**
 * Item 4 — multipart por causa da declaração de matrícula (arquivo). Não dá
 * pra usar o helper `request()` genérico aqui porque ele sempre manda
 * Content-Type: application/json.
 */
export async function purchaseCourse(data: {
  name: string;
  slug: string;
  email: string;
  password: string;
  courseSlug: string;
  provider: 'STRIPE' | 'ASAAS';
  institution: string;
  enrollmentNumber: string;
  document: File;
  termsAccepted: boolean;
  cpfCnpj?: string;
  successUrl?: string;
  cancelUrl?: string;
}) {
  const form = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'document') form.append('document', value as File);
    else if (value !== undefined) form.append(key, String(value));
  });
  const res = await fetch(`${API_URL}/marketplace/purchase`, { method: 'POST', body: form });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as { message?: string });
    throw new Error(body.message ?? `Erro ${res.status}`);
  }
  return res.json() as Promise<{ accessToken: string; enrollmentStatus: string; checkoutUrl?: string; paymentLink?: string }>;
}

export async function uploadSignature(file: File) {
  const token = getToken();
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_URL}/users/me/signature`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as { message?: string });
    throw new Error(body.message ?? `Erro ${res.status}`);
  }
  return res.json() as Promise<{ id: string; signatureImagePath: string }>;
}

export async function getOwnSignatureUrl(): Promise<string | null> {
  const token = getToken();
  const res = await fetch(`${API_URL}/users/me/signature`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) return null;
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}

export interface PsychDocumentSection {
  key: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
}

export interface PsychDocumentTemplate {
  slug: string;
  title: string;
  includesCid?: boolean;
  includesReceiptProtocol?: boolean;
  requiresPatientAcceptance?: boolean;
  sections: PsychDocumentSection[];
}

export function listPsychDocumentCatalog() {
  return request<PsychDocumentTemplate[]>('/psych-documents/catalog');
}

export interface PsychDocumentSummary {
  id: string;
  templateSlug: string;
  title: string;
  status: string;
  createdAt: string;
  finalizedAt?: string | null;
  releasedToPatientAt?: string | null;
  requiresPatientAcceptance?: boolean;
  acceptedByPatientAt?: string | null;
}

export function listPsychDocumentsForPatient(patientId: string) {
  return request<PsychDocumentSummary[]>(`/psych-documents?patientId=${encodeURIComponent(patientId)}`);
}

export interface PsychDocumentDetail extends PsychDocumentSummary {
  fields: Record<string, string>;
}

export function getPsychDocument(id: string) {
  return request<PsychDocumentDetail>(`/psych-documents/${id}`);
}

export function createPsychDocumentDraft(data: { patientId: string; templateSlug: string; fields: Record<string, string>; cid?: string }) {
  return request<PsychDocumentDetail>('/psych-documents', { method: 'POST', body: JSON.stringify(data) });
}

export function updatePsychDocumentDraft(id: string, data: { fields: Record<string, string>; cid?: string }) {
  return request<PsychDocumentDetail>(`/psych-documents/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

export function deletePsychDocumentDraft(id: string) {
  return request(`/psych-documents/${id}`, { method: 'DELETE' });
}

export function finalizePsychDocument(id: string) {
  return request<PsychDocumentDetail>(`/psych-documents/${id}/finalize`, { method: 'POST' });
}

export function releasePsychDocument(id: string) {
  return request<PsychDocumentDetail>(`/psych-documents/${id}/release`, { method: 'POST' });
}

export async function downloadPsychDocument(id: string, suggestedName: string) {
  const token = getToken();
  const res = await fetch(`${API_URL}/psych-documents/${id}/download`, {
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

export function enrollInCourse(data: {
  courseSlug: string;
  provider: 'STRIPE' | 'ASAAS';
  termsAccepted?: boolean;
  cpfCnpj?: string;
  successUrl?: string;
  cancelUrl?: string;
}) {
  return request<{ checkoutUrl?: string; paymentLink?: string }>('/marketplace/enroll', { method: 'POST', body: JSON.stringify(data) });
}
