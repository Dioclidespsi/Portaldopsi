import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AdminProspectingService } from './admin-prospecting.service';
import { AdminTokenGuard } from './admin-token.guard';
import { CreateProspectDto } from './dto/create-prospect.dto';
import { UpdateProspectDto } from './dto/update-prospect.dto';
import { ListProspectsDto } from './dto/list-prospects.dto';
import { AddProspectActivityDto } from './dto/add-prospect-activity.dto';
import { BlockProspectDto } from './dto/block-prospect.dto';
import { CreateProspectSearchRequestDto } from './dto/create-prospect-search-request.dto';
import { UpdateProspectSearchRequestDto } from './dto/update-prospect-search-request.dto';

/**
 * Prospecção Inteligente de Profissionais — só a equipe do Portal do Psi
 * (AdminTokenGuard), nunca exposto pra clínica/tenant. Ver
 * AdminProspectingService pro porquê de não usar o CrmModule (`/leads`,
 * que é o CRM de PACIENTE de cada clínica — conceito diferente).
 */
@Controller('admin/prospecting')
@UseGuards(AdminTokenGuard)
export class AdminProspectingController {
  constructor(private readonly prospecting: AdminProspectingService) {}

  @Post()
  create(@Body() dto: CreateProspectDto) {
    return this.prospecting.create(dto);
  }

  @Get()
  list(@Query() query: ListProspectsDto) {
    return this.prospecting.list(query);
  }

  @Get('report')
  getFunnelReport() {
    return this.prospecting.getFunnelReport();
  }

  @Post('search-requests')
  createSearchRequest(@Body() dto: CreateProspectSearchRequestDto) {
    return this.prospecting.createSearchRequest(dto);
  }

  @Get('search-requests')
  listSearchRequests() {
    return this.prospecting.listSearchRequests();
  }

  /** Limpa o histórico (concluídas/canceladas) — nunca mexe nos leads já extraídos. */
  @Delete('search-requests/finished')
  deleteFinishedSearchRequests() {
    return this.prospecting.deleteFinishedSearchRequests();
  }

  @Patch('search-requests/:id')
  updateSearchRequest(@Param('id') id: string, @Body() dto: UpdateProspectSearchRequestDto) {
    return this.prospecting.updateSearchRequestStatus(id, dto.status, dto.resultCount, dto.notes);
  }

  @Post('search-requests/:id/execute')
  executeSearchRequest(@Param('id') id: string) {
    return this.prospecting.executeSearchRequest(id);
  }

  @Post(':id/block')
  block(@Param('id') id: string, @Body() dto: BlockProspectDto) {
    return this.prospecting.block(id, dto.reason);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prospecting.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProspectDto) {
    return this.prospecting.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prospecting.remove(id);
  }

  @Post(':id/score')
  recomputeScore(@Param('id') id: string) {
    return this.prospecting.recomputeScore(id);
  }

  @Post(':id/qualify')
  qualifyWithAi(@Param('id') id: string) {
    return this.prospecting.qualifyWithAi(id);
  }

  @Get(':id/activities')
  listActivities(@Param('id') id: string) {
    return this.prospecting.listActivities(id);
  }

  @Post(':id/activities')
  addActivity(@Param('id') id: string, @Body() dto: AddProspectActivityDto) {
    return this.prospecting.addActivity(id, dto.content);
  }
}
