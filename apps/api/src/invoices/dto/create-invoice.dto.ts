import { IsISO8601, IsInt, IsString, Min } from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  patientId: string;

  @IsInt()
  @Min(1)
  amountCents: number;

  @IsISO8601()
  dueDate: string;
}
