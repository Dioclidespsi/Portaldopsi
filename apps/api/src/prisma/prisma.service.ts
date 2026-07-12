import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { getRequestContext } from '../common/tenant-context';

/**
 * Client "cru": sem tenant_id setado, qualquer query em tabela com RLS forçado
 * (ver prisma/rls.sql) retorna zero linhas — falha fechado, nunca aberto. Só
 * deve ser usado para operações que genuinamente não são escopadas por tenant:
 * criar um Tenant novo (signup) e resolver slug -> tenantId no login, antes de
 * existir um tenant autenticado.
 *
 * Para operações legitimamente CROSS-tenant que precisam ler/escrever tabelas
 * com RLS (webhook do Asaas/Stripe sincronizando status por asaasPaymentId/
 * asaasSubscriptionId, console do administrador revisando CRP de qualquer
 * tenant), use `forSystem()` — nunca a query crua, que sempre volta vazia
 * nessas tabelas.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  /** Valor sentinela reservado — nunca é um tenantId real (que são uuid), então nunca colide. Ver rls.sql. */
  private static readonly SYSTEM_CONTEXT = '__system__';
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  /**
   * Client escopado ao tenant da requisição atual. Cada operação roda dentro de
   * uma transação que primeiro faz `SET LOCAL app.tenant_id`, garantindo que o
   * Postgres aplique a RLS policy correta — é o padrão recomendado pela própria
   * documentação do Prisma para multi-tenancy com Row-Level Security.
   */
  forTenant(tenantId: string) {
    const prisma = this;
    return this.$extends({
      query: {
        $allModels: {
          async $allOperations({ args, query }) {
            const [, result] = await prisma.$transaction([
              prisma.$executeRaw`SELECT set_config('app.tenant_id', ${tenantId}, TRUE)`,
              query(args),
            ]);
            return result;
          },
        },
      },
    });
  }

  /** Atalho: client escopado ao tenant da requisição atual (via AsyncLocalStorage). */
  forCurrentTenant() {
    return this.forTenant(getRequestContext().tenantId);
  }

  /** Client para operações cross-tenant legítimas (webhook, admin) — ver policy `OR ... = '__system__'` em rls.sql. */
  forSystem() {
    return this.forTenant(PrismaService.SYSTEM_CONTEXT);
  }
}
