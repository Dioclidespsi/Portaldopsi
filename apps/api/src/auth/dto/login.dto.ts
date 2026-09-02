import { IsEmail, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  /**
   * Opcional — a maioria dos e-mails só existe numa clínica, então o login
   * resolve sozinho sem o slug. Só é enviado numa segunda tentativa, depois
   * que o usuário escolhe a clínica na tela de desambiguação (ver
   * AuthService.login — caso raro de mesmo e-mail em clínicas diferentes).
   */
  @IsOptional()
  @IsString()
  slug?: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
