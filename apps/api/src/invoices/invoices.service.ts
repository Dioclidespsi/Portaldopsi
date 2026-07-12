import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoiceStatus } from './dto/update-invoice-status.dto';
import { AsaasService } from '../asaas/asaas.service';

/**
 * `create`/`updateStatus` continuam sendo o registro manual do F1 (sem
 * gateway ligado). `charge` é a cobrança real via Asaas — ver
 * AsaasService.createSplitCharge; depois de chamado, o status passa a ser
 * sincronizado pelo webhook do Asaas, não só pelo PATCH manual.
 */
@Injectable()
export class InvoicesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly asaas: AsaasService,
  ) {}

  async create(dto: CreateInvoiceDto) {
    const { tenantId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();

    const patient = await tenantPrisma.patient.findUnique({ where: { id: dto.patientId } });
    if (!patient) throw new NotFoundException('Paciente não encontrado.');

    return tenantPrisma.invoice.create({
      data: {
        tenantId,
        patientId: dto.patientId,
        amountCents: dto.amountCents,
        dueDate: new Date(dto.dueDate),
      },
    });
  }

  list(status?: string) {
    return this.prisma.forCurrentTenant().invoice.findMany({
      where: { status },
      orderBy: { dueDate: 'asc' },
      include: { patient: { select: { name: true } } },
    });
  }

  async findOne(id: string) {
    const invoice = await this.prisma
      .forCurrentTenant()
      .invoice.findUnique({ where: { id }, include: { patient: { select: { name: true } } } });
    if (!invoice) throw new NotFoundException('Cobrança não encontrada.');
    return invoice;
  }

  async updateStatus(id: string, status: InvoiceStatus) {
    await this.findOne(id);
    return this.prisma.forCurrentTenant().invoice.update({ where: { id }, data: { status } });
  }

  charge(id: string) {
    return this.asaas.createSplitCharge(id);
  }
}
