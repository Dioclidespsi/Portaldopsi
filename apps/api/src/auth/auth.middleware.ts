import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { tenantStorage } from '../common/tenant-context';
import { JwtPayload } from './jwt.types';

/**
 * Roda como middleware (não como Guard) de propósito: precisa estabelecer o
 * AsyncLocalStorage ANTES de guards/interceptors/controller executarem, e no
 * Nest middleware corre antes desses estágios. O `next()` do Express fica
 * dentro do `tenantStorage.run(...)`, então todo o resto do pipeline da
 * requisição — guards, controller, PrismaService.forCurrentTenant() — enxerga
 * o contexto.
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwt: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token ausente.');
    }

    let payload: JwtPayload;
    try {
      payload = this.jwt.verify<JwtPayload>(header.slice('Bearer '.length));
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado.');
    }

    req.user = payload;
    tenantStorage.run(
      { tenantId: payload.tenantId, userId: payload.sub, role: payload.role, tenantKind: payload.tenantKind },
      () => next(),
    );
  }
}
