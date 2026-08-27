import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { PsychDocumentsService } from './psych-documents.service';
import { CreatePsychDocumentDto } from './dto/create-psych-document.dto';
import { UpdatePsychDocumentDto } from './dto/update-psych-document.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { STAFF_ROLES } from '../common/roles';

@Controller('psych-documents')
@UseGuards(RolesGuard)
@Roles(...STAFF_ROLES)
export class PsychDocumentsController {
  constructor(private readonly psychDocuments: PsychDocumentsService) {}

  @Get('catalog')
  listCatalog() {
    return this.psychDocuments.listCatalog();
  }

  @Get()
  listForPatient(@Query('patientId') patientId: string) {
    return this.psychDocuments.listForPatient(patientId);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.psychDocuments.getOne(id);
  }

  @Post()
  createDraft(@Body() dto: CreatePsychDocumentDto) {
    return this.psychDocuments.createDraft(dto);
  }

  @Patch(':id')
  updateDraft(@Param('id') id: string, @Body() dto: UpdatePsychDocumentDto) {
    return this.psychDocuments.updateDraft(id, dto);
  }

  @Delete(':id')
  deleteDraft(@Param('id') id: string) {
    return this.psychDocuments.deleteDraft(id);
  }

  @Post(':id/finalize')
  finalize(@Param('id') id: string) {
    return this.psychDocuments.finalize(id);
  }

  @Post(':id/release')
  release(@Param('id') id: string) {
    return this.psychDocuments.release(id);
  }

  @Get(':id/download')
  async download(@Param('id') id: string, @Res() res: Response) {
    const filePath = await this.psychDocuments.getFilePath(id);
    res.download(filePath);
  }
}
