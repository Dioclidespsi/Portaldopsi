import { Injectable, Logger, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';
import { Prisma, ProspectProfessional } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProspectDto } from './dto/create-prospect.dto';
import { UpdateProspectDto } from './dto/update-prospect.dto';
import { ListProspectsDto } from './dto/list-prospects.dto';
import { GoogleSearchProvider } from './google-search.provider';
import { createAnthropicClient } from '../common/anthropic-client';

/** Quantos resultados a IA/Google processam por chamada de `execute` — nunca o pedido inteiro de uma vez (item 21 do spec: consciência de custo, sem timeout). */
const EXECUTE_BATCH_SIZE = 10;

/** Uma entrada do "porquê" de cada score — ver item 27 do spec (nunca só o número). */
export interface ScoreReason {
  label: string;
  points: number;
  max: number;
  reason: string;
}

/**
 * Módulo de Prospecção Inteligente de Profissionais — nível de PLATAFORMA,
 * time do Portal do Psi buscando psicólogos que ainda não são clientes.
 * Sem tenantId (mesma família de CampaignLead, ver schema.prisma) — usa o
 * PrismaService direto, sem forTenant()/forSystem(), porque não há policy
 * de RLS pra esta tabela (nunca é filtrada por clínica).
 *
 * Contato é sempre manual — este service nunca envia mensagem nenhuma, só
 * organiza dados e sugere. O "ManualCommunicationProvider" do documento de
 * arquitetura é, nesta fase, o próprio botão de copiar/abrir no frontend
 * (ver apps/web/lib/contactChannels.ts) + o registro de atividade aqui
 * (addActivity) — não existe ainda nenhum backend de envio automatizado
 * (WhatsApp Business/Instagram Graph API), só o ponto de extensão
 * documentado pra quando isso for contratado.
 */
@Injectable()
export class AdminProspectingService {
  private readonly logger = new Logger(AdminProspectingService.name);
  private readonly aiClient: Anthropic | null;
  private readonly aiModel: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly googleSearch: GoogleSearchProvider,
  ) {
    const key = this.config.get<string>('ANTHROPIC_API_KEY');
    this.aiClient = key ? createAnthropicClient(key, this.config) : null;
    this.aiModel = this.config.get<string>('ANTHROPIC_MODEL', 'claude-sonnet-5');
    if (!this.aiClient) {
      this.logger.warn(
        'ANTHROPIC_API_KEY não configurada — qualificação por IA de prospecção vai responder 503 até isso ser preenchido no .env.',
      );
    }
  }

  /** Normaliza texto pra comparação de duplicidade — minúsculo, sem acento, sem pontuação. */
  private normalize(value: string | undefined | null): string {
    if (!value) return '';
    return value
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
  }

  private normalizePhone(value: string | undefined | null): string {
    return (value ?? '').replace(/\D/g, '');
  }

  private normalizeHandle(value: string | undefined | null): string {
    if (!value) return '';
    return this.normalize(value.replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/^@/, ''));
  }

  private normalizeUrl(value: string | undefined | null): string {
    if (!value) return '';
    return this.normalize(value.replace(/^https?:\/\/(www\.)?/i, '').split('/')[0]);
  }

  /**
   * Chave de dedup (item 17 do spec) — combinação de identificadores
   * legítimos. Vazio quando não há NENHUM identificador forte (evita marcar
   * "duplicado" só por cidade batendo), pra não perder leads distintos com
   * dados incompletos.
   */
  buildDedupKey(data: { fullName: string; whatsapp?: string; phone?: string; website?: string; instagram?: string; city?: string }): string | null {
    const name = this.normalize(data.fullName);
    const phone = this.normalizePhone(data.whatsapp || data.phone);
    const site = this.normalizeUrl(data.website);
    const ig = this.normalizeHandle(data.instagram);
    const city = this.normalize(data.city);
    if (!phone && !site && !ig) return null; // sem identificador forte — não arrisca dedup falso-positivo
    return [name, phone, site, ig, city].join('|');
  }

  /**
   * Lead Score determinístico e explicável (itens 7 e 27 do spec) — pesos
   * fixos por enquanto; documentado como "a configurar pelo admin" no
   * futuro, não implementado ainda por não ter sido pedido (item 30).
   */
  computeScore(p: Pick<ProspectProfessional,
    'crp' | 'specialties' | 'approaches' | 'website' | 'instagram' | 'facebook' | 'linkedin' | 'googleBusinessUrl' |
    'hasOnlineBooking' | 'hasContactForm' | 'serviceMode' | 'audience' | 'publicEmail' | 'phone' | 'whatsapp'
  >): { total: number; breakdown: ScoreReason[] } {
    const breakdown: ScoreReason[] = [];

    // Perfil profissional — 20
    let perfil = 0;
    if (p.crp) { perfil += 8; breakdown.push({ label: 'CRP identificado', points: 8, max: 8, reason: 'Atuação profissional verificável.' }); }
    if (p.specialties) { perfil += 6; breakdown.push({ label: 'Especialidade informada', points: 6, max: 6, reason: 'Atuação clínica claramente identificada.' }); }
    if (p.approaches) { perfil += 6; breakdown.push({ label: 'Abordagem informada', points: 6, max: 6, reason: 'Especialização/abordagem identificável.' }); }

    // Presença digital — 20
    let presenca = 0;
    if (p.website) { presenca += 7; breakdown.push({ label: 'Possui site', points: 7, max: 7, reason: 'Presença digital própria.' }); }
    if (p.instagram) { presenca += 7; breakdown.push({ label: 'Possui Instagram', points: 7, max: 7, reason: 'Presença profissional ativa.' }); }
    if (p.facebook || p.linkedin || p.googleBusinessUrl) { presenca += 6; breakdown.push({ label: 'Outra presença digital', points: 6, max: 6, reason: 'Facebook/LinkedIn/Google Business identificado.' }); }

    // Necessidade de estrutura digital — 25 (recompensa lacunas, não presença)
    let necessidade = 0;
    if (!p.website) { necessidade += 10; breakdown.push({ label: 'Sem site próprio', points: 10, max: 10, reason: 'Presença digital limitada — oportunidade identificada.' }); }
    if (!p.hasOnlineBooking) { necessidade += 8; breakdown.push({ label: 'Sem agenda online', points: 8, max: 8, reason: 'Ausência de sistema evidente de agendamento.' }); }
    if (!p.hasContactForm) { necessidade += 7; breakdown.push({ label: 'Sem formulário de contato', points: 7, max: 7, reason: 'Baixa capacidade de conversão aparente.' }); }

    // Potencial de utilização do Portal do Psi — 20
    let potencial = 0;
    const mode = (p.serviceMode ?? '').toLowerCase();
    if (mode.includes('online') || mode.includes('hibrid') || mode.includes('híbrid')) { potencial += 10; breakdown.push({ label: 'Atende online', points: 10, max: 10, reason: 'Compatível com agenda/teleconsulta do Portal do Psi.' }); }
    if (p.specialties || p.approaches) { potencial += 5; breakdown.push({ label: 'Atuação estruturada', points: 5, max: 5, reason: 'Perfil profissional já organizado.' }); }
    if (p.audience) { potencial += 5; breakdown.push({ label: 'Público-alvo definido', points: 5, max: 5, reason: 'Nicho claro para posicionamento.' }); }

    // Facilidade de contato — 15
    let contato = 0;
    if (p.publicEmail) { contato += 4; breakdown.push({ label: 'E-mail público', points: 4, max: 4, reason: 'Canal de contato disponível.' }); }
    if (p.phone) { contato += 3; breakdown.push({ label: 'Telefone público', points: 3, max: 3, reason: 'Canal de contato disponível.' }); }
    if (p.whatsapp) { contato += 4; breakdown.push({ label: 'WhatsApp público', points: 4, max: 4, reason: 'Canal de contato direto disponível.' }); }
    if (p.instagram) { contato += 4; breakdown.push({ label: 'Instagram para contato', points: 4, max: 4, reason: 'Canal de contato direto disponível.' }); }

    return { total: perfil + presenca + necessidade + potencial + contato, breakdown };
  }

  priorityLabel(score: number | null): string {
    if (score === null) return 'Não avaliado';
    if (score >= 90) return '🔥 Prioridade máxima';
    if (score >= 75) return '🟢 Alta prioridade';
    if (score >= 60) return '🟡 Média prioridade';
    if (score >= 40) return '⚪ Baixa prioridade';
    return '🔴 Descartar/revisar';
  }

  async create(dto: CreateProspectDto) {
    const dedupKey = this.buildDedupKey(dto);

    if (dedupKey) {
      const blocked = await this.prisma.prospectBlocklist.findUnique({ where: { dedupKey } });
      if (blocked) {
        // Item 19 do spec — nunca recria alguém que já pediu pra não ser mais contatado,
        // mesmo que o registro original já tenha sido removido de vez.
        return { prospect: null, matchedExisting: false, blocked: true as const };
      }

      const existing = await this.prisma.prospectProfessional.findUnique({ where: { dedupKey } });
      if (existing) {
        // Já existe — não duplica (item 17), só registra a nova fonte e atualiza campos vazios.
        const merged = await this.prisma.prospectProfessional.update({
          where: { id: existing.id },
          data: {
            lastVerifiedAt: new Date(),
            website: existing.website ?? dto.website,
            instagram: existing.instagram ?? dto.instagram,
            whatsapp: existing.whatsapp ?? dto.whatsapp,
            phone: existing.phone ?? dto.phone,
            publicEmail: existing.publicEmail ?? dto.publicEmail,
          },
        });
        await this.addActivity(existing.id, `Encontrado novamente via fonte "${dto.source ?? 'não informada'}" — dados conferidos, sem duplicar.`);
        return { prospect: merged, matchedExisting: true, blocked: false as const };
      }
    }

    const created = await this.prisma.prospectProfessional.create({
      data: { ...dto, dedupKey },
    });
    const { total, breakdown } = this.computeScore(created);
    const scored = await this.prisma.prospectProfessional.update({
      where: { id: created.id },
      data: { score: total, scoreBreakdown: breakdown as unknown as Prisma.InputJsonValue },
    });
    return { prospect: scored, matchedExisting: false, blocked: false as const };
  }

  /**
   * Remove de vez E impede que a mesma pessoa volte como lead "novo" numa
   * pesquisa futura (item 19 do spec) — preserva só a dedupKey, não o
   * perfil completo. Diferente de `remove()`, que é só limpeza (ex: dado
   * de teste/erro de digitação) e não bloqueia reaquisição.
   */
  async block(id: string, reason?: string) {
    const existing = await this.prisma.prospectProfessional.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Profissional não encontrado.');
    if (existing.dedupKey) {
      await this.prisma.prospectBlocklist.upsert({
        where: { dedupKey: existing.dedupKey },
        create: { dedupKey: existing.dedupKey, reason },
        update: { reason },
      });
    }
    await this.prisma.prospectProfessional.delete({ where: { id } });
    return { blocked: true };
  }

  async listSearchRequests() {
    return this.prisma.prospectSearchRequest.findMany({ orderBy: { createdAt: 'desc' } });
  }

  /**
   * Limpa só o HISTÓRICO de pesquisas (a fila de "pedidos de busca" em si) —
   * ProspectSearchRequest não tem nenhuma relação com ProspectProfessional
   * (os leads extraídos viram registros independentes), então apagar isso
   * nunca afeta um lead já classificado. PENDENTE/EM_ANDAMENTO ficam de fora
   * de propósito — só concluída/cancelada é "histórico" de verdade.
   */
  async deleteFinishedSearchRequests() {
    const { count } = await this.prisma.prospectSearchRequest.deleteMany({
      where: { status: { in: ['CONCLUIDA', 'CANCELADA'] } },
    });
    return { deleted: count };
  }

  createSearchRequest(data: {
    city?: string; state?: string; specialty?: string; approach?: string; audience?: string;
    serviceMode?: string; includeKeywords?: string; excludeKeywords?: string; quantity?: number;
  }) {
    return this.prisma.prospectSearchRequest.create({ data });
  }

  async updateSearchRequestStatus(id: string, status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA', resultCount?: number, notes?: string) {
    const existing = await this.prisma.prospectSearchRequest.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Pedido de pesquisa não encontrado.');
    return this.prisma.prospectSearchRequest.update({
      where: { id },
      data: {
        status,
        resultCount: resultCount ?? existing.resultCount,
        notes: notes ?? existing.notes,
        completedAt: status === 'CONCLUIDA' ? new Date() : existing.completedAt,
      },
    });
  }

  /**
   * Executa UM LOTE (até EXECUTE_BATCH_SIZE) do pedido de pesquisa via
   * Google Custom Search + extração por IA (ver GoogleSearchProvider),
   * reaproveitando `create()` pra dedup/score — nenhuma lógica duplicada.
   * Clique de novo em "Executar" continua de `offset` em diante até
   * atingir `quantity`. Nunca processa o pedido inteiro de uma vez (evita
   * timeout e gasto de cota descontrolado — item 21 do spec).
   */
  async executeSearchRequest(id: string) {
    const req = await this.prisma.prospectSearchRequest.findUnique({ where: { id } });
    if (!req) throw new NotFoundException('Pedido de pesquisa não encontrado.');
    if (req.status === 'CONCLUIDA' || req.status === 'CANCELADA') {
      throw new NotFoundException('Este pedido já foi concluído ou cancelado.');
    }

    await this.prisma.prospectSearchRequest.update({ where: { id }, data: { status: 'EM_ANDAMENTO' } });

    const query = this.googleSearch.buildQuery(req);
    let results: Awaited<ReturnType<GoogleSearchProvider['search']>>;
    try {
      results = await this.googleSearch.search(query, req.offset + 1);
    } catch (err) {
      // Falhou antes de processar qualquer coisa (ex: sem credencial) — volta pro estado
      // anterior em vez de deixar "Em andamento" travado sem opção de cancelar na tela.
      await this.prisma.prospectSearchRequest.update({ where: { id }, data: { status: req.status } });
      throw err;
    }

    let created = 0;
    let blocked = 0;
    let skipped = 0;
    let processed = 0; // quantos itens de `results` chegaram a ser totalmente processados
    try {
      for (const result of results) {
        if (req.resultCount + created >= req.quantity) break;
        // Filtro barato antes de gastar IA — vídeo/PDF/curso nunca vira lead de verdade.
        if (this.googleSearch.shouldSkip(result.link)) { skipped++; processed++; continue; }
        // Uma página pode listar vários profissionais (diretório) — ver GoogleSearchProvider.extractCandidates.
        const candidates = await this.googleSearch.extractCandidates(result);
        if (candidates.length === 0) { skipped++; processed++; continue; }
        for (const candidate of candidates) {
          if (req.resultCount + created >= req.quantity) break;
          const outcome = await this.create({
            ...candidate,
            source: `Serper — pedido "${query}"`,
            sourceUrl: result.link,
          } as CreateProspectDto);
          if (outcome.blocked) blocked++;
          else if (!outcome.matchedExisting) created++;
        }
        processed++;
      }
    } catch (err) {
      // Falha real (ex: IA sem crédito) no meio do lote — salva o progresso PARCIAL já
      // feito até aqui (create() já persistiu no banco) em vez de descartar, mas nunca
      // marca como "concluída": o admin vê o erro de verdade e pode tentar de novo.
      await this.prisma.prospectSearchRequest.update({
        where: { id },
        data: {
          resultCount: req.resultCount + created,
          offset: req.offset + processed,
          status: 'EM_ANDAMENTO',
          notes: `Lote interrompido por erro: ${created} novo(s) antes de falhar. ${(err as Error).message}`,
        },
      });
      throw err;
    }

    const newResultCount = req.resultCount + created;
    const newOffset = req.offset + results.length;
    const done = newResultCount >= req.quantity || results.length === 0;

    return this.prisma.prospectSearchRequest.update({
      where: { id },
      data: {
        resultCount: newResultCount,
        offset: newOffset,
        status: done ? 'CONCLUIDA' : 'EM_ANDAMENTO',
        completedAt: done ? new Date() : null,
        notes: `Último lote: ${created} novo(s), ${blocked} bloqueado(s), ${skipped} página(s) sem profissional identificável.`,
      },
    });
  }

  async list(query: ListProspectsDto) {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 50;
    const where: Prisma.ProspectProfessionalWhereInput = {
      doNotContact: false,
      stage: query.stage,
      city: query.city ? { equals: query.city, mode: 'insensitive' } : undefined,
      state: query.state ? { equals: query.state, mode: 'insensitive' } : undefined,
      score: query.minScore !== undefined ? { gte: query.minScore } : undefined,
      website: query.hasWebsite === 'true' ? { not: null } : query.hasWebsite === 'false' ? null : undefined,
      instagram: query.hasInstagram === 'true' ? { not: null } : query.hasInstagram === 'false' ? null : undefined,
      whatsapp: query.hasWhatsapp === 'true' ? { not: null } : query.hasWhatsapp === 'false' ? null : undefined,
      ...(query.search
        ? {
            OR: [
              { fullName: { contains: query.search, mode: 'insensitive' } },
              { city: { contains: query.search, mode: 'insensitive' } },
              { specialties: { contains: query.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.prospectProfessional.findMany({
        where,
        orderBy: [{ score: 'desc' }, { createdAt: 'desc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.prospectProfessional.count({ where }),
    ]);

    return { items, total, page, pageSize };
  }

  async findOne(id: string) {
    const prospect = await this.prisma.prospectProfessional.findUnique({
      where: { id },
      include: { activities: { orderBy: { createdAt: 'asc' } } },
    });
    if (!prospect) throw new NotFoundException('Profissional não encontrado.');
    return prospect;
  }

  async update(id: string, dto: UpdateProspectDto) {
    const existing = await this.prisma.prospectProfessional.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Profissional não encontrado.');
    return this.prisma.prospectProfessional.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const existing = await this.prisma.prospectProfessional.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Profissional não encontrado.');
    await this.prisma.prospectProfessional.delete({ where: { id } });
    return { deleted: true };
  }

  async recomputeScore(id: string) {
    const existing = await this.prisma.prospectProfessional.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Profissional não encontrado.');
    const { total, breakdown } = this.computeScore(existing);
    return this.prisma.prospectProfessional.update({
      where: { id },
      data: { score: total, scoreBreakdown: breakdown as unknown as Prisma.InputJsonValue },
    });
  }

  async listActivities(prospectId: string) {
    const existing = await this.prisma.prospectProfessional.findUnique({ where: { id: prospectId } });
    if (!existing) throw new NotFoundException('Profissional não encontrado.');
    return this.prisma.prospectActivity.findMany({ where: { prospectId }, orderBy: { createdAt: 'asc' } });
  }

  async addActivity(prospectId: string, content: string, createdBy?: string) {
    const existing = await this.prisma.prospectProfessional.findUnique({ where: { id: prospectId } });
    if (!existing) throw new NotFoundException('Profissional não encontrado.');
    return this.prisma.prospectActivity.create({ data: { prospectId, content, createdBy } });
  }

  async getFunnelReport() {
    const rows = await this.prisma.prospectProfessional.groupBy({
      by: ['stage'],
      _count: { _all: true },
      where: { doNotContact: false },
    });
    const countByStage: Record<string, number> = {};
    let total = 0;
    for (const row of rows) {
      countByStage[row.stage] = row._count._all;
      total += row._count._all;
    }
    const cadastrados = countByStage.CADASTRADO ?? 0;
    const prioridadeMaxima = await this.prisma.prospectProfessional.count({ where: { score: { gte: 90 }, doNotContact: false } });
    const altaPrioridade = await this.prisma.prospectProfessional.count({ where: { score: { gte: 75, lt: 90 }, doNotContact: false } });

    return {
      total,
      countByStage,
      prioridadeMaxima,
      altaPrioridade,
      conversionRate: total > 0 ? cadastrados / total : 0,
    };
  }

  /**
   * Qualificação por IA (item 9 do spec) — resumo + oportunidade + estratégia
   * sugerida. Nunca envia nada, nunca afirma "precisa" (linguagem
   * probabilística, ver prompt abaixo) — só apoia a decisão do admin.
   */
  async qualifyWithAi(id: string) {
    if (!this.aiClient) {
      throw new ServiceUnavailableException(
        'Qualificação por IA ainda não configurada: defina ANTHROPIC_API_KEY em apps/api/.env.',
      );
    }
    const prospect = await this.prisma.prospectProfessional.findUnique({ where: { id } });
    if (!prospect) throw new NotFoundException('Profissional não encontrado.');

    const context = [
      `Nome: ${prospect.fullName}`,
      `Cidade/Estado: ${prospect.city ?? '-'}/${prospect.state ?? '-'}`,
      `Especialidades: ${prospect.specialties ?? 'não informado'}`,
      `Abordagens: ${prospect.approaches ?? 'não informado'}`,
      `Público: ${prospect.audience ?? 'não informado'}`,
      `Modalidade de atendimento: ${prospect.serviceMode ?? 'não informado'}`,
      `Site: ${prospect.website ?? 'não possui'}`,
      `Instagram: ${prospect.instagram ?? 'não possui'}`,
      `Possui agenda online: ${prospect.hasOnlineBooking ? 'sim' : 'não identificado'}`,
      `Possui formulário de contato: ${prospect.hasContactForm ? 'sim' : 'não identificado'}`,
      `Lead Score: ${prospect.score ?? 'não calculado'}`,
    ].join('\n');

    let response;
    try {
      response = await this.aiClient.messages.create({
        model: this.aiModel,
        max_tokens: 700,
        system:
          'Você ajuda a equipe do Portal do Psi (plataforma de gestão para psicólogos) a avaliar se um ' +
          'profissional encontrado publicamente na internet pode ter interesse em criar uma página ' +
          'profissional na plataforma. Responda em português, em JSON estrito com as chaves "resumo" ' +
          '(2-3 frases sobre a atuação do profissional), "oportunidade" (uma palavra: Alta, Média ou Baixa) ' +
          'e "estrategia" (1-2 frases de abordagem sugerida). Use sempre linguagem probabilística ' +
          '("potencial de adesão", "oportunidade identificada") — NUNCA afirme que o profissional ' +
          '"precisa" da ferramenta. Não invente dados que não foram fornecidos.',
        messages: [{ role: 'user', content: context }],
      });
    } catch (err) {
      this.logger.error(`Falha na chamada à Anthropic (qualificação de prospecção): ${(err as Error).message}`);
      throw new ServiceUnavailableException('Não foi possível qualificar este profissional agora — tente novamente em instantes.');
    }

    const block = response.content.find((c) => c.type === 'text');
    const raw = block?.type === 'text' ? block.text : '{}';
    let parsed: { resumo?: string; oportunidade?: string; estrategia?: string } = {};
    try {
      const match = raw.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : {};
    } catch {
      this.logger.warn('Resposta da IA de qualificação não veio em JSON válido — salvando texto bruto no resumo.');
      parsed = { resumo: raw };
    }

    return this.prisma.prospectProfessional.update({
      where: { id },
      data: {
        aiSummary: parsed.resumo ?? null,
        aiOpportunity: parsed.oportunidade ?? null,
        aiStrategy: parsed.estrategia ?? null,
        aiQualifiedAt: new Date(),
      },
    });
  }
}
