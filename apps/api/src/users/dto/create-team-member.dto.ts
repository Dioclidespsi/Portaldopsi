import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

/** Só secretária/supervisor — titular já existe (criado no signup) e paciente não loga por aqui. */
export const TEAM_MEMBER_ROLES: Role[] = [Role.SECRETARIA, Role.SUPERVISOR];

export class CreateTeamMemberDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsIn(TEAM_MEMBER_ROLES)
  role: Role;
}
