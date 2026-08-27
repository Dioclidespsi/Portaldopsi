import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const p = new PrismaClient();
const templates = await p.testTemplate.findMany({
  include: { questions: { orderBy: { order: 'asc' } } },
});
fs.writeFileSync('test-templates-export.json', JSON.stringify(templates, null, 2));
console.log(`Exportado(s) ${templates.length} template(s), ${templates.reduce((n, t) => n + t.questions.length, 0)} pergunta(s) no total.`);
await p.$disconnect();
