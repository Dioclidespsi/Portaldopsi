import { Injectable, Logger, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';

export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

const HISTORY_TURNS_SENT = 10;

/**
 * "IA Clínica" + "Assistente IA" do documento de arquitetura não são um
 * módulo à parte — são esta camada de serviço, chamada de dentro de outros
 * módulos (Prontuário, CRM, painel geral). Mesmo estágio que
 * apps/api/src/billing: sem ANTHROPIC_API_KEY, responde 503 em vez de
 * quebrar — nunca simula uma resposta de IA fabricada.
 *
 * Limite diário por clínica (AI_DAILY_LIMIT_PER_TENANT, ver
 * checkUsageLimit/recordUsage): antes não existia NENHUM controle de custo —
 * qualquer usuário podia chamar sem limite. Cada chamada é registrada em
 * AiUsageLog com os tokens reais devolvidos pela Anthropic.
 */
@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly client: Anthropic | null;
  private readonly model: string;
  private readonly dailyLimit: number;

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const key = config.get<string>('ANTHROPIC_API_KEY');
    this.client = key ? new Anthropic({ apiKey: key }) : null;
    this.model = config.get<string>('ANTHROPIC_MODEL', 'claude-sonnet-5');
    this.dailyLimit = Number(config.get<string>('AI_DAILY_LIMIT_PER_TENANT', '50'));
    if (!this.client) {
      this.logger.warn(
        'ANTHROPIC_API_KEY não configurada — endpoints de IA vão responder 503 até isso ser preenchido no .env.',
      );
    }
  }

  private requireClient(): Anthropic {
    if (!this.client) {
      throw new ServiceUnavailableException(
        'Assistente de IA ainda não configurado: defina ANTHROPIC_API_KEY em apps/api/.env com uma chave da sua própria conta Anthropic.',
      );
    }
    return this.client;
  }

  /** Um contador só, somando as 3 funções — mais simples de comunicar ao usuário do que 3 limites separados. */
  private async checkUsageLimit(): Promise<void> {
    const { tenantId } = getRequestContext();
    const since = new Date();
    since.setHours(0, 0, 0, 0);
    const usedToday = await this.prisma.forCurrentTenant().aiUsageLog.count({
      where: { tenantId, createdAt: { gte: since } },
    });
    if (usedToday >= this.dailyLimit) {
      throw new ServiceUnavailableException(
        `Limite diário de ${this.dailyLimit} chamadas de IA desta clínica foi atingido. Tente novamente amanhã.`,
      );
    }
  }

  private async recordUsage(feature: string, inputTokens: number, outputTokens: number): Promise<void> {
    const { tenantId, userId } = getRequestContext();
    await this.prisma.forCurrentTenant().aiUsageLog.create({
      data: { tenantId, userId, feature, inputTokens, outputTokens },
    });
  }

  async getUsageToday(): Promise<{ used: number; limit: number }> {
    const { tenantId } = getRequestContext();
    const since = new Date();
    since.setHours(0, 0, 0, 0);
    const used = await this.prisma.forCurrentTenant().aiUsageLog.count({ where: { tenantId, createdAt: { gte: since } } });
    return { used, limit: this.dailyLimit };
  }

  private async complete(system: string, messages: ChatTurn[]): Promise<{ text: string; inputTokens: number; outputTokens: number }> {
    const client = this.requireClient();
    let response;
    try {
      response = await client.messages.create({
        model: this.model,
        max_tokens: 1024,
        system,
        messages,
      });
    } catch (err) {
      this.logger.error(`Falha na chamada à Anthropic: ${(err as Error).message}`);
      throw new ServiceUnavailableException(
        'Não foi possível falar com o assistente de IA agora — tente novamente em instantes.',
      );
    }
    const block = response.content.find((c) => c.type === 'text');
    return {
      text: block?.type === 'text' ? block.text : '',
      inputTokens: response.usage?.input_tokens ?? 0,
      outputTokens: response.usage?.output_tokens ?? 0,
    };
  }

  /** Resumo de apoio para o psicólogo revisar — nunca substitui a leitura do prontuário completo. */
  async summarizeProntuario(patientId: string): Promise<string> {
    const tenantPrisma = this.prisma.forCurrentTenant();
    const patient = await tenantPrisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) throw new NotFoundException('Paciente não encontrado.');

    const entries = await tenantPrisma.prontuarioEntry.findMany({
      where: { patientId },
      orderBy: { createdAt: 'asc' },
      select: { content: true, createdAt: true },
    });

    if (entries.length === 0) {
      return 'Nenhuma entrada de prontuário para resumir ainda.';
    }

    await this.checkUsageLimit();

    const transcript = entries
      .map((e) => `[${e.createdAt.toLocaleDateString('pt-BR')}] ${e.content}`)
      .join('\n\n');

    const { text, inputTokens, outputTokens } = await this.complete(
      'Você ajuda um psicólogo clínico a revisar a evolução de um paciente antes de uma sessão. ' +
        'Resuma os pontos principais, padrões e mudanças ao longo do tempo, em português, de forma objetiva. ' +
        'Não faça diagnóstico nem sugira conduta — é apoio de leitura, a decisão clínica é do psicólogo.',
      [{ role: 'user', content: transcript }],
    );
    await this.recordUsage('prontuario_summary', inputTokens, outputTokens);
    return text;
  }

  /** Rascunho de mensagem de retomada de contato pro CRM — o psicólogo revisa e envia manualmente, nunca é disparado sozinho. */
  async suggestLeadFollowUp(lead: { name: string; stage: string; source?: string | null; notes?: string | null }): Promise<string> {
    await this.checkUsageLimit();
    const { text, inputTokens, outputTokens } = await this.complete(
      'Você ajuda um psicólogo a escrever uma mensagem curta (2-4 frases) de retomada de contato com um ' +
        'lead interessado em terapia, em português, tom acolhedor e profissional, sem prometer resultado ' +
        'de tratamento. A mensagem é só um rascunho — o psicólogo revisa e decide se envia.',
      [{ role: 'user', content: `Nome do lead: ${lead.name}\nEstágio no funil: ${lead.stage}\nOrigem: ${lead.source ?? 'não informada'}\nAnotações: ${lead.notes ?? 'nenhuma'}` }],
    );
    await this.recordUsage('lead_followup', inputTokens, outputTokens);
    return text;
  }

  /**
   * Assistente administrativo geral — sem acesso a nenhum dado de paciente,
   * de propósito (nem por parâmetro: só recebe texto solto). `history` é
   * mantido pelo cliente (sem tabela de conversa no banco) — as últimas
   * HISTORY_TURNS_SENT trocas são reenviadas a cada pergunta pra dar
   * continuidade, sem crescer o custo por chamada indefinidamente.
   */
  async ask(question: string, history: ChatTurn[] = []): Promise<string> {
    await this.checkUsageLimit();
    const messages: ChatTurn[] = [...history.slice(-HISTORY_TURNS_SENT), { role: 'user', content: question }];
    const { text, inputTokens, outputTokens } = await this.complete(
      'Você é o assistente administrativo do Portal do Psi, uma plataforma de gestão de clínica de ' +
        'psicologia. Ajude com dúvidas gerais de uso da plataforma, organização de agenda, financeiro e ' +
        'gestão de clínica. Você NÃO tem acesso a nenhum dado de paciente — se perguntarem sobre um ' +
        'paciente específico, explique que isso precisa ser consultado direto no Prontuário. Responda em português.',
      messages,
    );
    await this.recordUsage('ask', inputTokens, outputTokens);
    return text;
  }
}
