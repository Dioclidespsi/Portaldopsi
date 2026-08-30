import Anthropic from '@anthropic-ai/sdk';
import { ConfigService } from '@nestjs/config';

/**
 * Cria o cliente Anthropic roteado pelo LiteLLM (proxy auto-hospedado no
 * próprio VPS, /opt/litellm — ver README lá) quando LITELLM_PROXY_URL e
 * LITELLM_MASTER_KEY estão configuradas. Sem elas, chama a Anthropic
 * direto, exatamente como antes: opcional, nunca quebra nada.
 *
 * Por que auto-hospedado em vez de um serviço tipo Helicone: cadastro
 * grátis deles estava fechado no momento (2026-08-30) — LiteLLM roda local,
 * sem depender de conta de terceiro. Modo "passthrough" (rota
 * `/anthropic/v1/messages`, formato nativo intacto) — dá painel de custo/
 * uso por modelo, mas cache NÃO se aplica nesse modo (só funciona no
 * formato unificado deles, que exigiria reescrever as chamadas — avaliado
 * e descartado por risco, ver commit da integração).
 *
 * A chave enviada é a LITELLM_MASTER_KEY (vira o header `x-api-key` que o
 * SDK já manda sozinho), não a ANTHROPIC_API_KEY real — essa fica só no
 * .env do próprio proxy (/opt/litellm/.env), nunca trafega daqui.
 */
export function createAnthropicClient(apiKey: string, config: ConfigService): Anthropic {
  const proxyUrl = config.get<string>('LITELLM_PROXY_URL');
  const proxyKey = config.get<string>('LITELLM_MASTER_KEY');
  if (!proxyUrl || !proxyKey) {
    return new Anthropic({ apiKey });
  }
  return new Anthropic({ apiKey: proxyKey, baseURL: proxyUrl });
}
