import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { PsychTestsService } from './psych-tests.service';
import { SubmitResponseDto } from './dto/submit-response.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { STAFF_ROLES } from '../common/roles';

@Controller('psych-tests')
@UseGuards(RolesGuard)
@Roles(...STAFF_ROLES)
export class PsychTestsController {
  constructor(private readonly psychTests: PsychTestsService) {}

  @Get()
  listCatalog() {
    return this.psychTests.listCatalog();
  }

  @Get('responses')
  listResponses(@Query('patientId') patientId: string) {
    return this.psychTests.listForPatient(patientId);
  }

  @Get(':slug')
  getDefinition(@Param('slug') slug: string) {
    return this.psychTests.getDefinition(slug);
  }

  @Post(':slug/responses')
  submit(@Param('slug') slug: string, @Body() dto: SubmitResponseDto) {
    return this.psychTests.submit(slug, dto.patientId, dto.answers);
  }
}
