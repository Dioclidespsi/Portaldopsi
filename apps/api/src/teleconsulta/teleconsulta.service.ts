import { ForbiddenException, Injectable, Logger, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';

interface RoomLike {
  videoRoomUrl: string | null;
  videoRoomName: string | null;
  endsAt: Date;
}

/**
 * Teleconsulta via Daily.co (decisão registrada no doc de arquitetura, §08).
 * Mesmo estágio que billing/ai: sem DAILY_API_KEY, responde 503. A sala só é
 * exposta ao paciente (Aplicativo do Paciente) depois de
 * Appointment.consentAt ser preenchido — ver patient-portal, requisito da
 * Resolução CFP nº 11/2018.
 *
 * A sala é criada com `privacy: 'private'` — entrar só com a URL crua dá
 * "You are not allowed to join this meeting". Toda entrada (equipe ou
 * paciente) precisa de um meeting token de curta duração (mintJoinUrl),
 * nunca reaproveita o mesmo link pros dois lados: o token amarra o papel
 * (is_owner) de quem está entrando.
 */
@Injectable()
export class TeleconsultaService {
  private readonly logger = new Logger(TeleconsultaService.name);
  private readonly apiKey: string | undefined;

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.apiKey = this.config.get<string>('DAILY_API_KEY') || undefined;
    if (!this.apiKey) {
      this.logger.warn(
        'DAILY_API_KEY não configurada — criação de sala de Teleconsulta vai responder 503 até isso ser preenchido no .env.',
      );
    }
  }

  /**
   * `tenantId` explícito é obrigatório pro fluxo de agendamento público
   * (BookingService), que não tem RequestContext (visitante não autenticado)
   * — mesmo padrão de AsaasService.createSplitCharge. Rotas autenticadas
   * (criação manual pela equipe) continuam sem passar o parâmetro.
   */
  async createRoom(appointmentId: string, tenantId?: string) {
    if (!this.apiKey) {
      throw new ServiceUnavailableException(
        'Teleconsulta ainda não configurada: defina DAILY_API_KEY em apps/api/.env com uma chave da sua própria conta Daily.co.',
      );
    }

    const tenantPrisma = this.prisma.forTenant(tenantId ?? getRequestContext().tenantId);
    const appointment = await tenantPrisma.appointment.findUnique({ where: { id: appointmentId } });
    if (!appointment) throw new NotFoundException('Agendamento não encontrado.');

    const roomName = `portal-do-psi-${appointment.id}`;
    // +1h de folga sobre o fim da sessão — mas nunca menos de 1h a partir de AGORA: pra sessões
    // criadas/atrasadas no mesmo dia, endsAt+1h pode já ter passado, e o Daily.co rejeita
    // "exp is in the past" na criação da sala (bug real visto em produção em 2026-08-03).
    const expiresAt = Math.max(
      Math.floor(new Date(appointment.endsAt).getTime() / 1000) + 60 * 60,
      Math.floor(Date.now() / 1000) + 60 * 60,
    );

    // Sem gravação por padrão — de propósito: gravar sessão de psicoterapia é
    // uma decisão clínica/ética que exige consentimento explícito do
    // paciente, nunca um efeito colateral automático da sala. Também exigiria
    // plano pago do Daily.co (o tier gratuito rejeita enable_recording).
    //
    // `enable_prejoin_ui: true` — tela de teste de câmera/microfone antes de
    // entrar de fato na chamada, pros dois lados (paciente e profissional).
    const res = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: roomName,
        privacy: 'private',
        properties: { exp: expiresAt, enable_prejoin_ui: true },
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new ServiceUnavailableException(`Falha ao criar sala no Daily.co: ${body}`);
    }

    const room = (await res.json()) as { url: string; name: string };
    return tenantPrisma.appointment.update({
      where: { id: appointmentId },
      data: { videoRoomUrl: room.url, videoRoomName: room.name },
    });
  }

  /** Gera um meeting token de curta duração e devolve a URL pronta pra entrar na sala (`${url}?t=${token}`). */
  async mintJoinUrl(appointment: RoomLike, opts: { isOwner: boolean; userName?: string }): Promise<string> {
    if (!this.apiKey) {
      throw new ServiceUnavailableException(
        'Teleconsulta ainda não configurada: defina DAILY_API_KEY em apps/api/.env com uma chave da sua própria conta Daily.co.',
      );
    }
    if (!appointment.videoRoomUrl || !appointment.videoRoomName) {
      throw new ForbiddenException('Nenhuma sala de teleconsulta foi criada para este agendamento ainda.');
    }

    // Mesma folga (e a mesma correção de "nunca no passado") da criação da sala.
    const exp = Math.max(
      Math.floor(appointment.endsAt.getTime() / 1000) + 60 * 60,
      Math.floor(Date.now() / 1000) + 60 * 60,
    );
    const res = await fetch('https://api.daily.co/v1/meeting-tokens', {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        properties: {
          room_name: appointment.videoRoomName,
          exp,
          is_owner: opts.isOwner,
          // Nível de token tem prioridade sobre sala/domínio (doc oficial da
          // Daily) — é o jeito confiável de forçar português, mais garantido
          // que só o parâmetro ?lang= na URL do cliente.
          lang: 'pt-BR',
          ...(opts.userName ? { user_name: opts.userName } : {}),
        },
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new ServiceUnavailableException(`Falha ao gerar acesso à sala no Daily.co: ${body}`);
    }

    const { token } = (await res.json()) as { token: string };
    return `${appointment.videoRoomUrl}?t=${token}`;
  }

  /** Link de entrada pro lado da equipe (is_owner: true — pode moderar a sala). */
  async getStaffJoinLink(appointmentId: string, userName?: string) {
    const tenantPrisma = this.prisma.forCurrentTenant();
    const appointment = await tenantPrisma.appointment.findUnique({ where: { id: appointmentId } });
    if (!appointment) throw new NotFoundException('Agendamento não encontrado.');
    const url = await this.mintJoinUrl(appointment, { isOwner: true, userName });
    return { url };
  }

  /**
   * Link de entrada pro PACIENTE (is_owner: false), gerado manualmente pela equipe — pra mandar por
   * WhatsApp/e-mail quando o fluxo automático dentro do app do paciente falhar por qualquer motivo
   * (rede, navegador embutido de outro app, etc.). Nunca reaproveitar o link do profissional
   * (getStaffJoinLink) pra isso: aquele token dá papel de moderador — mandar ele pro paciente
   * entrega o controle da sala pra quem não deveria ter.
   */
  async getPatientJoinLink(appointmentId: string) {
    const tenantPrisma = this.prisma.forCurrentTenant();
    const appointment = await tenantPrisma.appointment.findUnique({ where: { id: appointmentId } });
    if (!appointment) throw new NotFoundException('Agendamento não encontrado.');
    const url = await this.mintJoinUrl(appointment, { isOwner: false });
    return { url };
  }
}
