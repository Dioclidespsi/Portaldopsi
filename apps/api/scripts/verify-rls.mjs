// Confirma isolamento RLS entre tenants contra qualquer Postgres (Neon, local, etc).
// Rodar de novo a cada `prisma db push` que recriar tabelas/policies.
// Roda com: DATABASE_URL="<connection string>" node scripts/verify-rls.mjs
// Use a connection string da role de RUNTIME da aplicação (nunca a role dona/admin
// do banco — ver DEPLOY.md, seção "Banco de dados (Neon)", sobre rolbypassrls).
// Apaga os dados de teste que cria ao final, mesmo se alguma checagem falhar.
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function forTenant(tenantId) {
  return prisma.$extends({
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

let tenantA, tenantB;
let failed = false;

try {
  const [{ rolsuper, rolbypassrls }] = await prisma.$queryRaw`
    SELECT rolsuper, rolbypassrls FROM pg_roles WHERE rolname = current_user
  `;
  console.log(`role: rolsuper=${rolsuper} rolbypassrls=${rolbypassrls}`);
  if (rolsuper || rolbypassrls) {
    console.log('FALHA: a role da aplicação tem privilégio que ignora RLS.');
    failed = true;
  }

  tenantA = await prisma.tenant.create({ data: { name: 'RLS Test A', slug: `rls-test-a-${Date.now()}` } });
  tenantB = await prisma.tenant.create({ data: { name: 'RLS Test B', slug: `rls-test-b-${Date.now()}` } });

  await forTenant(tenantA.id).patient.create({ data: { tenantId: tenantA.id, name: 'Paciente A' } });
  await forTenant(tenantB.id).patient.create({ data: { tenantId: tenantB.id, name: 'Paciente B' } });

  const seenByA = await forTenant(tenantA.id).patient.findMany({ where: { tenantId: { in: [tenantA.id, tenantB.id] } } });
  const seenByB = await forTenant(tenantB.id).patient.findMany({ where: { tenantId: { in: [tenantA.id, tenantB.id] } } });
  const seenRaw = await prisma.patient.findMany({ where: { tenantId: { in: [tenantA.id, tenantB.id] } } });

  console.log(`Tenant A vê ${seenByA.length} paciente(s):`, seenByA.map((p) => p.name));
  console.log(`Tenant B vê ${seenByB.length} paciente(s):`, seenByB.map((p) => p.name));
  console.log(`Client sem tenant_id setado vê ${seenRaw.length} paciente(s) (esperado: 0)`);

  if (seenByA.length !== 1 || seenByA[0].name !== 'Paciente A') {
    console.log('FALHA: Tenant A não vê exatamente seu próprio paciente.');
    failed = true;
  }
  if (seenByB.length !== 1 || seenByB[0].name !== 'Paciente B') {
    console.log('FALHA: Tenant B não vê exatamente seu próprio paciente.');
    failed = true;
  }
  if (seenRaw.length !== 0) {
    console.log('FALHA: query sem tenant_id setado retornou linhas (deveria falhar fechado).');
    failed = true;
  }

  if (!failed) console.log('OK: isolamento entre tenants confirmado na Neon.');
} finally {
  if (tenantA) await prisma.tenant.delete({ where: { id: tenantA.id } }).catch(() => {});
  if (tenantB) await prisma.tenant.delete({ where: { id: tenantB.id } }).catch(() => {});
  await prisma.$disconnect();
}

process.exit(failed ? 1 : 0);
