import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { PsychTestsService } from './psych-tests.service';
import { AssignTestDto } from './dto/assign-test.dto';
import { CorrectTestDto } from './dto/correct-test.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { STAFF_ROLES } from '../common/roles';

@Controller('psych-tests')
@UseGuards(RolesGuard)
@Roles(...STAFF_ROLES)
export class PsychTestsController {
  constructor(private readonly psychTests: PsychTestsService) {}

  @Get('catalog')
  listCatalog() {
    return this.psychTests.listCatalog();
  }

  @Post('assign')
  assign(@Body() dto: AssignTestDto) {
    return this.psychTests.assign(dto);
  }

  @Get('assignments')
  listForPatient(@Query('patientId') patientId: string) {
    return this.psychTests.listForPatient(patientId);
  }

  @Get('assignments/:id')
  findOne(@Param('id') id: string) {
    return this.psychTests.findOne(id);
  }

  @Patch('assignments/:id/correct')
  correct(@Param('id') id: string, @Body() dto: CorrectTestDto) {
    return this.psychTests.correct(id, dto);
  }

  @Post('assignments/:id/attach-prontuario')
  attachToProntuario(@Param('id') id: string) {
    return this.psychTests.attachToProntuario(id);
  }
}
