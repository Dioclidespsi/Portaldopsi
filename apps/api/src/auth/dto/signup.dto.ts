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

  @IsString()
  @MinLength(8, { message: 'senha deve ter ao menos 8 caracteres.' })
  password: string;
}
