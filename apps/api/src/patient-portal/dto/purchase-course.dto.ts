import { IsString, MinLength } from 'class-validator';

export class PurchaseCourseDto {
  /** Exigido pelo Asaas pra gerar a cobrança real. */
  @IsString()
  @MinLength(11)
  cpfCnpj: string;
}
