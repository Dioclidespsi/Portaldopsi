import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';
import { createAnthropicClient } from '../common/anthropic-client';

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
 * LeadSourceProvider concreto (item 2 do spec) baseado no Serper
 * (serper.dev) — proxy da busca do Google, escolhido no lugar da API
 * oficial "Custom Search JSON API" porque o Google descontinuou a busca
 * na web inteira pra mecanismos novos (só aceita listar até 50 sites
 * específicos), o que não serve pro nosso caso de descoberta aberta.
 * Sem SERPER_API_KEY configurada, todo método aqui lança 503 — mesmo
 * padrão de AiService/EmailService, nunca finge que funciona.
 *
 * Fluxo: Serper acha URLs candidatas pela query (busca real do Google,
 * sem restrição de domínio) → cada página é buscada e lida → a IA
 * (Anthropic, já configurada) extrai só o que está PUBLICAMENTE na
 * página (nunca infere/inventa) → o resultado alimenta
 * AdminProspectingService.create(), reaproveitando 100% a lógica de
 * dedup/score que já existe — este provider só descobre candidatos, não
 * decide se são bons leads.
 */
@Injectable()
export class GoogleSearchProvider {
  private readonly logger = new Logger(GoogleSearchProvider.name);
  private readonly serperApiKey?: string;
  private readonly aiClient: Anthropic | null;

  /**
   * Extração é tarefa mecânica (ler texto, montar JSON) — usa um modelo bem
   * mais barato que o resto do app ($1/$5 por milhão de tokens, metade do
   * Sonnet 5), sem perda relevante de qualidade pra esse tipo de trabalho.
   * Cache de prompt NÃO se aplica aqui: o texto de instrução tem ~150-200
   * tokens, abaixo do mínimo cacheável (1024 no Sonnet 5, 4096 no Haiku
   * 4.5) — implementar cache_control não geraria economia nenhuma hoje.
   */
  private static readonly EXTRACTION_MODEL = 'claude-haiku-4-5';

  /**
   * Domínios/padrões que, testados na prática, nunca retornam profissional
   * específico (vídeo, rede social genérica, PDF de curso) — filtrados
   * ANTES de gastar uma chamada de IA, não depois.
   */
  private static readonly SKIP_URL_PATTERNS = [
    'youtube.com', 'youtu.be', 'tiktok.com', 'facebook.com/watch',
    '.pdf', '/curso/', '/cursos/', 'reddit.com',
  ];

  constructor(private readonly config: ConfigService) {
    this.serperApiKey = this.config.get<string>('SERPER_API_KEY');
    if (!this.serperApiKey) {
      this.logger.warn(
        'SERPER_API_KEY não configurada — execução automática de pesquisa de prospecção fica desativada até isso ser preenchido no .env.',
      );
    }
    const anthropicKey = this.config.get<string>('ANTHROPIC_API_KEY');
    this.aiClient = anthropicKey ? createAnthropicClient(anthropicKey, this.config) : null;
  }

  isConfigured(): boolean {
    return Boolean(this.serperApiKey);
  }

  shouldSkip(url: string): boolean {
    const lower = url.toLowerCase();
    return GoogleSearchProvider.SKIP_URL_PATTERNS.some((p) => lower.includes(p));
  }

  /**
   * Termos que, na prática (testado com buscas reais), quase sempre trazem
   * diretório/curso/plataforma agregadora em vez de um profissional
   * específico — excluídos por padrão pra melhorar a taxa de acerto da
   * extração por IA. Além destes, o usuário pode excluir mais via
   * `excludeKeywords`.
   */
  private static readonly DEFAULT_EXCLUDE_TERMS = ['curso', 'formação', 'diretório', 'indica'];

  buildQuery(criteria: {
    specialty?: string | null; approach?: string | null; audience?: string | null;
    serviceMode?: string | null; city?: string | null; state?: string | null;
    includeKeywords?: string | null; excludeKeywords?: string | null;
  }): string {
    // "CRP" e "@" empurram o resultado pra páginas de profissional individual
    // (que costumam exibir o registro/handle) em vez de listagens genéricas.
    const parts = ['psicólogo OR psicóloga', '(CRP OR "@")'];
    if (criteria.specialty) parts.push(criteria.specialty);
    if (criteria.approach) parts.push(criteria.approach);
    if (criteria.audience) parts.push(criteria.audience);
    if (criteria.serviceMode) parts.push(criteria.serviceMode);
    if (criteria.city) parts.push(criteria.city);
    if (criteria.state) parts.push(criteria.state);
    if (criteria.includeKeywords) {
      criteria.includeKeywords.split(',').map((w) => w.trim()).filter(Boolean).forEach((w) => parts.push(w));
    }
    const excludeTerms = [
      ...GoogleSearchProvider.DEFAULT_EXCLUDE_TERMS,
      ...(criteria.excludeKeywords ?? '').split(',').map((w) => w.trim()).filter(Boolean),
    ];
    excludeTerms.forEach((w) => parts.push(`-${w}`));
    return parts.join(' ');
  }

  /**
   * `start` é 1-indexado (mesma convenção usada no resto do módulo);
   * convertido pra `page` do Serper (10 resultados por página).
   */
  async search(query: string, start: number): Promise<GoogleSearchResult[]> {
    if (!this.serperApiKey) {
      throw new ServiceUnavailableException(
        'Busca automática ainda não configurada: defina SERPER_API_KEY em apps/api/.env.',
      );
    }
    const page = Math.floor((start - 1) / 10) + 1;

    let res: Response;
    try {
      res = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: { 'X-API-KEY': this.serperApiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: query, gl: 'br', hl: 'pt', num: 10, page }),
      });
    } catch (err) {
      this.logger.error(`Falha ao chamar Serper: ${(err as Error).message}`);
      throw new ServiceUnavailableException('Não foi possível buscar agora — tente novamente em instantes.');
    }
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      this.logger.error(`Serper respondeu ${res.status}: ${body.slice(0, 300)}`);
      throw new ServiceUnavailableException('A busca falhou (cota excedida ou credencial inválida) — confira SERPER_API_KEY.');
    }
    const data = (await res.json()) as { organic?: { title: string; link: string; snippet: string }[] };
    return (data.organic ?? []).map((i) => ({ title: i.title, link: i.link, snippet: i.snippet }));
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
   * Só extrai o que está de fato na página — nunca inventa. Retorna uma
   * lista vazia se a IA não achar nenhum profissional identificável (evita
   * criar leads vazios a partir de páginas irrelevantes, ex: um curso).
   *
   * IMPORTANTE: muitos resultados de busca são páginas de DIRETÓRIO que
   * listam vários psicólogos ao mesmo tempo (ex: "Psicólogos em Sorocaba —
   * SP") — descartar essas páginas inteiras jogaria fora a maior parte dos
   * dados úteis, então a IA extrai TODOS os profissionais identificáveis
   * na página, não só um.
   */
  async extractCandidates(result: GoogleSearchResult): Promise<ExtractedCandidate[]> {
    if (!this.aiClient) {
      throw new ServiceUnavailableException('Extração por IA ainda não configurada: defina ANTHROPIC_API_KEY em apps/api/.env.');
    }
    const pageText = await this.fetchPageText(result.link);
    const context = `URL: ${result.link}\nTítulo: ${result.title}\nTrecho da busca: ${result.snippet}\n\nConteúdo da página:\n${pageText ?? '(não foi possível ler a página — use só o título/trecho)'}`;

    let response;
    try {
      response = await this.aiClient.messages.create({
        model: GoogleSearchProvider.EXTRACTION_MODEL,
        max_tokens: 1500,
        system:
          'Você extrai dados de contato PROFISSIONAL PÚBLICO de psicólogos a partir de uma página web, pro ' +
          'módulo de prospecção do Portal do Psi. A página pode ser sobre UM profissional específico OU um ' +
          'DIRETÓRIO listando VÁRIOS — extraia todos os que conseguir identificar com nome próprio claro. ' +
          'Responda em JSON estrito: {"candidates": [...]}, cada item com as chaves fullName, crp, city, ' +
          'state, specialties, approaches, audience, serviceMode, website, instagram, whatsapp, phone, ' +
          'publicEmail — todas opcionais exceto fullName. TODOS os valores são STRING simples, nunca array — ' +
          'quando houver mais de um item (ex: várias especialidades), junte numa única string separada por ' +
          'vírgula (ex: "Ansiedade, Depressão, Autoestima"), nunca ["Ansiedade","Depressão"]. Preencha APENAS ' +
          'o que estiver realmente escrito na página; nunca invente, nunca infira dado sensível. Se a página ' +
          'não tiver nenhuma pessoa identificável por nome (ex: página de curso, erro, ou lista sem nomes), ' +
          'responda {"candidates": []}.',
        messages: [{ role: 'user', content: context }],
      });
    } catch (err) {
      // Propositalmente NÃO engolido aqui: uma falha na chamada à Anthropic (ex: sem
      // crédito) afeta igualmente TODAS as páginas do lote — continuar tentando as
      // outras 9 só pra repetir o mesmo erro silenciosamente daria um falso "0
      // encontrados" em vez de avisar o admin do problema real. Ver executeSearchRequest.
      this.logger.error(`Falha na extração por IA de ${result.link}: ${(err as Error).message}`);
      throw new ServiceUnavailableException('Não foi possível analisar as páginas encontradas agora (falha na IA) — tente novamente em instantes.');
    }

    const block = response.content.find((c) => c.type === 'text');
    const raw = block?.type === 'text' ? block.text : '{}';
    try {
      const match = raw.match(/\{[\s\S]*\}/);
      const parsed = match ? JSON.parse(match[0]) : {};
      const candidates = Array.isArray(parsed.candidates) ? parsed.candidates : [];
      return candidates.filter((c: ExtractedCandidate) => Boolean(c?.fullName)).map(normalizeCandidate);
    } catch {
      return [];
    }
  }
}

/**
 * O prompt pede string simples, mas a IA às vezes devolve array mesmo assim
 * (ex: specialties: ["Ansiedade","Depressão"]) — todo campo aqui é `string?`
 * no schema (ver ExtractedCandidate/CreateProspectDto), e o Prisma rejeita
 * array/objeto de propósito (fail closed). Normaliza aqui, na fronteira com
 * a IA, em vez de confiar só na instrução do prompt.
 */
function normalizeCandidate(candidate: ExtractedCandidate): ExtractedCandidate {
  const normalized: Record<string, unknown> = { ...candidate };
  for (const [key, value] of Object.entries(normalized)) {
    if (Array.isArray(value)) {
      const joined = value.filter(Boolean).join(', ');
      normalized[key] = joined || undefined;
    } else if (value !== null && typeof value === 'object') {
      normalized[key] = undefined;
    } else if (value === '') {
      normalized[key] = undefined;
    }
  }
  // Todo lead precisa de WhatsApp no mínimo (regra confirmada com o usuário) — mas a
  // página às vezes só diz "Telefone: (11) 98888-7777" sem mencionar WhatsApp
  // explicitamente. No Brasil, celular (DDD + 9 dígitos, começando com 9) é
  // praticamente sempre WhatsApp-alcançável, então aproveita como tal em vez de
  // descartar um lead bom só por falta de rótulo na página.
  if (!normalized.whatsapp && typeof normalized.phone === 'string') {
    let digits = normalized.phone.replace(/\D/g, '');
    // Remove o código do país (+55) antes de checar o formato local — sem isso,
    // "+55 11 99999-8888" (13 dígitos) nunca batia com o padrão de celular
    // (DDD + 9 dígitos = 11 dígitos), e praticamente todo número em formato
    // internacional — comum em bio do Instagram — era rejeitado por engano.
    if ((digits.length === 12 || digits.length === 13) && digits.startsWith('55')) {
      digits = digits.slice(2);
    }
    const isBrMobile = digits.length === 11 && digits[2] === '9';
    if (isBrMobile) normalized.whatsapp = normalized.phone;
  }
  return normalized as unknown as ExtractedCandidate;
}
