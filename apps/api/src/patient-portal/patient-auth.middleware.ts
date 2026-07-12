import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { patientStorage } from '../common/patient-context';
import { PatientJwtPayload } from './patient-jwt.types';

/**
 * Espelha auth/auth.middleware.ts, mas para o token de paciente — payload tem
 * `kind: 'PACIENTE'` em vez de `role`, e abre `patientStorage`, não
 * `tenantStorage`. As duas nunca se misturam: rotas de paciente ficam fora
 * do AuthMiddleware de equipe (ver exclude em auth.module.ts) e vice-versa.
 */
@Injectable()
export class PatientAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwt: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token ausente.');
    }

    let payload: PatientJwtPayload;
    try {
      payload = this.jwt.verify<PatientJwtPayload>(header.slice('Bearer '.length));
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado.');
    }

    if (payload.kind !== 'PACIENTE') {
      throw new UnauthorizedException('Token não é de paciente.');
    }

    patientStorage.run({ tenantId: payload.tenantId, patientId: payload.sub }, () => next());
  }
}
