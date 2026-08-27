import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TENANT_SLUG = 'dioclides';
const SOURCE = 'Conexa';

const TESTIMONIALS = [
  { authorName: 'RAYLAN', rating: 5, content: 'Ótimo profissional', createdAt: '2026-07-24' },
  { authorName: 'DIEGO', rating: 5, content: 'Muito atencioso.', createdAt: '2026-07-06' },
  { authorName: 'PRISCILA', rating: 5, content: 'Excelente abordagem.muito bom profissional.', createdAt: '2026-06-30' },
  { authorName: 'MARCEL', rating: 5, content: 'Muito resolutivo', createdAt: '2026-07-03' },
  { authorName: 'VINÍCIUS', rating: 5, content: 'Lidou bem com o que propus sobre minha vida', createdAt: '2026-07-14' },
  { authorName: 'RAYLAN', rating: 5, content: 'Recomendado, objetivo e entendeu minha demanda.', createdAt: '2026-06-23' },
];

const tenant = await prisma.tenant.findUniqueOrThrow({ where: { slug: TENANT_SLUG }, select: { id: true } });
const tenantPrisma = prisma.$extends({
  query: {
    $allModels: {
      async $allOperations({ args, query }) {
        const [, result] = await prisma.$transaction([
          prisma.$executeRaw`SELECT set_config('app.tenant_id', ${tenant.id}, TRUE)`,
          query(args),
        ]);
        return result;
      },
    },
  },
});

let created = 0;
let skipped = 0;
for (const t of TESTIMONIALS) {
  const exists = await tenantPrisma.siteComment.findFirst({
    where: { tenantId: tenant.id, authorName: t.authorName, content: t.content, importedFrom: SOURCE },
  });
  if (exists) {
    skipped++;
    continue;
  }
  await tenantPrisma.siteComment.create({
    data: {
      tenantId: tenant.id,
      authorName: t.authorName,
      content: t.content,
      rating: t.rating,
      importedFrom: SOURCE,
      consentToPublish: true,
      publishedByProfessional: true,
      createdAt: new Date(t.createdAt),
    },
  });
  created++;
}

console.log(`Importados: ${created}, já existentes (pulados): ${skipped}`);
await prisma.$disconnect();
