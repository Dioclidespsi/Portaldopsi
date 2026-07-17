import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from './notifications.service';

/**
 * Lembrete de consulta de amanhã, uma vez por dia. appointments não tem
 * exceção '__system__' na RLS (dado sensível, mesmo padrão de patients) — por
 * isso itera tenant por tenant com forTenant(id) em vez de ler tudo de uma
 * vez com forSystem(), igual o webhook do Asaas já faz pra essa mesma tabela.
 */
@Injectable()
export class AppointmentReminderCron {
  private readonly logger = new Logger(AppointmentReminderCron.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
  ) {}

  @Cron('0 12 * * *')
  async sendTomorrowReminders() {
    const tomorrowStart = new Date();
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);
    tomorrowStart.setHours(0, 0, 0, 0);
    const tomorrowEnd = new Date(tomorrowStart);
    tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);

    const tenants = await this.prisma.tenant.findMany({ select: { id: true } });
    let sent = 0;
    for (const { id: tenantId } of tenants) {
      const tenantPrisma = this.prisma.forTenant(tenantId);
      const appointments = await tenantPrisma.appointment.findMany({
        where: { startsAt: { gte: tomorrowStart, lt: tomorrowEnd }, status: { in: ['agendado', 'confirmado'] } },
        select: { patientId: true, startsAt: true },
      });
      for (const appt of appointments) {
        const time = appt.startsAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        await this.notifications.notifyPatient(tenantId, appt.patientId, {
          title: 'Consulta amanhã',
          body: `Você tem uma sessão marcada amanhã às ${time}.`,
        });
        sent += 1;
      }
    }
    if (sent > 0) this.logger.log(`${sent} lembrete(s) de consulta enviado(s).`);
  }
}
