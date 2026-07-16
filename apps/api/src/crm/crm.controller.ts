import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CrmService } from './crm.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { ListLeadsDto } from './dto/list-leads.dto';
import { AddLeadActivityDto } from './dto/add-lead-activity.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { STAFF_ROLES } from '../common/roles';

@Controller('leads')
@UseGuards(RolesGuard)
@Roles(...STAFF_ROLES)
export class CrmController {
  constructor(private readonly crm: CrmService) {}

  @Post()
  create(@Body() dto: CreateLeadDto) {
    return this.crm.create(dto);
  }

  @Get()
  list(@Query() query: ListLeadsDto) {
    return this.crm.list(query);
  }

  @Get('report')
  getFunnelReport() {
    return this.crm.getFunnelReport();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLeadDto) {
    return this.crm.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crm.remove(id);
  }

  @Post(':id/convert')
  convert(@Param('id') id: string) {
    return this.crm.convertToPatient(id);
  }

  @Post(':id/suggest-message')
  suggestFollowUpMessage(@Param('id') id: string) {
    return this.crm.suggestFollowUpMessage(id);
  }

  @Get(':id/activities')
  listActivities(@Param('id') id: string) {
    return this.crm.listActivities(id);
  }

  @Post(':id/activities')
  addActivity(@Param('id') id: string, @Body() dto: AddLeadActivityDto) {
    return this.crm.addActivity(id, dto.content);
  }
}
