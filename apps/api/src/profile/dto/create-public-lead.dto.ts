import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePublicLeadDto {
  @IsString()
  @MinLength(2)
  name: string;

  /** Telefone ou e-mail do visitante — como o psicólogo vai retornar o contato, fora da plataforma. */
  @IsString()
  @MinLength(3)
  contact: string;

  @IsOptional()
  @IsString()
  message?: string;
}
