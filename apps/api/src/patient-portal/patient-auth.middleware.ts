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
    // <audio src> não manda header Authorization — só essa rota específica de streaming aceita o token via query
    // (ver meditationAudioUrl em lib/patient-api.ts). Nenhuma outra rota do portal aceita token fora do header.
    // req.path fica relativo ao prefixo dentro de middleware escopado por forRoutes() — sempre "/" aqui,
    // não dá pra checar a rota por ele. req.originalUrl mantém a URL completa como o Express recebeu.
    const isAudioRoute = req.originalUrl.split('?')[0].endsWith('/audio');
    const queryToken = isAudioRoute && typeof req.query.token === 'string' ? req.query.token : undefined;
    const token = header?.startsWith('Bearer ') ? header.slice('Bearer '.length) : queryToken;
    if (!token) {
      throw new UnauthorizedException('Token ausente.');
    }

    let payload: PatientJwtPayload;
    try {
      payload = this.jwt.verify<PatientJwtPayload>(token);
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado.');
    }

    if (payload.kind !== 'PACIENTE') {
      throw new UnauthorizedException('Token não é de paciente.');
    }

    patientStorage.run({ tenantId: payload.tenantId, patientId: payload.sub }, () => next());
  }
}
