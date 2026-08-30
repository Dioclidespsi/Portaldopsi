import { getAdminToken } from './admin-api';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

export interface ScoreReason {
  label: string;
  points: number;
  max: number;
  reason: string;
}

export interface ProspectActivity {
  id: string;
  prospectId: string;
  content: string;
  createdBy: string | null;
  createdAt: string;
}

export interface Prospect {
  id: string;
  fullName: string;
  professionalName: string | null;
  crp: string | null;
  city: string | null;
  state: string | null;
  country: string;
  specialties: string | null;
  approaches: string | null;
  audience: string | null;
  ageRange: string | null;
  serviceMode: string | null;
  experienceNotes: string | null;
  website: string | null;
  instagram: string | null;
  facebook: string | null;
  linkedin: string | null;
  googleBusinessUrl: string | null;
  reviewsCount: number | null;
  hasOnlineBooking: boolean;
  hasContactForm: boolean;
  phone: string | null;
  whatsapp: string | null;
  publicEmail: string | null;
  score: number | null;
  scoreBreakdown: ScoreReason[] | null;
  aiSummary: string | null;
  aiOpportunity: string | null;
  aiStrategy: string | null;
  aiQualifiedAt: string | null;
  stage: string;
  assignedToAdmin: string | null;
  notes: string | null;
  convertedTenantId: string | null;
  doNotContact: boolean;
  source: string | null;
  sourceUrl: string | null;
  sourceType: string | null;
  collectedAt: string;
  lastVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
  activities?: ProspectActivity[];
}

export interface ProspectingReport {
  total: number;
  countByStage: Record<string, number>;
  prioridadeMaxima: number;
  altaPrioridade: number;
  conversionRate: number;
}

export interface ListProspectsParams {
  search?: string;
  stage?: string;
  city?: string;
  state?: string;
  minScore?: number;
  hasWebsite?: 'true' | 'false';
  hasInstagram?: 'true' | 'false';
  hasWhatsapp?: 'true' | 'false';
  page?: number;
  pageSize?: number;
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

export async function listProspects(params: ListProspectsParams = {}): Promise<{ items: Prospect[]; total: number; page: number; pageSize: number }> {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') qs.set(key, String(value));
  });
  const suffix = qs.toString() ? `?${qs.toString()}` : '';
  return request(`/admin/prospecting${suffix}`);
}

export function getProspectingReport(): Promise<ProspectingReport> {
  return request('/admin/prospecting/report');
}

export function getProspect(id: string): Promise<Prospect> {
  return request(`/admin/prospecting/${id}`);
}

export function createProspect(data: Partial<Prospect>): Promise<{ prospect: Prospect | null; matchedExisting: boolean; blocked: boolean }> {
  return request('/admin/prospecting', { method: 'POST', body: JSON.stringify(data) });
}

export function updateProspect(id: string, data: Partial<Prospect>): Promise<Prospect> {
  return request(`/admin/prospecting/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

/** Só remove — a mesma pessoa pode voltar numa pesquisa futura (ex: dado de teste/erro). */
export function deleteProspect(id: string): Promise<{ deleted: boolean }> {
  return request(`/admin/prospecting/${id}`, { method: 'DELETE' });
}

/** Remove E impede que a mesma pessoa seja recriada numa pesquisa futura (item 19 do spec). */
export function blockProspect(id: string, reason?: string): Promise<{ blocked: boolean }> {
  return request(`/admin/prospecting/${id}/block`, { method: 'POST', body: JSON.stringify({ reason }) });
}

export function recomputeProspectScore(id: string): Promise<Prospect> {
  return request(`/admin/prospecting/${id}/score`, { method: 'POST' });
}

export function qualifyProspectWithAi(id: string): Promise<Prospect> {
  return request(`/admin/prospecting/${id}/qualify`, { method: 'POST' });
}

export function listProspectActivities(id: string): Promise<ProspectActivity[]> {
  return request(`/admin/prospecting/${id}/activities`);
}

export function addProspectActivity(id: string, content: string): Promise<ProspectActivity> {
  return request(`/admin/prospecting/${id}/activities`, { method: 'POST', body: JSON.stringify({ content }) });
}

export interface ProspectSearchRequest {
  id: string;
  city: string | null;
  state: string | null;
  specialty: string | null;
  approach: string | null;
  audience: string | null;
  serviceMode: string | null;
  includeKeywords: string | null;
  excludeKeywords: string | null;
  quantity: number;
  status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA';
  resultCount: number;
  notes: string | null;
  createdAt: string;
  completedAt: string | null;
}

export interface CreateSearchRequestData {
  city?: string;
  state?: string;
  specialty?: string;
  approach?: string;
  audience?: string;
  serviceMode?: string;
  includeKeywords?: string;
  excludeKeywords?: string;
  quantity?: number;
}

export function createSearchRequest(data: CreateSearchRequestData): Promise<ProspectSearchRequest> {
  return request('/admin/prospecting/search-requests', { method: 'POST', body: JSON.stringify(data) });
}

export function listSearchRequests(): Promise<ProspectSearchRequest[]> {
  return request('/admin/prospecting/search-requests');
}

export function updateSearchRequestStatus(
  id: string,
  status: ProspectSearchRequest['status'],
  resultCount?: number,
  notes?: string,
): Promise<ProspectSearchRequest> {
  return request(`/admin/prospecting/search-requests/${id}`, { method: 'PATCH', body: JSON.stringify({ status, resultCount, notes }) });
}

/** Processa até 10 resultados do pedido (ver EXECUTE_BATCH_SIZE no backend) — clique de novo pra continuar. */
export function executeSearchRequest(id: string): Promise<ProspectSearchRequest> {
  return request(`/admin/prospecting/search-requests/${id}/execute`, { method: 'POST' });
}

/** Apaga só o histórico de pesquisas concluídas/canceladas — nunca mexe nos leads já extraídos. */
export function deleteFinishedSearchRequests(): Promise<{ deleted: number }> {
  return request('/admin/prospecting/search-requests/finished', { method: 'DELETE' });
}
