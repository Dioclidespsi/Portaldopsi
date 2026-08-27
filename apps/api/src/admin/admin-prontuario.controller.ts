import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AdminProntuarioService } from './admin-prontuario.service';
import { AdminTokenGuard } from './admin-token.guard';

function slugForFilename(text: string) {
  return text
    .normalize('NFD')
    .replace(new RegExp('[̀-ͯ]', 'g'), '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

@Controller('admin/prontuario')
@UseGuards(AdminTokenGuard)
export class AdminProntuarioController {
  constructor(private readonly adminProntuario: AdminProntuarioService) {}

  @Get('tenants/:slug/patients')
  listPatientsByTenant(@Param('slug') slug: string) {
    return this.adminProntuario.listPatientsByTenantSlug(slug);
  }

  @Get('patients/:patientId')
  getPatientProntuario(@Param('patientId') patientId: string) {
    return this.adminProntuario.getPatientProntuario(patientId);
  }

  @Get('patients/:patientId/pdf')
  async downloadProntuarioPdf(@Param('patientId') patientId: string, @Res() res: Response) {
    const { buffer, patientName } = await this.adminProntuario.generateProntuarioPdf(patientId);
    const filename = `prontuario-${slugForFilename(patientName)}.pdf`;
    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(buffer);
  }
}
