import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import * as path from 'path';
import { PatientPortalService } from './patient-portal.service';
import { PatientLoginDto } from './dto/patient-login.dto';
import { SubmitTestDto } from './dto/submit-test.dto';
import { ActivatePatientPortalDto } from './dto/activate-patient-portal.dto';
import { RequestPatientPasswordResetDto } from './dto/request-patient-password-reset.dto';
import { ResetPatientPasswordDto } from './dto/reset-patient-password.dto';
import { CompleteHomeworkDto } from './dto/complete-homework.dto';
import { RegisterPushTokenDto } from './dto/register-push-token.dto';
import { MEDITATION_UPLOAD_DIR } from '../meditation/meditation-upload.config';

@Controller('patient-portal')
export class PatientPortalController {
  constructor(private readonly portal: PatientPortalService) {}

  /** Pública — excluída do PatientAuthMiddleware em patient-portal.module.ts. */
  @Post('login')
  login(@Body() dto: PatientLoginDto) {
    return this.portal.login(dto);
  }

  /** Pública — excluída do PatientAuthMiddleware em patient-portal.module.ts. Autoatendimento via link gerado pela equipe. */
  @Post('activate')
  activate(@Body() dto: ActivatePatientPortalDto) {
    return this.portal.activate(dto);
  }

  /** Pública — excluída do PatientAuthMiddleware em patient-portal.module.ts. */
  @Post('request-password-reset')
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 3, ttl: 60 * 60 * 1000 } })
  requestPasswordReset(@Body() dto: RequestPatientPasswordResetDto) {
    return this.portal.requestPasswordReset(dto);
  }

  /** Pública — excluída do PatientAuthMiddleware em patient-portal.module.ts. */
  @Post('reset-password')
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 10, ttl: 60 * 60 * 1000 } })
  resetPassword(@Body() dto: ResetPatientPasswordDto) {
    return this.portal.resetPassword(dto);
  }

  @Get('me')
  me() {
    return this.portal.me();
  }

  @Get('clinics')
  listMyClinics() {
    return this.portal.listMyClinics();
  }

  // Listagens abaixo agregam TODAS as clínicas vinculadas à conta — sem
  // :tenantId, ver PatientPortalService.myPatientRows(). Ações sobre um
  // recurso específico (confirmar, cancelar, baixar, etc.) exigem
  // :tenantId no caminho, porque appointments/psych_documents/homeworks/
  // test_assignments não aceitam o sentinela '__system__' na RLS de
  // propósito (dado sensível) — o frontend já recebe o tenant de cada item
  // na listagem, então devolve explícito em vez do backend ter que adivinhar.

  @Get('psych-documents')
  listPsychDocuments() {
    return this.portal.listPsychDocuments();
  }

  @Get('tenants/:tenantId/psych-documents/:id/download')
  async downloadPsychDocument(@Param('tenantId') tenantId: string, @Param('id') id: string, @Res() res: Response) {
    const filePath = await this.portal.getPsychDocumentFilePath(tenantId, id);
    res.sendFile(filePath);
  }

  @Post('tenants/:tenantId/psych-documents/:id/accept')
  acceptPsychDocument(@Param('tenantId') tenantId: string, @Param('id') id: string) {
    return this.portal.acceptPsychDocument(tenantId, id);
  }

  @Get('appointments')
  listAppointments() {
    return this.portal.listAppointments();
  }

  @Post('tenants/:tenantId/appointments/:id/confirm')
  confirm(@Param('tenantId') tenantId: string, @Param('id') id: string) {
    return this.portal.confirmAppointment(tenantId, id);
  }

  @Post('tenants/:tenantId/appointments/:id/consent')
  consent(@Param('tenantId') tenantId: string, @Param('id') id: string) {
    return this.portal.consentToTeleconsulta(tenantId, id);
  }

  @Post('tenants/:tenantId/appointments/:id/teleconsulta-join-link')
  getTeleconsultaJoinLink(@Param('tenantId') tenantId: string, @Param('id') id: string) {
    return this.portal.getTeleconsultaJoinLink(tenantId, id);
  }

  @Post('tenants/:tenantId/appointments/:id/cancel')
  cancel(@Param('tenantId') tenantId: string, @Param('id') id: string) {
    return this.portal.cancelAppointment(tenantId, id);
  }

  // GET availability / POST bookings removidos de propósito: não fazem
  // sentido sem um tenant fixo (ver BookingController — agendamento agora
  // sempre passa por /public/tenants/:slug/bookings, autenticado ou não).

  @Post('push-subscriptions')
  subscribeToPush(@Body() dto: RegisterPushTokenDto) {
    return this.portal.subscribeToPush(dto);
  }

  @Post('push-subscriptions/unsubscribe')
  unsubscribeFromPush(@Body() dto: RegisterPushTokenDto) {
    return this.portal.unsubscribeFromPush(dto.fcmToken);
  }

  @Get('homework')
  listHomework() {
    return this.portal.listHomework();
  }

  @Post('tenants/:tenantId/homework/:id/complete')
  completeHomework(@Param('tenantId') tenantId: string, @Param('id') id: string, @Body() dto: CompleteHomeworkDto) {
    return this.portal.completeHomework(tenantId, id, dto.patientNote);
  }

  // Cursos e certificados removidos de propósito do portal do paciente: o
  // paciente não deve ter NENHUM acesso a curso (nem catálogo, nem aula, nem
  // certificado) — só o que é da clínica (agenda, prontuário do próprio
  // atendimento, documentos, testes, dever de casa, meditação). Ver
  // PatientCoursesService, que foi removido junto.

  @Get('meditation-tracks')
  listMeditationTracks() {
    return this.portal.listMeditationTracks();
  }

  @Get('meditation-tracks/:id/audio')
  async getMeditationAudio(@Param('id') id: string, @Res() res: Response) {
    const audioPath = await this.portal.getMeditationAudioPath(id);
    res.sendFile(path.join(MEDITATION_UPLOAD_DIR, audioPath));
  }

  @Get('tests')
  listTests() {
    return this.portal.listTests();
  }

  @Get('tenants/:tenantId/tests/:id')
  getTest(@Param('tenantId') tenantId: string, @Param('id') id: string) {
    return this.portal.getTestToAnswer(tenantId, id);
  }

  @Post('tenants/:tenantId/tests/:id/submit')
  submitTest(@Param('tenantId') tenantId: string, @Param('id') id: string, @Body() dto: SubmitTestDto) {
    return this.portal.submitTest(tenantId, id, dto);
  }
}
