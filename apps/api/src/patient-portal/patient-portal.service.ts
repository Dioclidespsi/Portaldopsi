import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { getPatientContext } from '../common/patient-context';
import { PatientLoginDto } from './dto/patient-login.dto';
import { PatientJwtPayload } from './patient-jwt.types';

@Injectable()
export class PatientPortalService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  /** Mesmo formato do login de equipe (slug + e-mail): e-mail só é único dentro do tenant. */
  async login(dto: PatientLoginDto) {
    const tenant = await this.prisma.tenant.findUnique({ where: { slug: dto.slug } });
    if (!tenant) throw new UnauthorizedException('Clínica ou credenciais inválidas.');

    const [, patient] = await this.prisma.$transaction([
      this.prisma.$executeRaw`SELECT set_config('app.tenant_id', ${tenant.id}, TRUE)`,
      this.prisma.patient.findUnique({ where: { tenantId_email: { tenantId: tenant.id, email: dto.email } } }),
    ]);

    if (!patient || !patient.portalEnabled || !patient.passwordHash) {
      throw new UnauthorizedException('Clínica ou credenciais inválidas, ou portal ainda não foi ativado pela clínica.');
    }
    if (!(await bcrypt.compare(dto.password, patient.passwordHash))) {
      throw new UnauthorizedException('Clínica ou credenciais inválidas.');
    }

    const payload: PatientJwtPayload = { sub: patient.id, tenantId: tenant.id, kind: 'PACIENTE' };
    return { accessToken: this.jwt.sign(payload) };
  }

  private ownPatientClient() {
    const { tenantId } = getPatientContext();
    return this.prisma.forTenant(tenantId);
  }

  async me() {
    const { patientId } = getPatientContext();
    const patient = await this.ownPatientClient().patient.findUnique({
      where: { id: patientId },
      select: { id: true, name: true, email: true, phone: true },
    });
    if (!patient) throw new NotFoundException('Paciente não encontrado.');
    return patient;
  }

  /**
   * `videoRoomUrl` só aparece depois do consentimento (CFP nº 11/2018) — ver
   * consentToTeleconsulta. `hasVideoRoom` fica visível antes disso, senão o
   * paciente não teria como saber que precisa consentir (a sala ficaria
   * escondida atrás do próprio ato que a revela).
   */
  async listAppointments() {
    const { patientId } = getPatientContext();
    const appointments = await this.ownPatientClient().appointment.findMany({
      where: { patientId },
      orderBy: { startsAt: 'asc' },
      select: { id: true, startsAt: true, endsAt: true, status: true, videoRoomUrl: true, consentAt: true },
    });
    return appointments.map((a) => ({
      ...a,
      hasVideoRoom: Boolean(a.videoRoomUrl),
      videoRoomUrl: a.consentAt ? a.videoRoomUrl : null,
    }));
  }

  private async ownAppointmentOrThrow(id: string) {
    const { patientId } = getPatientContext();
    const appointment = await this.ownPatientClient().appointment.findUnique({ where: { id } });
    if (!appointment || appointment.patientId !== patientId) {
      throw new NotFoundException('Agendamento não encontrado.');
    }
    return appointment;
  }

  async confirmAppointment(id: string) {
    await this.ownAppointmentOrThrow(id);
    return this.ownPatientClient().appointment.update({ where: { id }, data: { status: 'confirmado' } });
  }

  /** Consentimento informado exigido pela Resolução CFP nº 11/2018 antes de liberar a sala de vídeo. */
  async consentToTeleconsulta(id: string) {
    const appointment = await this.ownAppointmentOrThrow(id);
    if (!appointment.videoRoomUrl) {
      throw new ForbiddenException('Nenhuma sala de teleconsulta foi criada para este agendamento ainda.');
    }
    return this.ownPatientClient().appointment.update({ where: { id }, data: { consentAt: new Date() } });
  }
}
