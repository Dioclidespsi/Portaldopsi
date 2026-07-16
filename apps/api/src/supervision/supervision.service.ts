import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CreateSupervisionSessionDto } from './dto/create-session.dto';
import { UpdateSupervisionSessionDto } from './dto/update-session.dto';

/**
 * Sala de vídeo criada automaticamente ao agendar (diferente de Teleconsulta
 * de Appointment, que é sob demanda) — falha na criação da sala NUNCA
 * impede o agendamento em si, só fica sem link (retry manual via
 * POST .../teleconsulta/room). Sem gate de consentAt: não é dado de paciente.
 */
@Injectable()
export class SupervisionService {
  private readonly logger = new Logger(SupervisionService.name);
  private readonly dailyApiKey: string | undefined;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    this.dailyApiKey = this.config.get<string>('DAILY_API_KEY') || undefined;
  }

  async create(dto: CreateSupervisionSessionDto) {
    const startsAt = new Date(dto.startsAt);
    const endsAt = new Date(dto.endsAt);
    if (endsAt <= startsAt) throw new BadRequestException('endsAt precisa ser depois de startsAt.');

    const { tenantId, userId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();

    const supervisor = await tenantPrisma.user.findUnique({ where: { id: dto.supervisorId } });
    if (!supervisor || supervisor.role !== Role.SUPERVISOR) {
      throw new BadRequestException('supervisorId precisa ser um usuário com role SUPERVISOR nesta clínica.');
    }
    if (supervisor.supervisorApprovalStatus !== 'APROVADO') {
      throw new BadRequestException('Este supervisor ainda não foi aprovado pela administração da plataforma.');
    }

    const created = await tenantPrisma.supervisionSession.create({
      data: { tenantId, supervisorId: dto.supervisorId, superviseeId: userId, startsAt, endsAt },
      include: { supervisor: { select: { name: true } }, supervisee: { select: { name: true } } },
    });

    const room = await this.tryCreateDailyRoom(created.id, created.endsAt);
    if (!room) return created;
    return tenantPrisma.supervisionSession.update({
      where: { id: created.id },
      data: { videoRoomUrl: room.url, videoRoomName: room.name },
      include: { supervisor: { select: { name: true } }, supervisee: { select: { name: true } } },
    });
  }

  list() {
    return this.prisma.forCurrentTenant().supervisionSession.findMany({
      orderBy: { startsAt: 'asc' },
      include: { supervisor: { select: { name: true } }, supervisee: { select: { name: true } } },
    });
  }

  async update(id: string, dto: UpdateSupervisionSessionDto) {
    const tenantPrisma = this.prisma.forCurrentTenant();
    const session = await tenantPrisma.supervisionSession.findUnique({ where: { id } });
    if (!session) throw new NotFoundException('Sessão de supervisão não encontrada.');

    const { userId } = getRequestContext();
    if (session.supervisorId !== userId && session.superviseeId !== userId) {
      throw new ForbiddenException('Você só pode alterar sessões de supervisão em que participa.');
    }

    return tenantPrisma.supervisionSession.update({
      where: { id },
      data: { status: dto.status, notes: dto.notes },
      include: { supervisor: { select: { name: true } }, supervisee: { select: { name: true } } },
    });
  }

  /** Retry manual — mesma restrição de participante do update(), usado quando a criação automática falhou. */
  async createTeleconsultaRoom(id: string) {
    const tenantPrisma = this.prisma.forCurrentTenant();
    const session = await tenantPrisma.supervisionSession.findUnique({ where: { id } });
    if (!session) throw new NotFoundException('Sessão de supervisão não encontrada.');

    const { userId } = getRequestContext();
    if (session.supervisorId !== userId && session.superviseeId !== userId) {
      throw new ForbiddenException('Você só pode criar sala para sessões de supervisão em que participa.');
    }

    const room = await this.tryCreateDailyRoom(session.id, session.endsAt, true);
    if (!room) throw new BadRequestException('Não foi possível criar a sala — verifique se DAILY_API_KEY está configurada.');

    return tenantPrisma.supervisionSession.update({
      where: { id },
      data: { videoRoomUrl: room.url, videoRoomName: room.name },
      include: { supervisor: { select: { name: true } }, supervisee: { select: { name: true } } },
    });
  }

  /** `throwOnFailure` só é true no retry manual — na criação automática, falha vira log e segue sem sala. */
  private async tryCreateDailyRoom(sessionId: string, endsAt: Date, throwOnFailure = false): Promise<{ url: string; name: string } | null> {
    if (!this.dailyApiKey) {
      this.logger.warn('DAILY_API_KEY não configurada — sessão de supervisão criada sem sala de vídeo.');
      return null;
    }

    const roomName = `portal-do-psi-supervisao-${sessionId}`;
    const expiresAt = Math.floor(endsAt.getTime() / 1000) + 60 * 60; // +1h de folga

    try {
      const res = await fetch('https://api.daily.co/v1/rooms', {
        method: 'POST',
        headers: { Authorization: `Bearer ${this.dailyApiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: roomName,
          privacy: 'private',
          properties: { exp: expiresAt, enable_recording: 'cloud' },
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        this.logger.warn(`Falha ao criar sala Daily.co para supervisão ${sessionId}: ${body}`);
        if (throwOnFailure) throw new BadRequestException(`Falha ao criar sala no Daily.co: ${body}`);
        return null;
      }
      return (await res.json()) as { url: string; name: string };
    } catch (err) {
      if (throwOnFailure) throw err;
      this.logger.warn(`Erro ao criar sala Daily.co para supervisão ${sessionId}: ${(err as Error).message}`);
      return null;
    }
  }

  /**
   * Thread só existe entre pares que já têm pelo menos uma SupervisionSession
   * — nunca DM livre. Detecta automaticamente qual dos dois (chamador,
   * partnerId) é o supervisor e qual é o supervisionado.
   */
  private async resolvePair(partnerId: string): Promise<{ supervisorId: string; superviseeId: string }> {
    const { userId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();

    const asSupervisor = await tenantPrisma.supervisionSession.findFirst({
      where: { supervisorId: userId, superviseeId: partnerId },
    });
    if (asSupervisor) return { supervisorId: userId, superviseeId: partnerId };

    const asSupervisee = await tenantPrisma.supervisionSession.findFirst({
      where: { supervisorId: partnerId, superviseeId: userId },
    });
    if (asSupervisee) return { supervisorId: partnerId, superviseeId: userId };

    throw new ForbiddenException('Só é possível conversar com quem já tem uma sessão de supervisão agendada com você.');
  }

  async listMessages(partnerId: string) {
    const { supervisorId, superviseeId } = await this.resolvePair(partnerId);
    return this.prisma.forCurrentTenant().supervisionMessage.findMany({
      where: { supervisorId, superviseeId },
      orderBy: { createdAt: 'asc' },
      include: { sender: { select: { id: true, name: true } } },
    });
  }

  async sendMessage(partnerId: string, content: string) {
    const { tenantId, userId } = getRequestContext();
    const { supervisorId, superviseeId } = await this.resolvePair(partnerId);
    return this.prisma.forCurrentTenant().supervisionMessage.create({
      data: { tenantId, supervisorId, superviseeId, senderId: userId, content },
      include: { sender: { select: { id: true, name: true } } },
    });
  }
}
