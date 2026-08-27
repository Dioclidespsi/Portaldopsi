import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

/** Idempotente: pula qualquer template cujo slug já exista (nunca sobrescreve nem duplica perguntas). */
const p = new PrismaClient();
const templates = JSON.parse(fs.readFileSync('test-templates-export.json', 'utf-8'));

let created = 0;
let skipped = 0;
for (const t of templates) {
  const existing = await p.testTemplate.findUnique({ where: { slug: t.slug } });
  if (existing) {
    skipped++;
    continue;
  }
  await p.testTemplate.create({
    data: {
      slug: t.slug,
      title: t.title,
      category: t.category,
      source: t.source,
      disclaimer: t.disclaimer,
      instructions: t.instructions,
      responseScale: t.responseScale ?? undefined,
      scoreBands: t.scoreBands ?? undefined,
      subscales: t.subscales ?? undefined,
      derivedScores: t.derivedScores ?? undefined,
      active: t.active,
      questions: {
        create: t.questions.map((q) => ({
          order: q.order,
          type: q.type,
          prompt: q.prompt,
          reverseScored: q.reverseScored,
          options: q.options ?? undefined,
          subscale: q.subscale ?? undefined,
        })),
      },
    },
  });
  created++;
}
console.log(`Criado(s): ${created}. Pulado(s) (slug já existia): ${skipped}.`);
await p.$disconnect();
