import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from './notifications.service';
import { EmailService } from '../email/email.service';

/** América/São_Paulo é UTC-3 fixo (sem horário de verão desde 2019) — o servidor roda em UTC. */
const BRT_OFFSET_MS = 3 * 60 * 60 * 1000;

/**
 * Lembretes de consulta — push (véspera) e e-mail (10min antes), pra
 * paciente e profissional. appointments não tem exceção '__system__' na RLS
 * (dado sensível, mesmo padrão de patients) — por isso itera tenant por
 * tenant com forTenant(id) em vez de ler tudo de uma vez com forSystem(),
 * igual o webhook do Asaas já faz pra essa mesma tabela.
 */
@Injectable()
export class AppointmentReminderCron {
  private readonly logger = new Logger(AppointmentReminderCron.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
    private readonly email: EmailService,
  ) {}

  @Cron('0 12 * * *')
  async sendTomorrowReminders() {
    // "Amanhã" em horário de Brasília, não em UTC (bug real corrigido em
    // 2026-07-29 na Agenda — mesma lição aplicada aqui).
    const nowBrt = new Date(Date.now() - BRT_OFFSET_MS);
    const tomorrowStartBrt = new Date(Date.UTC(nowBrt.getUTCFullYear(), nowBrt.getUTCMonth(), nowBrt.getUTCDate() + 1));
    const tomorrowStart = new Date(tomorrowStartBrt.getTime() + BRT_OFFSET_MS);
    const tomorrowEnd = new Date(tomorrowStart.getTime() + 24 * 60 * 60 * 1000);

    const tenants = await this.prisma.tenant.findMany({ select: { id: true } });
    let sent = 0;
    for (const { id: tenantId } of tenants) {
      const tenantPrisma = this.prisma.forTenant(tenantId);
      const appointments = await tenantPrisma.appointment.findMany({
        where: { startsAt: { gte: tomorrowStart, lt: tomorrowEnd }, status: { in: ['agendado', 'confirmado'] } },
        select: { patientId: true, startsAt: true },
      });
      for (const appt of appointments) {
        const time = appt.startsAt.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' });
        await this.notifications.notifyPatient(tenantId, appt.patientId, {
          title: 'Consulta amanhã',
          body: `Você tem uma sessão marcada amanhã às ${time}.`,
        });
        sent += 1;
      }
    }
    if (sent > 0) this.logger.log(`${sent} lembrete(s) de consulta enviado(s).`);
  }

  /**
   * Roda a cada minuto, checando agendamentos que começam entre 9 e 11min a
   * partir de agora — janela de 2min garante que a checagem por minuto pega
   * todo agendamento exatamente uma vez perto da marca de "10 minutos antes".
   * `reminder10MinSentAt` evita reenvio se o agendamento continuar caindo na
   * janela em ticks seguintes por qualquer atraso do processo.
   */
  @Cron('* * * * *')
  async sendTenMinuteReminders() {
    const windowStart = new Date(Date.now() + 9 * 60 * 1000);
    const windowEnd = new Date(Date.now() + 11 * 60 * 1000);

    const tenants = await this.prisma.tenant.findMany({ select: { id: true } });
    let sent = 0;
    for (const { id: tenantId } of tenants) {
      const tenantPrisma = this.prisma.forTenant(tenantId);
      const appointments = await tenantPrisma.appointment.findMany({
        where: {
          startsAt: { gte: windowStart, lt: windowEnd },
          status: { in: ['agendado', 'confirmado'] },
          reminder10MinSentAt: null,
        },
      });
      for (const appt of appointments) {
        const [patient, professional] = await Promise.all([
          tenantPrisma.patient.findUnique({ where: { id: appt.patientId }, select: { name: true, email: true } }),
          tenantPrisma.user.findFirst({ where: { role: 'PSICOLOGO_TITULAR' }, select: { name: true, email: true } }),
        ]);
        if (patient && professional) {
          await this.email.sendReminder10Min({ patient, professional, startsAt: appt.startsAt });
        }
        await tenantPrisma.appointment.update({ where: { id: appt.id }, data: { reminder10MinSentAt: new Date() } });
        sent += 1;
      }
    }
    if (sent > 0) this.logger.log(`${sent} lembrete(s) de 10min enviado(s).`);
  }
}
