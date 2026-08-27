// Migra Patient já ativados (passwordHash preenchido) para PatientAccount —
// uma conta global por e-mail (normalizado), reaproveitada entre clínicas
// que já tinham o mesmo paciente cadastrado com o mesmo e-mail (isso é o
// próprio propósito da migração: virar UMA conta, não uma por clínica).
//
// Rodar uma vez, depois de `prisma db push` aplicar o schema com
// PatientAccount, e ANTES de remover Patient.passwordHash/portalEnabled
// (Fase 5 do plano de conta global de paciente).
//
// Roda com: DATABASE_URL="<connection string>" node scripts/migrate-patient-accounts.mjs
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SYSTEM = '__system__';

/** Mesmo padrão de PrismaService.forSystem() — patients aceita o sentinela '__system__' na policy de RLS. */
function forSystem() {
  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ args, query }) {
          const [, result] = await prisma.$transaction([
            prisma.$executeRaw`SELECT set_config('app.tenant_id', ${SYSTEM}, TRUE)`,
            query(args),
          ]);
          return result;
        },
      },
    },
  });
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

async function main() {
  const system = forSystem();
  const patients = await system.patient.findMany({
    where: { passwordHash: { not: null }, patientAccountId: null },
  });

  console.log(`${patients.length} paciente(s) ativado(s) sem conta global ainda.`);

  let created = 0;
  let linked = 0;
  let skipped = 0;

  for (const patient of patients) {
    if (!patient.email) {
      console.log(`  pulando ${patient.id} (${patient.name}) — sem e-mail, não dá pra migrar pra conta global.`);
      skipped += 1;
      continue;
    }
    const email = normalizeEmail(patient.email);

    let account = await system.patientAccount.findUnique({ where: { email } });
    if (!account) {
      account = await system.patientAccount.create({
        data: {
          email,
          passwordHash: patient.passwordHash,
          name: patient.name,
          phone: patient.phone,
          cpfCnpj: patient.cpfCnpj,
          birthDate: patient.birthDate,
        },
      });
      created += 1;
    } else {
      linked += 1;
    }

    await system.patient.update({
      where: { id: patient.id },
      data: { patientAccountId: account.id },
    });
  }

  console.log(`Contas novas criadas: ${created}.`);
  console.log(`Vínculos adicionais a conta já existente (mesmo e-mail, outra clínica): ${linked}.`);
  console.log(`Pacientes pulados (sem e-mail): ${skipped}.`);
}

main()
  .catch((err) => {
    console.error('ERRO:', err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
