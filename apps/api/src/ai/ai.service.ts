import { Injectable, Logger, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';
import { PrismaService } from '../prisma/prisma.service';

/**
 * "IA Clínica" + "Assistente IA" do documento de arquitetura não são um
 * módulo à parte — são esta camada de serviço, chamada de dentro de outros
 * módulos (Prontuário, Marketing, painel geral). Mesmo estágio que
 * apps/api/src/billing: sem ANTHROPIC_API_KEY, responde 503 em vez de
 * quebrar — nunca simula uma resposta de IA fabricada.
 */
@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly client: Anthropic | null;
  private readonly model: string;

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const key = config.get<string>('ANTHROPIC_API_KEY');
    this.client = key ? new Anthropic({ apiKey: key }) : null;
    this.model = config.get<string>('ANTHROPIC_MODEL', 'claude-sonnet-5');
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

  private async complete(system: string, userMessage: string): Promise<string> {
    const client = this.requireClient();
    const response = await client.messages.create({
      model: this.model,
      max_tokens: 1024,
      system,
      messages: [{ role: 'user', content: userMessage }],
    });
    const block = response.content.find((c) => c.type === 'text');
    return block?.type === 'text' ? block.text : '';
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

    const transcript = entries
      .map((e) => `[${e.createdAt.toLocaleDateString('pt-BR')}] ${e.content}`)
      .join('\n\n');

    return this.complete(
      'Você ajuda um psicólogo clínico a revisar a evolução de um paciente antes de uma sessão. ' +
        'Resuma os pontos principais, padrões e mudanças ao longo do tempo, em português, de forma objetiva. ' +
        'Não faça diagnóstico nem sugira conduta — é apoio de leitura, a decisão clínica é do psicólogo.',
      transcript,
    );
  }

  /** Sugestão de reescrita evitando as frases já sinalizadas pelo checklist de compliance (marketing/compliance/rules.ts). */
  async suggestCompliantRewrite(content: string, flagReasons: string[]): Promise<string> {
    return this.complete(
      'Você ajuda um psicólogo a reescrever uma peça de divulgação profissional para respeitar a ' +
        'Resolução CFP nº 03/2007 e a Nota Técnica nº 01/2022 (publicidade profissional), mantendo a ' +
        'mensagem. Não prometa cura nem resultado garantido. Responda só com o texto reescrito, em português.',
      `Texto original:\n${content}\n\nProblemas apontados:\n${flagReasons.join('\n')}`,
    );
  }

  /** Rascunho de mensagem de retomada de contato pro CRM — o psicólogo revisa e envia manualmente, nunca é disparado sozinho. */
  async suggestLeadFollowUp(lead: { name: string; stage: string; source?: string | null; notes?: string | null }): Promise<string> {
    return this.complete(
      'Você ajuda um psicólogo a escrever uma mensagem curta (2-4 frases) de retomada de contato com um ' +
        'lead interessado em terapia, em português, tom acolhedor e profissional, sem prometer resultado ' +
        'de tratamento. A mensagem é só um rascunho — o psicólogo revisa e decide se envia.',
      `Nome do lead: ${lead.name}\nEstágio no funil: ${lead.stage}\nOrigem: ${lead.source ?? 'não informada'}\nAnotações: ${lead.notes ?? 'nenhuma'}`,
    );
  }

  /** Assistente administrativo geral — sem acesso a dado de paciente, de propósito. */
  async ask(question: string): Promise<string> {
    return this.complete(
      'Você é o assistente administrativo do Portal do Psi, uma plataforma de gestão de clínica de ' +
        'psicologia. Ajude com dúvidas gerais de uso da plataforma, organização de agenda, financeiro e ' +
        'gestão de clínica. Você NÃO tem acesso a nenhum dado de paciente — se perguntarem sobre um ' +
        'paciente específico, explique que isso precisa ser consultado direto no Prontuário. Responda em português.',
      question,
    );
  }
}
