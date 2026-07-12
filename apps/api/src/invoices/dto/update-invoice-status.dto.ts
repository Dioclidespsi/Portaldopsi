import { IsIn } from 'class-validator';

export const INVOICE_STATUSES = ['pendente', 'pago', 'atrasado', 'cancelado'] as const;
export type InvoiceStatus = (typeof INVOICE_STATUSES)[number];

export class UpdateInvoiceStatusDto {
  @IsIn(INVOICE_STATUSES)
  status: InvoiceStatus;
}
