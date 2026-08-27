import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'node:crypto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { getPatientContext } from '../common/patient-context';
import { PatientLoginDto } from './dto/patient-login.dto';
import { SubmitTestDto } from './dto/submit-test.dto';
import { ActivatePatientPortalDto } from './dto/activate-patient-portal.dto';
import { RequestPatientPasswordResetDto } from './dto/request-patient-password-reset.dto';
import { ResetPatientPasswordDto } from './dto/reset-patient-password.dto';
import { PatientJwtPayload } from './patient-jwt.types';
import { computeSuggestedScore } from '../psych-tests/scoring';
import { NotificationsService } from '../notifications/notifications.service';
import { RegisterPushTokenDto } from './dto/register-push-token.dto';
import { PSYCH_DOCUMENT_OUTPUT_DIR } from '../psych-documents/psych-documents.service';
import { TeleconsultaService } from '../teleconsulta/teleconsulta.service';
import { EmailService } from '../email/email.service';
import * as path from 'path';

const SALT_ROUNDS = 12;
const PASSWORD_RESET_TTL_MS = 60 * 60 * 1000;

/** Sempre normalizar antes de gravar/comparar — senão "Joao@x.com" e "joao@x.com" viram duas contas. */
function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

interface PatientTenantRow {
  id: string; // Patient.id nesse tenant
  tenantId: string;
  tenant: { name: string; slug: string };
}

@Injectable()
export class PatientPortalService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly notifications: NotificationsService,
    private readonly teleconsulta: TeleconsultaService,
    private readonly email: EmailService,
    private readonly config: ConfigService,
  ) {}

  /**
   * Ativação global — busca o Patient pelo token via forSystem() (patients
   * aceita o sentinela '__system__' na RLS, não precisa saber a clínica de
   * antemão). Se o e-mail já tem PatientAccount (paciente já usa o portal em
   * outra clínica), só LINKA o vínculo novo — ignora a senha enviada, a
   * conta já tem a dela. Senão, cria a conta com a senha enviada.
   */
  async activate(dto: ActivatePatientPortalDto) {
    const patient = await this.prisma.forSystem().patient.findFirst({ where: { activationToken: dto.token } });
    if (!patient || !patient.activationTokenExpiresAt || patient.activationTokenExpiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException('Link de ativação inválido ou expirado — peça um novo pra sua clínica.');
    }
    if (!patient.email) {
      throw new BadRequestException('Este cadastro não tem e-mail — peça pra clínica completar antes de ativar.');
    }

    const email = normalizeEmail(patient.email);
    let account = await this.prisma.patientAccount.findUnique({ where: { email } });
    if (!account) {
      if (dto.termsAccepted !== true) {
        throw new BadRequestException('É necessário aceitar o Termo de Uso do Paciente.');
      }
      const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);
      account = await this.prisma.patientAccount.create({
        data: {
          email,
          passwordHash,
          name: patient.name,
          phone: patient.phone,
          cpfCnpj: patient.cpfCnpj,
          birthDate: patient.birthDate,
          termsAcceptedAt: new Date(),
        },
      });
    }

    await this.prisma.forTenant(patient.tenantId).patient.update({
      where: { id: patient.id },
      data: { patientAccountId: account.id, activationToken: null, activationTokenExpiresAt: null },
    });

    const payload: PatientJwtPayload = { sub: account.id, kind: 'PACIENTE' };
    return { accessToken: this.jwt.sign(payload) };
  }

  /** Login global — sem slug, PatientAccount não tem tenant. */
  async login(dto: PatientLoginDto) {
    const email = normalizeEmail(dto.email);
    const account = await this.prisma.patientAccount.findUnique({ where: { email } });
    if (!account) throw new UnauthorizedException('E-mail ou senha inválidos.');
    if (!(await bcrypt.compare(dto.password, account.passwordHash))) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }
    const payload: PatientJwtPayload = { sub: account.id, kind: 'PACIENTE' };
    return { accessToken: this.jwt.sign(payload) };
  }

  /** Sempre responde igual, exista ou não a conta — evita enumeração (mesmo padrão de AuthService.requestPasswordReset). */
  async requestPasswordReset(dto: RequestPatientPasswordResetDto) {
    const email = normalizeEmail(dto.email);
    const account = await this.prisma.patientAccount.findUnique({ where: { email } });
    if (account) {
      const token = randomUUID();
      await this.prisma.patientAccount.update({
        where: { id: account.id },
        data: { passwordResetToken: token, passwordResetExpiresAt: new Date(Date.now() + PASSWORD_RESET_TTL_MS) },
      });
      const webUrl = this.config.get<string>('PUBLIC_WEB_URL', 'https://portaldopsi.com.br');
      await this.email.sendPasswordReset({
        email: account.email,
        name: account.name,
        resetUrl: `${webUrl}/paciente/redefinir-senha?token=${token}`,
      });
    }
    return { sent: true };
  }

  /** Token de uso único — mesmo padrão de AuthService.resetPassword. */
  async resetPassword(dto: ResetPatientPasswordDto) {
    const account = await this.prisma.patientAccount.findUnique({ where: { passwordResetToken: dto.token } });
    if (!account || !account.passwordResetExpiresAt || account.passwordResetExpiresAt < new Date()) {
      throw new UnauthorizedException('Link de redefinição inválido ou expirado.');
    }
    const passwordHash = await bcrypt.hash(dto.newPassword, SALT_ROUNDS);
    await this.prisma.patientAccount.update({
      where: { id: account.id },
      data: { passwordHash, passwordResetToken: null, passwordResetExpiresAt: null },
    });
    return { reset: true };
  }

  async me() {
    const { patientAccountId } = getPatientContext();
    const account = await this.prisma.patientAccount.findUnique({
      where: { id: patientAccountId },
      select: { id: true, name: true, email: true, phone: true },
    });
    if (!account) throw new NotFoundException('Conta não encontrada.');
    return account;
  }

  /** Todo vínculo (clínica) da conta logada — base de toda agregação cross-tenant abaixo. */
  private async myPatientRows(): Promise<PatientTenantRow[]> {
    const { patientAccountId } = getPatientContext();
    return this.prisma.forSystem().patient.findMany({
      where: { patientAccountId },
      select: { id: true, tenantId: true, tenant: { select: { name: true, slug: true } } },
    });
  }

  /**
   * Lista as clínicas com quem a conta já tem vínculo — usado pelo botão
   * "Marcar consulta" da home do paciente pra decidir entre linkar direto
   * pra agenda de uma clínica só, mostrar uma lista (mais de uma) ou cair
   * no fluxo de busca (nenhuma ainda). Só {name, slug}, nada sensível.
   */
  async listMyClinics(): Promise<{ tenantId: string; name: string; slug: string }[]> {
    const rows = await this.myPatientRows();
    return rows.map((r) => ({ tenantId: r.tenantId, name: r.tenant.name, slug: r.tenant.slug }));
  }

  /** Confirma que a conta logada tem vínculo com esse tenant específico e devolve o patientId desse vínculo. Falha fechado (404). */
  private async myPatientIdInTenant(tenantId: string): Promise<string> {
    const { patientAccountId } = getPatientContext();
    const row = await this.prisma.forTenant(tenantId).patient.findFirst({
      where: { tenantId, patientAccountId },
      select: { id: true },
    });
    if (!row) throw new NotFoundException('Você não tem vínculo com esta clínica.');
    return row.id;
  }

  /**
   * Só documentos que o psicólogo liberou explicitamente (releasedToPatientAt
   * setado) — nunca automático na finalização. Select explícito: nunca inclui
   * `fields` (conteúdo bruto preenchido), só os metadados pra listar/baixar.
   */
  async listPsychDocuments() {
    const rows = await this.myPatientRows();
    const perTenant = await Promise.all(
      rows.map(async (r) => {
        const docs = await this.prisma.forTenant(r.tenantId).psychDocument.findMany({
          where: { patientId: r.id, releasedToPatientAt: { not: null } },
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            templateSlug: true,
            finalizedAt: true,
            releasedToPatientAt: true,
            requiresPatientAcceptance: true,
            acceptedByPatientAt: true,
          },
        });
        return docs.map((d) => ({ ...d, tenant: r.tenant }));
      }),
    );
    return perTenant.flat().sort((a, b) => (b.finalizedAt?.getTime() ?? 0) - (a.finalizedAt?.getTime() ?? 0));
  }

  async getPsychDocumentFilePath(tenantId: string, id: string) {
    const patientId = await this.myPatientIdInTenant(tenantId);
    const doc = await this.prisma.forTenant(tenantId).psychDocument.findFirst({
      where: { id, patientId, releasedToPatientAt: { not: null } },
      select: { filePath: true },
    });
    if (!doc?.filePath) throw new NotFoundException('Documento não encontrado.');
    return path.join(PSYCH_DOCUMENT_OUTPUT_DIR, doc.filePath);
  }

  /** Consentimento do paciente (ex: contrato de prestação de serviços) — nunca automático. */
  async acceptPsychDocument(tenantId: string, id: string) {
    const patientId = await this.myPatientIdInTenant(tenantId);
    const tenantPrisma = this.prisma.forTenant(tenantId);
    const doc = await tenantPrisma.psychDocument.findFirst({
      where: { id, patientId, releasedToPatientAt: { not: null } },
      select: { id: true, requiresPatientAcceptance: true },
    });
    if (!doc) throw new NotFoundException('Documento não encontrado.');
    if (!doc.requiresPatientAcceptance) throw new BadRequestException('Este documento não exige aceite.');
    return tenantPrisma.psychDocument.update({
      where: { id },
      data: { acceptedByPatientAt: new Date() },
      select: { id: true, acceptedByPatientAt: true },
    });
  }

  /**
   * `videoRoomUrl` só aparece depois do consentimento (CFP nº 11/2018) — ver
   * consentToTeleconsulta. `hasVideoRoom` fica visível antes disso, senão o
   * paciente não teria como saber que precisa consentir (a sala ficaria
   * escondida atrás do próprio ato que a revela).
   */
  async listAppointments() {
    const rows = await this.myPatientRows();
    const perTenant = await Promise.all(
      rows.map(async (r) => {
        const appointments = await this.prisma.forTenant(r.tenantId).appointment.findMany({
          where: { patientId: r.id },
          orderBy: { startsAt: 'asc' },
          select: { id: true, startsAt: true, endsAt: true, status: true, videoRoomUrl: true, consentAt: true },
        });
        return appointments.map((a) => ({
          ...a,
          hasVideoRoom: Boolean(a.videoRoomUrl),
          videoRoomUrl: a.consentAt ? a.videoRoomUrl : null,
          tenant: r.tenant,
        }));
      }),
    );
    return perTenant.flat().sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
  }

  private async myAppointmentOrThrow(tenantId: string, id: string) {
    const patientId = await this.myPatientIdInTenant(tenantId);
    const tenantPrisma = this.prisma.forTenant(tenantId);
    const appointment = await tenantPrisma.appointment.findFirst({ where: { id, patientId } });
    if (!appointment) throw new NotFoundException('Agendamento não encontrado.');
    return { appointment, tenantPrisma };
  }

  async confirmAppointment(tenantId: string, id: string) {
    const { appointment, tenantPrisma } = await this.myAppointmentOrThrow(tenantId, id);
    return tenantPrisma.appointment.update({ where: { id: appointment.id }, data: { status: 'confirmado' } });
  }

  /** Consentimento informado exigido pela Resolução CFP nº 11/2018 antes de liberar a sala de vídeo. */
  async consentToTeleconsulta(tenantId: string, id: string) {
    const { appointment, tenantPrisma } = await this.myAppointmentOrThrow(tenantId, id);
    if (!appointment.videoRoomUrl) {
      throw new ForbiddenException('Nenhuma sala de teleconsulta foi criada para este agendamento ainda.');
    }
    return tenantPrisma.appointment.update({ where: { id: appointment.id }, data: { consentAt: new Date() } });
  }

  /** Link de entrada pro lado do paciente (is_owner: false) — só depois do consentimento já registrado. */
  async getTeleconsultaJoinLink(tenantId: string, id: string) {
    const { appointment } = await this.myAppointmentOrThrow(tenantId, id);
    if (!appointment.consentAt) {
      throw new ForbiddenException('Você precisa consentir com a teleconsulta antes de entrar na sala.');
    }
    const { patientAccountId } = getPatientContext();
    const account = await this.prisma.patientAccount.findUnique({ where: { id: patientAccountId }, select: { name: true } });
    const url = await this.teleconsulta.mintJoinUrl(appointment, { isOwner: false, userName: account?.name });
    return { url };
  }

  /**
   * Só cancela agendamentos que ainda não aconteceram/foram concluídos. Se o
   * agendamento tinha um AvailabilitySlot vinculado (reservado via este
   * portal ou via site público), libera o horário de volta pra disponível.
   */
  async cancelAppointment(tenantId: string, id: string) {
    const { appointment, tenantPrisma } = await this.myAppointmentOrThrow(tenantId, id);
    if (appointment.status === 'concluido' || appointment.status === 'cancelado') {
      throw new BadRequestException('Este agendamento já não pode mais ser cancelado.');
    }
    await tenantPrisma.appointment.update({
      where: { id: appointment.id },
      data: { status: 'cancelado', cancelReason: 'Cancelado pelo próprio paciente.' },
    });
    await tenantPrisma.availabilitySlot.updateMany({
      where: { appointmentId: appointment.id },
      data: { status: 'disponivel', heldUntil: null, appointmentId: null },
    });
    return { cancelled: true };
  }

  /** Catálogo global (sem RLS/tenantId, ver MeditationTrack no schema) — mesmo pra qualquer clínica. */
  listMeditationTracks() {
    return this.prisma.meditationTrack.findMany({
      where: { active: true },
      orderBy: [{ category: 'asc' }, { title: 'asc' }],
    });
  }

  async getMeditationAudioPath(id: string) {
    const track = await this.prisma.meditationTrack.findUnique({ where: { id } });
    if (!track || !track.active) throw new NotFoundException('Trilha não encontrada.');
    return track.audioPath;
  }

  /** Registra o mesmo token em todo vínculo (clínica) da conta — qualquer uma pode notificar. */
  async subscribeToPush(dto: RegisterPushTokenDto) {
    const rows = await this.myPatientRows();
    await Promise.all(rows.map((r) => this.notifications.registerToken(r.tenantId, r.id, dto.fcmToken)));
    return { registered: rows.length };
  }

  async unsubscribeFromPush(fcmToken: string) {
    const rows = await this.myPatientRows();
    await Promise.all(rows.map((r) => this.notifications.unregisterToken(r.tenantId, fcmToken)));
    return { removed: rows.length };
  }

  async listHomework() {
    const rows = await this.myPatientRows();
    const perTenant = await Promise.all(
      rows.map(async (r) => {
        const items = await this.prisma.forTenant(r.tenantId).homework.findMany({
          where: { patientId: r.id },
          orderBy: { createdAt: 'desc' },
        });
        return items.map((h) => ({ ...h, tenant: r.tenant }));
      }),
    );
    return perTenant.flat().sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async completeHomework(tenantId: string, id: string, patientNote?: string) {
    const patientId = await this.myPatientIdInTenant(tenantId);
    const tenantPrisma = this.prisma.forTenant(tenantId);
    const homework = await tenantPrisma.homework.findFirst({ where: { id, patientId } });
    if (!homework) throw new NotFoundException('Dever de casa não encontrado.');
    if (homework.status === 'concluido') {
      throw new BadRequestException('Este dever de casa já foi marcado como concluído.');
    }
    return tenantPrisma.homework.update({
      where: { id },
      data: { status: 'concluido', completedAt: new Date(), patientNote },
    });
  }

  /**
   * Nunca inclui score/finalResultLabel/communicationNote — comunicar o
   * resultado é sempre decisão manual do psicólogo, nunca automática por
   * aqui (mesmo depois de "corrigido").
   */
  async listTests() {
    const rows = await this.myPatientRows();
    const perTenant = await Promise.all(
      rows.map(async (r) => {
        const items = await this.prisma.forTenant(r.tenantId).testAssignment.findMany({
          where: { patientId: r.id },
          orderBy: { assignedAt: 'desc' },
          select: {
            id: true,
            status: true,
            assignedAt: true,
            submittedAt: true,
            testTemplate: { select: { title: true, category: true } },
          },
        });
        return items.map((t) => ({ ...t, tenant: r.tenant }));
      }),
    );
    return perTenant.flat().sort((a, b) => b.assignedAt.getTime() - a.assignedAt.getTime());
  }

  /** Só retorna o teste pra responder se ainda estiver pendente — sem reabrir depois de respondido. */
  async getTestToAnswer(tenantId: string, id: string) {
    const patientId = await this.myPatientIdInTenant(tenantId);
    const assignment = await this.prisma.forTenant(tenantId).testAssignment.findFirst({
      where: { id, patientId },
      include: { testTemplate: { include: { questions: { orderBy: { order: 'asc' } } } } },
    });
    if (!assignment) throw new NotFoundException('Teste não encontrado.');
    if (assignment.status !== 'pendente') {
      throw new ForbiddenException('Este teste já foi respondido e não pode ser reaberto.');
    }
    return assignment;
  }

  async submitTest(tenantId: string, id: string, dto: SubmitTestDto) {
    const assignment = await this.getTestToAnswer(tenantId, id);
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

    return this.prisma.forTenant(tenantId).testAssignment.update({
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
