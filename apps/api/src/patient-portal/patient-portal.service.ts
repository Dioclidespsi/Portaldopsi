import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { getPatientContext } from '../common/patient-context';
import { PatientLoginDto } from './dto/patient-login.dto';
import { SubmitTestDto } from './dto/submit-test.dto';
import { ActivatePatientPortalDto } from './dto/activate-patient-portal.dto';
import { PatientJwtPayload } from './patient-jwt.types';
import { computeSuggestedScore } from '../psych-tests/scoring';
import { AvailabilityService } from '../availability/availability.service';
import { BookingService } from '../booking/booking.service';

const SALT_ROUNDS = 12;

@Injectable()
export class PatientPortalService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly availability: AvailabilityService,
    private readonly booking: BookingService,
  ) {}

  /**
   * Autoatendimento: paciente define a própria senha usando o token gerado
   * pela equipe (ver PatientsService.generateActivationLink). `slug` resolve
   * o tenant primeiro (igual login()) — patients tem RLS forçado sem exceção
   * '__system__', então nunca dá pra buscar só pelo token cru sem escopar
   * por tenant antes (forTenant(id) explícito, nunca forSystem() aqui).
   */
  async activate(dto: ActivatePatientPortalDto) {
    const tenant = await this.prisma.tenant.findUnique({ where: { slug: dto.slug } });
    if (!tenant) throw new UnauthorizedException('Link de ativação inválido.');

    const tenantPrisma = this.prisma.forTenant(tenant.id);
    const patient = await tenantPrisma.patient.findFirst({ where: { activationToken: dto.token } });
    if (!patient || !patient.activationTokenExpiresAt || patient.activationTokenExpiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException('Link de ativação inválido ou expirado — peça um novo pra sua clínica.');
    }

    const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);
    await tenantPrisma.patient.update({
      where: { id: patient.id },
      data: { passwordHash, portalEnabled: true, activationToken: null, activationTokenExpiresAt: null },
    });

    const payload: PatientJwtPayload = { sub: patient.id, tenantId: tenant.id, kind: 'PACIENTE' };
    return { accessToken: this.jwt.sign(payload) };
  }

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

  /** Mesmos horários liberados que aparecem no site público (/p/{slug}) — aqui já dentro do login do paciente. */
  async listAvailability() {
    const { tenantId } = getPatientContext();
    const tenant = await this.prisma.tenant.findUniqueOrThrow({ where: { id: tenantId } });
    const tenantPrisma = this.prisma.forTenant(tenantId);
    await this.availability.expireStaleHolds(tenantPrisma);

    const slots = await tenantPrisma.availabilitySlot.findMany({
      where: { status: 'disponivel', startsAt: { gte: new Date() } },
      orderBy: { startsAt: 'asc' },
      select: { id: true, startsAt: true, endsAt: true },
    });
    return { sessionPriceCents: tenant.sessionPriceCents, slots };
  }

  /** Igual ao agendamento público (ver BookingService), mas pro paciente já logado — sem reupsertar por e-mail, patientId já é conhecido. */
  async bookAppointment(slotId: string) {
    const { tenantId, patientId } = getPatientContext();
    return this.booking.createBookingForPatient(tenantId, patientId, slotId);
  }

  /**
   * Só cancela agendamentos que ainda não aconteceram/foram concluídos. Se o
   * agendamento tinha um AvailabilitySlot vinculado (reservado via este
   * portal ou via site público), libera o horário de volta pra disponível.
   */
  async cancelAppointment(id: string) {
    const appointment = await this.ownAppointmentOrThrow(id);
    if (appointment.status === 'concluido' || appointment.status === 'cancelado') {
      throw new BadRequestException('Este agendamento já não pode mais ser cancelado.');
    }
    const tenantPrisma = this.ownPatientClient();
    await tenantPrisma.appointment.update({
      where: { id },
      data: { status: 'cancelado', cancelReason: 'Cancelado pelo próprio paciente.' },
    });
    await tenantPrisma.availabilitySlot.updateMany({
      where: { appointmentId: id },
      data: { status: 'disponivel', heldUntil: null, appointmentId: null },
    });
    return { cancelled: true };
  }

  /**
   * Nunca inclui score/finalResultLabel/communicationNote — comunicar o
   * resultado é sempre decisão manual do psicólogo, nunca automática por
   * aqui (mesmo depois de "corrigido").
   */
  async listTests() {
    const { patientId } = getPatientContext();
    const assignments = await this.ownPatientClient().testAssignment.findMany({
      where: { patientId },
      orderBy: { assignedAt: 'desc' },
      select: {
        id: true,
        status: true,
        assignedAt: true,
        submittedAt: true,
        testTemplate: { select: { title: true, category: true } },
      },
    });
    return assignments;
  }

  /** Só retorna o teste pra responder se ainda estiver pendente — sem reabrir depois de respondido. */
  async getTestToAnswer(id: string) {
    const { patientId } = getPatientContext();
    const assignment = await this.ownPatientClient().testAssignment.findUnique({
      where: { id },
      include: { testTemplate: { include: { questions: { orderBy: { order: 'asc' } } } } },
    });
    if (!assignment || assignment.patientId !== patientId) {
      throw new NotFoundException('Teste não encontrado.');
    }
    if (assignment.status !== 'pendente') {
      throw new ForbiddenException('Este teste já foi respondido e não pode ser reaberto.');
    }
    return assignment;
  }

  async submitTest(id: string, dto: SubmitTestDto) {
    const assignment = await this.getTestToAnswer(id);
    const questions = assignment.testTemplate.questions;

    for (const q of questions) {
      const value = dto.answers[q.id];
      if (q.type === 'objetiva' && typeof value !== 'number') {
        throw new BadRequestException(`Resposta ausente para a pergunta "${q.prompt}".`);
      }
      if (q.type === 'subjetiva' && (typeof value !== 'string' || !value.trim())) {
        throw new BadRequestException(`Resposta ausente para a pergunta "${q.prompt}".`);
      }
    }

    const scoreBands = assignment.testTemplate.scoreBands as { maxScore: number; label: string }[] | null;
    const responseScale = assignment.testTemplate.responseScale as { value: number; label: string }[] | null;
    const subscales = assignment.testTemplate.subscales as unknown as Parameters<typeof computeSuggestedScore>[4];
    const derivedScores = assignment.testTemplate.derivedScores as unknown as Parameters<typeof computeSuggestedScore>[5];
    const { suggestedScore, suggestedResultLabel, suggestedSubscaleScores, suggestedDerivedScores } = computeSuggestedScore(
      questions,
      scoreBands,
      dto.answers,
      responseScale,
      subscales,
      derivedScores,
    );

    return this.ownPatientClient().testAssignment.update({
      where: { id },
      data: {
        answers: dto.answers,
        submittedAt: new Date(),
        status: 'respondido',
        suggestedScore,
        suggestedResultLabel,
        suggestedSubscaleScores: (suggestedSubscaleScores as unknown as Prisma.InputJsonValue) ?? undefined,
        suggestedDerivedScores: (suggestedDerivedScores as unknown as Prisma.InputJsonValue) ?? undefined,
      },
      select: { id: true, status: true, submittedAt: true },
    });
  }
}
