import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @MinLength(2)
  clinicName: string;

  @IsString()
  @Matches(/^[a-z0-9-]+$/, {
    message: 'slug deve conter apenas letras minúsculas, números e hífen.',
  })
  slug: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  /// Obrigatório na aquisição (plano free) — vira Tenant.publicPhone, usado
  /// pelo time pra contato via WhatsApp com quem se cadastrou.
  @IsString()
  @Matches(/^\d{10,11}$/, {
    message: 'telefone deve ter DDD + número, só dígitos (ex: 11987654321).',
  })
  phone: string;

  @IsString()
  @MinLength(8, { message: 'senha deve ter ao menos 8 caracteres.' })
  password: string;
}
