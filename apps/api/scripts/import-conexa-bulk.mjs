import { readFileSync } from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const TENANT_SLUG = 'dioclides';
const SOURCE = 'Conexa';
const DEFAULT_RATING = 5;

const items = JSON.parse(readFileSync(process.argv[2], 'utf8'));

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

const existing = await tenantPrisma.siteComment.findMany({
  where: { tenantId: tenant.id, importedFrom: SOURCE },
  select: { authorName: true, content: true },
});
const existingKeys = new Set(existing.map((e) => `${e.authorName}|${e.content}`));

let created = 0;
let skipped = 0;
for (const item of items) {
  const key = `${item.authorName}|${item.content}`;
  if (existingKeys.has(key)) {
    skipped++;
    continue;
  }
  await tenantPrisma.siteComment.create({
    data: {
      tenantId: tenant.id,
      authorName: item.authorName,
      content: item.content,
      rating: DEFAULT_RATING,
      importedFrom: SOURCE,
      consentToPublish: true,
      publishedByProfessional: true,
      createdAt: new Date(item.date),
    },
  });
  existingKeys.add(key);
  created++;
}

console.log(`Importados: ${created}, já existentes (pulados): ${skipped}`);
await prisma.$disconnect();
