// Migra o GAD-7 do catálogo antigo em código (src/psych-tests/catalog/gad7.ts)
// pro novo catálogo em banco (TestTemplate/TestQuestion), gerenciável pelo
// admin. Idempotente — upsert por slug, roda de novo sem duplicar.
// Rodar com: node scripts/seed-gad7.mjs
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const GAD7 = {
  slug: 'gad-7',
  title: 'GAD-7 — Escala de Transtorno de Ansiedade Generalizada',
  category: 'Ansiedade',
  source: 'Spitzer, Kroenke, Williams & Löwe (2006), Arch Intern Med — domínio público.',
  disclaimer:
    'Tradução de trabalho, não a versão validada oficialmente em português — revisar contra a validação brasileira antes de uso clínico. É instrumento de rastreio, não diagnóstico: o resultado só deve virar entrada de Prontuário depois de revisado e assinado pelo psicólogo, nunca lançado sozinho pelo paciente sem revisão.',
  instructions: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) pelos problemas abaixo?',
  responseScale: [
    { value: 0, label: 'Nunca' },
    { value: 1, label: 'Vários dias' },
    { value: 2, label: 'Mais da metade dos dias' },
    { value: 3, label: 'Quase todos os dias' },
  ],
  scoreBands: [
    { maxScore: 4, label: 'Mínima' },
    { maxScore: 9, label: 'Leve' },
    { maxScore: 14, label: 'Moderada' },
    { maxScore: 21, label: 'Severa' },
  ],
  items: [
    'Sentir-se nervoso(a), ansioso(a) ou muito tenso(a)',
    'Não ser capaz de impedir ou controlar as preocupações',
    'Preocupar-se muito com diversas coisas',
    'Dificuldade para relaxar',
    'Ficar tão inquieto(a) que se torna difícil permanecer sentado(a)',
    'Ficar facilmente aborrecido(a) ou irritado(a)',
    'Sentir medo como se algo terrível fosse acontecer',
  ],
};

const existing = await prisma.testTemplate.findUnique({ where: { slug: GAD7.slug } });
if (existing) {
  console.log(`Já existe um TestTemplate com slug "${GAD7.slug}" (id=${existing.id}) — nada a fazer.`);
} else {
  const created = await prisma.testTemplate.create({
    data: {
      slug: GAD7.slug,
      title: GAD7.title,
      category: GAD7.category,
      source: GAD7.source,
      disclaimer: GAD7.disclaimer,
      instructions: GAD7.instructions,
      responseScale: GAD7.responseScale,
      scoreBands: GAD7.scoreBands,
      questions: {
        create: GAD7.items.map((prompt, i) => ({ order: i + 1, type: 'objetiva', prompt })),
      },
    },
    include: { questions: true },
  });
  console.log(`Criado TestTemplate "${created.title}" (id=${created.id}) com ${created.questions.length} perguntas.`);
}

await prisma.$disconnect();
