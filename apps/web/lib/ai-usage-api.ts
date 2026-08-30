import { getAdminToken } from './admin-api';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

export interface AiUsageSummary {
  totalSpend: number;
  totalCalls: number;
  failedCalls: number;
  totalTokens: number;
  byModel: Record<string, { calls: number; spend: number; tokens: number; failures: number }>;
  recent: { model: string; spend: number; tokens: number; status: string; startTime: string }[];
}

export async function getAiUsageSummary(): Promise<AiUsageSummary> {
  const token = getAdminToken();
  const res = await fetch(`${API_URL}/admin/ai-usage`, {
    headers: { ...(token ? { 'x-admin-token': token } : {}) },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as { message?: string });
    throw new Error(body.message ?? `Erro ${res.status}`);
  }
  return res.json();
}
