import { Controller, Get, ServiceUnavailableException, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminTokenGuard } from './admin-token.guard';

interface LiteLLMSpendLog {
  spend: number;
  total_tokens: number;
  model: string;
  startTime: string;
  metadata?: { status?: string };
}

/**
 * Painel de custo/uso de IA — busca no LiteLLM (proxy auto-hospedado, ver
 * apps/api/src/common/anthropic-client.ts) e resume aqui, em vez de expor
 * o proxy ou sua chave-mestra pra internet. A porta 4000 do LiteLLM só
 * escuta em localhost — este endpoint é o único jeito de ver os dados de
 * fora do próprio servidor, sempre atrás do AdminTokenGuard.
 */
@Controller('admin/ai-usage')
@UseGuards(AdminTokenGuard)
export class AdminAiUsageController {
  constructor(private readonly config: ConfigService) {}

  @Get()
  async getSummary() {
    const proxyUrl = this.config.get<string>('LITELLM_PROXY_URL');
    const masterKey = this.config.get<string>('LITELLM_MASTER_KEY');
    if (!proxyUrl || !masterKey) {
      throw new ServiceUnavailableException('Painel de custo de IA ainda não configurado: defina LITELLM_PROXY_URL e LITELLM_MASTER_KEY em apps/api/.env.');
    }
    const baseUrl = proxyUrl.replace(/\/anthropic\/?$/, '');

    let logs: LiteLLMSpendLog[];
    try {
      const res = await fetch(`${baseUrl}/spend/logs`, { headers: { Authorization: `Bearer ${masterKey}` } });
      if (!res.ok) throw new Error(`status ${res.status}`);
      logs = (await res.json()) as LiteLLMSpendLog[];
    } catch (err) {
      throw new ServiceUnavailableException(`Não foi possível consultar o painel de custo agora: ${(err as Error).message}`);
    }

    const totalSpend = logs.reduce((sum, l) => sum + (l.spend ?? 0), 0);
    const totalCalls = logs.length;
    const failedCalls = logs.filter((l) => l.metadata?.status === 'failure').length;
    const totalTokens = logs.reduce((sum, l) => sum + (l.total_tokens ?? 0), 0);

    const byModel: Record<string, { calls: number; spend: number; tokens: number; failures: number }> = {};
    for (const l of logs) {
      const key = l.model || 'desconhecido';
      byModel[key] ??= { calls: 0, spend: 0, tokens: 0, failures: 0 };
      byModel[key].calls += 1;
      byModel[key].spend += l.spend ?? 0;
      byModel[key].tokens += l.total_tokens ?? 0;
      if (l.metadata?.status === 'failure') byModel[key].failures += 1;
    }

    const recent = [...logs]
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
      .slice(0, 20)
      .map((l) => ({ model: l.model, spend: l.spend, tokens: l.total_tokens, status: l.metadata?.status ?? 'desconhecido', startTime: l.startTime }));

    return { totalSpend, totalCalls, failedCalls, totalTokens, byModel, recent };
  }
}
