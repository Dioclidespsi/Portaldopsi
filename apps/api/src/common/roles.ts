import { Role } from '@prisma/client';

/** Quem toca dado clínico/financeiro do paciente — paciente e supervisor externo ficam de fora. */
export const STAFF_ROLES: Role[] = [Role.PSICOLOGO_TITULAR, Role.SECRETARIA, Role.SUPERVISOR];
