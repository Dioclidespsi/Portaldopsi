import { Injectable, Logger, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Teleconsulta via Daily.co (decisão registrada no doc de arquitetura, §08).
 * Mesmo estágio que billing/ai: sem DAILY_API_KEY, responde 503. A sala só é
 * exposta ao paciente (Aplicativo do Paciente) depois de
 * Appointment.consentAt ser preenchido — ver patient-portal, requisito da
 * Resolução CFP nº 11/2018.
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

  async createRoom(appointmentId: string) {
    if (!this.apiKey) {
      throw new ServiceUnavailableException(
        'Teleconsulta ainda não configurada: defina DAILY_API_KEY em apps/api/.env com uma chave da sua própria conta Daily.co.',
      );
    }

    const tenantPrisma = this.prisma.forCurrentTenant();
    const appointment = await tenantPrisma.appointment.findUnique({ where: { id: appointmentId } });
    if (!appointment) throw new NotFoundException('Agendamento não encontrado.');

    const roomName = `portal-do-psi-${appointment.id}`;
    const expiresAt = Math.floor(new Date(appointment.endsAt).getTime() / 1000) + 60 * 60; // +1h de folga

    const res = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: roomName,
        privacy: 'private',
        properties: { exp: expiresAt, enable_recording: 'cloud' },
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
}
