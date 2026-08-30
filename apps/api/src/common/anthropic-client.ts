import Anthropic from '@anthropic-ai/sdk';
import { ConfigService } from '@nestjs/config';

/**
 * Cria o cliente Anthropic roteado pelo Helicone (observabilidade de custo/
 * uso + cache de resposta) quando HELICONE_API_KEY está configurada —
 * mesma chave de API da Anthropic, só troca o destino da chamada. Sem a
 * chave do Helicone, chama a Anthropic direto, exatamente como antes:
 * opcional, nunca quebra nada.
 *
 * Cache habilitado por padrão (Helicone-Cache-Enabled) — chamada idêntica
 * (mesmo prompt) dentro de 7 dias devolve a resposta salva, sem gastar
 * crédito de novo. Faz sentido pro nosso caso (extrair dados de uma
 * página pública, qualificar um lead) porque o conteúdo raramente muda
 * de uma hora pra outra.
 *
 * Ver https://docs.helicone.ai/integrations/anthropic/javascript e
 * https://docs.helicone.ai/features/advanced-usage/caching.
 */
export function createAnthropicClient(apiKey: string, config: ConfigService): Anthropic {
  const heliconeKey = config.get<string>('HELICONE_API_KEY');
  if (!heliconeKey) {
    return new Anthropic({ apiKey });
  }
  return new Anthropic({
    apiKey,
    baseURL: 'https://anthropic.helicone.ai',
    defaultHeaders: {
      'Helicone-Auth': `Bearer ${heliconeKey}`,
      'Helicone-Cache-Enabled': 'true',
    },
  });
}
