import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface EmailRecipient {
  email: string;
  name?: string;
}

interface AppointmentEmailParams {
  patient: { email: string | null; name: string };
  professional: { email: string; name: string };
  startsAt: Date;
}

/**
 * E-mail transacional via Brevo (plano grátis, 300/dia — suficiente pro
 * volume de confirmação/lembrete de agendamento). Mesmo estágio dos outros
 * serviços externos (Asaas/Daily.co/Firebase): sem BREVO_API_KEY, o envio é
 * pulado silenciosamente — nunca deve derrubar o fluxo de agendamento por
 * causa de e-mail, por isso `send()` nunca lança, só loga o problema.
 */
@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly apiKey: string | undefined;
  private readonly senderEmail: string;
  private readonly senderName: string;

  constructor(private readonly config: ConfigService) {
    this.apiKey = this.config.get<string>('BREVO_API_KEY') || undefined;
    this.senderEmail = this.config.get<string>('EMAIL_SENDER_ADDRESS') ?? 'naoresponda@portaldopsi.com.br';
    this.senderName = this.config.get<string>('EMAIL_SENDER_NAME') ?? 'Portal do Psi';
    if (!this.apiKey) {
      this.logger.warn(
        'BREVO_API_KEY não configurada — envio de e-mail (confirmação/lembrete de agendamento) fica desativado até isso ser preenchido no .env.',
      );
    }
  }

  private async send(to: EmailRecipient, subject: string, htmlContent: string): Promise<void> {
    if (!this.apiKey) return;
    try {
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'api-key': this.apiKey, 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          sender: { email: this.senderEmail, name: this.senderName },
          to: [{ email: to.email, name: to.name }],
          subject,
          htmlContent,
        }),
      });
      if (!res.ok) {
        this.logger.warn(`Falha ao enviar e-mail pra ${to.email} (${res.status}): ${await res.text()}`);
      }
    } catch (err) {
      this.logger.warn(`Erro ao enviar e-mail pra ${to.email}: ${(err as Error).message}`);
    }
  }

  /** Sempre horário de Brasília na exibição — o processo roda em UTC no servidor. */
  private formatWhen(date: Date): string {
    return date.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  async sendBookingConfirmation(params: AppointmentEmailParams): Promise<void> {
    const when = this.formatWhen(params.startsAt);
    if (params.patient.email) {
      await this.send(
        { email: params.patient.email, name: params.patient.name },
        'Sessão confirmada — Portal do Psi',
        `<p>Olá, ${params.patient.name}!</p><p>Sua sessão com ${params.professional.name} foi confirmada para <strong>${when}</strong>.</p>`,
      );
    }
    await this.send(
      { email: params.professional.email, name: params.professional.name },
      'Sessão confirmada — Portal do Psi',
      `<p>Olá, ${params.professional.name}!</p><p>Sua sessão com ${params.patient.name} foi confirmada para <strong>${when}</strong>.</p>`,
    );
  }

  /** Link expira em 24h — ver AuthService.verifyEmail. Não bloqueia o uso do app, é uma pendência não-bloqueante. */
  async sendEmailVerification(params: { email: string; name: string; verifyUrl: string }): Promise<void> {
    await this.send(
      { email: params.email, name: params.name },
      'Confirme seu e-mail — Portal do Psi',
      `<p>Olá, ${params.name}!</p><p>Confirme seu e-mail pra concluir o cadastro no Portal do Psi:</p><p><a href="${params.verifyUrl}">${params.verifyUrl}</a></p><p>Esse link expira em 24 horas.</p>`,
    );
  }

  async sendReminder10Min(params: AppointmentEmailParams): Promise<void> {
    const when = this.formatWhen(params.startsAt);
    if (params.patient.email) {
      await this.send(
        { email: params.patient.email, name: params.patient.name },
        'Sua sessão começa em 10 minutos',
        `<p>Olá, ${params.patient.name}!</p><p>Sua sessão com ${params.professional.name} começa em 10 minutos (${when}).</p>`,
      );
    }
    await this.send(
      { email: params.professional.email, name: params.professional.name },
      'Sua sessão começa em 10 minutos',
      `<p>Olá, ${params.professional.name}!</p><p>Sua sessão com ${params.patient.name} começa em 10 minutos (${when}).</p>`,
    );
  }
}
