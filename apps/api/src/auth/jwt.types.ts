import { Role, TenantKind } from '@prisma/client';

export interface JwtPayload {
  sub: string; // userId
  tenantId: string;
  role: Role;
  tenantKind: TenantKind;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
