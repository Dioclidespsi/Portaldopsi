import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceStatusDto } from './dto/update-invoice-status.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { STAFF_ROLES } from '../common/roles';

@Controller('invoices')
@UseGuards(RolesGuard)
@Roles(...STAFF_ROLES)
export class InvoicesController {
  constructor(private readonly invoices: InvoicesService) {}

  @Post()
  create(@Body() dto: CreateInvoiceDto) {
    return this.invoices.create(dto);
  }

  @Get()
  list(@Query('status') status?: string) {
    return this.invoices.list(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoices.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateInvoiceStatusDto) {
    return this.invoices.updateStatus(id, dto.status);
  }

  @Post(':id/charge')
  charge(@Param('id') id: string) {
    return this.invoices.charge(id);
  }
}
