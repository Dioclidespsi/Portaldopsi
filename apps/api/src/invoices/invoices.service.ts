import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

    if (dto.appointmentId) {
      const appointment = await tenantPrisma.appointment.findUnique({ where: { id: dto.appointmentId } });
      if (!appointment) throw new NotFoundException('Agendamento não encontrado.');
      if (appointment.patientId !== dto.patientId) {
        throw new BadRequestException('O agendamento selecionado não é desse paciente.');
      }
    }

    return tenantPrisma.invoice.create({
      data: {
        tenantId,
        patientId: dto.patientId,
        amountCents: dto.amountCents,
        dueDate: new Date(dto.dueDate),
        appointmentId: dto.appointmentId,
      },
    });
  }

  /** "pendente" com vencimento passado aparece como "atrasado" pra quem lê, sem precisar de job em background. */
  private withDerivedStatus<T extends { status: string; dueDate: Date }>(invoice: T): T {
    if (invoice.status === 'pendente' && invoice.dueDate.getTime() < Date.now()) {
      return { ...invoice, status: 'atrasado' };
    }
    return invoice;
  }

  async list(params: { status?: string; from?: string; to?: string; patientId?: string } = {}) {
    const invoices = await this.prisma.forCurrentTenant().invoice.findMany({
      where: {
        patientId: params.patientId,
        dueDate: {
          gte: params.from ? new Date(params.from) : undefined,
          lte: params.to ? new Date(params.to) : undefined,
        },
      },
      orderBy: { dueDate: 'asc' },
      include: { patient: { select: { name: true } }, appointment: { select: { startsAt: true } } },
    });
    const withStatus = invoices.map((i) => this.withDerivedStatus(i));
    return params.status ? withStatus.filter((i) => i.status === params.status) : withStatus;
  }

  async findOne(id: string) {
    const invoice = await this.prisma
      .forCurrentTenant()
      .invoice.findUnique({ where: { id }, include: { patient: { select: { name: true } } } });
    if (!invoice) throw new NotFoundException('Cobrança não encontrada.');
    return this.withDerivedStatus(invoice);
  }

  async updateStatus(id: string, status: InvoiceStatus) {
    await this.findOne(id);
    return this.prisma.forCurrentTenant().invoice.update({
      where: { id },
      data: { status, paidAt: status === 'pago' ? new Date() : null },
    });
  }

  charge(id: string) {
    return this.asaas.createSplitCharge(id);
  }

  async summary() {
    const tenantPrisma = this.prisma.forCurrentTenant();
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [receivedThisMonth, pending, overdue] = await Promise.all([
      tenantPrisma.invoice.aggregate({
        _sum: { amountCents: true },
        where: { status: 'pago', paidAt: { gte: monthStart } },
      }),
      tenantPrisma.invoice.aggregate({
        _sum: { amountCents: true },
        where: { status: 'pendente', dueDate: { gte: now } },
      }),
      tenantPrisma.invoice.aggregate({
        _sum: { amountCents: true },
        where: { status: 'pendente', dueDate: { lt: now } },
      }),
    ]);

    return {
      receivedThisMonthCents: receivedThisMonth._sum.amountCents ?? 0,
      pendingCents: pending._sum.amountCents ?? 0,
      overdueCents: overdue._sum.amountCents ?? 0,
    };
  }
}
