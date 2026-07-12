import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CrmService } from './crm.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
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
  list() {
    return this.crm.list();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLeadDto) {
    return this.crm.update(id, dto);
  }

  @Post(':id/convert')
  convert(@Param('id') id: string) {
    return this.crm.convertToPatient(id);
  }

  @Post(':id/suggest-message')
  suggestFollowUpMessage(@Param('id') id: string) {
    return this.crm.suggestFollowUpMessage(id);
  }
}
