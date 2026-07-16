import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { PatientPortalService } from './patient-portal.service';
import { PatientLoginDto } from './dto/patient-login.dto';
import { SubmitTestDto } from './dto/submit-test.dto';
import { ActivatePatientPortalDto } from './dto/activate-patient-portal.dto';
import { BookAppointmentDto } from './dto/book-appointment.dto';
import { CompleteHomeworkDto } from './dto/complete-homework.dto';
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

  @Get('me')
  me() {
    return this.portal.me();
  }

  @Get('appointments')
  listAppointments() {
    return this.portal.listAppointments();
  }

  @Post('appointments/:id/confirm')
  confirm(@Param('id') id: string) {
    return this.portal.confirmAppointment(id);
  }

  @Post('appointments/:id/consent')
  consent(@Param('id') id: string) {
    return this.portal.consentToTeleconsulta(id);
  }

  @Post('appointments/:id/cancel')
  cancel(@Param('id') id: string) {
    return this.portal.cancelAppointment(id);
  }

  @Get('availability')
  listAvailability() {
    return this.portal.listAvailability();
  }

  @Post('bookings')
  book(@Body() dto: BookAppointmentDto) {
    return this.portal.bookAppointment(dto.slotId);
  }

  @Get('homework')
  listHomework() {
    return this.portal.listHomework();
  }

  @Post('homework/:id/complete')
  completeHomework(@Param('id') id: string, @Body() dto: CompleteHomeworkDto) {
    return this.portal.completeHomework(id, dto.patientNote);
  }

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

  @Get('tests/:id')
  getTest(@Param('id') id: string) {
    return this.portal.getTestToAnswer(id);
  }

  @Post('tests/:id/submit')
  submitTest(@Param('id') id: string, @Body() dto: SubmitTestDto) {
    return this.portal.submitTest(id, dto);
  }
}
