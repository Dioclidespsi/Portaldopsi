import { IsNotEmpty, IsString } from 'class-validator';

/** Pra quem já tem conta Asaas própria (comum entre autônomos) — evita o erro de "CPF/e-mail já em uso" ao tentar criar uma sub-conta nova pra um documento que já existe no Asaas. */
export class LinkExistingPayoutAccountDto {
  @IsString()
  @IsNotEmpty()
  walletId: string;
}
