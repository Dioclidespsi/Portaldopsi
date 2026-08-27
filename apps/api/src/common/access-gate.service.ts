import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from './tenant-context';

export interface AccessStatus {
  ok: boolean;
  missingCrp: boolean;
  missingSubscription: boolean;
  missingTerms: boolean;
}

/**
 * As três condições que liberam o uso real das ferramentas clínicas (não
 * confundir com o próprio cadastro, que já funciona): CRP do titular
 * verificado pelo admin, assinatura da plataforma ATIVA de verdade (nunca
 * TRIALING/ausente) e nenhum termo de uso pendente de aceite. Usado tanto
 * pelo ClinicalAccessGuard (bloqueia ações no núcleo clínico) quanto por
 * CoursesService (cursos PROFISSIONAIS_GRATIS/PROFISSIONAIS_PAGO) — nunca
 * duplicar esta checagem em outro lugar.
 */
@Injectable()
export class AccessGateService {
  constructor(private readonly prisma: PrismaService) {}

  async checkFullAccess(): Promise<AccessStatus> {
    const { tenantId, userId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();

    const [titular, subscription, pendingTerms] = await Promise.all([
      tenantPrisma.user.findFirst({ where: { role: 'PSICOLOGO_TITULAR' }, select: { crpStatus: true } }),
      tenantPrisma.subscription.findUnique({ where: { tenantId }, select: { status: true } }),
      tenantPrisma.documentTemplate.count({
        where: { requiresAcceptance: true, audience: 'STAFF', acceptances: { none: { userId } } },
      }),
    ]);

    const missingCrp = titular?.crpStatus !== 'VERIFICADO';
    const missingSubscription = subscription?.status !== 'ACTIVE';
    const missingTerms = pendingTerms > 0;

    return { ok: !missingCrp && !missingSubscription && !missingTerms, missingCrp, missingSubscription, missingTerms };
  }
}
