import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';

export interface GoogleSearchResult {
  title: string;
  link: string;
  snippet: string;
}

export interface ExtractedCandidate {
  fullName: string;
  crp?: string;
  city?: string;
  state?: string;
  specialties?: string;
  approaches?: string;
  audience?: string;
  serviceMode?: string;
  website?: string;
  instagram?: string;
  whatsapp?: string;
  phone?: string;
  publicEmail?: string;
}

/**
 * LeadSourceProvider concreto (item 2 do spec) baseado na API oficial do
 * Google Custom Search — alternativa ao Apify que não exige contratar
 * scraper de terceiros: a busca em si é a mesma API que qualquer app pode
 * usar de forma sancionada pelo Google. Sem GOOGLE_SEARCH_API_KEY ou
 * GOOGLE_SEARCH_ENGINE_ID configuradas, todo método aqui lança 503 — mesmo
 * padrão de AiService/EmailService, nunca finge que funciona.
 *
 * Fluxo: Google acha URLs candidatas pela query → cada página é buscada e
 * lida → a IA (Anthropic, já configurada) extrai só o que está
 * PUBLICAMENTE na página (nunca infere/inventa) → o resultado alimenta
 * AdminProspectingService.create(), reaproveitando 100% a lógica de
 * dedup/score que já existe — este provider só descobre candidatos, não
 * decide se são bons leads.
 */
@Injectable()
export class GoogleSearchProvider {
  private readonly logger = new Logger(GoogleSearchProvider.name);
  private readonly apiKey?: string;
  private readonly searchEngineId?: string;
  private readonly aiClient: Anthropic | null;
  private readonly aiModel: string;

  constructor(private readonly config: ConfigService) {
    this.apiKey = this.config.get<string>('GOOGLE_SEARCH_API_KEY');
    this.searchEngineId = this.config.get<string>('GOOGLE_SEARCH_ENGINE_ID');
    if (!this.apiKey || !this.searchEngineId) {
      this.logger.warn(
        'GOOGLE_SEARCH_API_KEY/GOOGLE_SEARCH_ENGINE_ID não configuradas — execução automática de pesquisa de prospecção fica desativada até isso ser preenchido no .env.',
      );
    }
    const anthropicKey = this.config.get<string>('ANTHROPIC_API_KEY');
    this.aiClient = anthropicKey ? new Anthropic({ apiKey: anthropicKey }) : null;
    this.aiModel = this.config.get<string>('ANTHROPIC_MODEL', 'claude-sonnet-5');
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey && this.searchEngineId);
  }

  buildQuery(criteria: {
    specialty?: string | null; approach?: string | null; audience?: string | null;
    serviceMode?: string | null; city?: string | null; state?: string | null;
    includeKeywords?: string | null; excludeKeywords?: string | null;
  }): string {
    const parts = ['psicólogo OR psicóloga'];
    if (criteria.specialty) parts.push(criteria.specialty);
    if (criteria.approach) parts.push(criteria.approach);
    if (criteria.audience) parts.push(criteria.audience);
    if (criteria.serviceMode) parts.push(criteria.serviceMode);
    if (criteria.city) parts.push(criteria.city);
    if (criteria.state) parts.push(criteria.state);
    if (criteria.includeKeywords) {
      criteria.includeKeywords.split(',').map((w) => w.trim()).filter(Boolean).forEach((w) => parts.push(w));
    }
    if (criteria.excludeKeywords) {
      criteria.excludeKeywords.split(',').map((w) => w.trim()).filter(Boolean).forEach((w) => parts.push(`-${w}`));
    }
    return parts.join(' ');
  }

  /** `start` é 1-indexado, como a API do Google exige. Até 10 resultados por chamada. */
  async search(query: string, start: number): Promise<GoogleSearchResult[]> {
    if (!this.apiKey || !this.searchEngineId) {
      throw new ServiceUnavailableException(
        'Busca automática ainda não configurada: defina GOOGLE_SEARCH_API_KEY e GOOGLE_SEARCH_ENGINE_ID em apps/api/.env.',
      );
    }
    const url = new URL('https://www.googleapis.com/customsearch/v1');
    url.searchParams.set('key', this.apiKey);
    url.searchParams.set('cx', this.searchEngineId);
    url.searchParams.set('q', query);
    url.searchParams.set('start', String(start));
    url.searchParams.set('num', '10');
    url.searchParams.set('gl', 'br');
    url.searchParams.set('lr', 'lang_pt');

    let res: Response;
    try {
      res = await fetch(url.toString());
    } catch (err) {
      this.logger.error(`Falha ao chamar Google Custom Search: ${(err as Error).message}`);
      throw new ServiceUnavailableException('Não foi possível buscar no Google agora — tente novamente em instantes.');
    }
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      this.logger.error(`Google Custom Search respondeu ${res.status}: ${body.slice(0, 300)}`);
      throw new ServiceUnavailableException('A busca no Google falhou (cota excedida ou credenciais inválidas) — confira GOOGLE_SEARCH_API_KEY/GOOGLE_SEARCH_ENGINE_ID.');
    }
    const data = (await res.json()) as { items?: { title: string; link: string; snippet: string }[] };
    return (data.items ?? []).map((i) => ({ title: i.title, link: i.link, snippet: i.snippet }));
  }

  /** Busca a página e extrai só texto visível de forma bem simples — o suficiente pra IA ler, sem depender de parser de HTML completo. */
  private async fetchPageText(url: string): Promise<string | null> {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PortalDoPsiProspecting/1.0)' },
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) return null;
      const html = await res.text();
      const text = html
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      return text.slice(0, 6000);
    } catch (err) {
      this.logger.warn(`Não foi possível ler ${url}: ${(err as Error).message}`);
      return null;
    }
  }

  /**
   * Só extrai o que está de fato na página — nunca inventa. Retorna null
   * se a IA não achar informação suficiente pra identificar um profissional
   * de verdade (evita criar leads vazios a partir de páginas de diretório
   * genéricas, por exemplo).
   */
  async extractCandidate(result: GoogleSearchResult): Promise<ExtractedCandidate | null> {
    if (!this.aiClient) {
      throw new ServiceUnavailableException('Extração por IA ainda não configurada: defina ANTHROPIC_API_KEY em apps/api/.env.');
    }
    const pageText = await this.fetchPageText(result.link);
    const context = `URL: ${result.link}\nTítulo: ${result.title}\nTrecho da busca: ${result.snippet}\n\nConteúdo da página:\n${pageText ?? '(não foi possível ler a página — use só o título/trecho)'}`;

    let response;
    try {
      response = await this.aiClient.messages.create({
        model: this.aiModel,
        max_tokens: 500,
        system:
          'Você extrai dados de contato PROFISSIONAL PÚBLICO de psicólogos a partir de uma página web, pro ' +
          'módulo de prospecção do Portal do Psi. Responda em JSON estrito com as chaves: fullName, crp, city, ' +
          'state, specialties, approaches, audience, serviceMode, website, instagram, whatsapp, phone, ' +
          'publicEmail — todas opcionais exceto fullName. Preencha APENAS o que estiver realmente escrito na ' +
          'página; nunca invente, nunca infira dado sensível. Se a página não for sobre uma pessoa específica ' +
          '(ex: diretório genérico, lista sem nome claro, página de erro), responda exatamente {"fullName": null}.',
        messages: [{ role: 'user', content: context }],
      });
    } catch (err) {
      this.logger.warn(`Falha na extração por IA de ${result.link}: ${(err as Error).message}`);
      return null;
    }

    const block = response.content.find((c) => c.type === 'text');
    const raw = block?.type === 'text' ? block.text : '{}';
    try {
      const match = raw.match(/\{[\s\S]*\}/);
      const parsed = match ? JSON.parse(match[0]) : {};
      if (!parsed.fullName) return null;
      return parsed as ExtractedCandidate;
    } catch {
      return null;
    }
  }
}
