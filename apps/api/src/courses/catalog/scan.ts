import * as fs from 'node:fs';
import * as path from 'node:path';
import { COURSE_MANIFESTS } from './manifest';
import { Course, CourseBloco, CourseManifest, CourseModule } from './types';

/**
 * Lê o título canônico do módulo de dentro de build-modulo.js (`const NOME =
 * "..."`) em vez de derivar do nome da pasta — o nome da pasta é ASCII-safe
 * (sem acento), o `NOME` no script é o texto de verdade usado para gerar o
 * deck/documentos.
 */
function readModuleMeta(dirPath: string): { moduleNumber: string; title: string } | null {
  const buildFile = path.join(dirPath, 'build-modulo.js');
  if (!fs.existsSync(buildFile)) return null;
  const content = fs.readFileSync(buildFile, 'utf-8');
  const modMatch = content.match(/const MOD\s*=\s*"([^"]+)"/);
  const nomeMatch = content.match(/const NOME\s*=\s*"([^"]+)"/);
  if (!modMatch || !nomeMatch) return null;
  return { moduleNumber: modMatch[1], title: nomeMatch[1] };
}

function findModuleFiles(dirPath: string) {
  const entries = fs.readdirSync(dirPath);
  const deck = entries.find((f) => f.endsWith('.pptx') && !f.startsWith('~$'));
  const avaliacao = entries.find((f) => f.endsWith('Avaliacao.docx'));
  const exercicios = entries.find((f) => f.endsWith('Exercicios.docx'));
  const roteiro = entries.find((f) => f.endsWith('Roteiro-Aulas.docx'));
  return {
    deck: deck ? path.join(dirPath, deck) : undefined,
    avaliacao: avaliacao ? path.join(dirPath, avaliacao) : undefined,
    exercicios: exercicios ? path.join(dirPath, exercicios) : undefined,
    roteiro: roteiro ? path.join(dirPath, roteiro) : undefined,
  };
}

function scanCourse(manifest: CourseManifest, coursesRoot: string): Course {
  const courseDir = path.join(coursesRoot, manifest.folderName);
  const blocos: CourseBloco[] = manifest.blocos.map((b) => ({ ...b, modules: [] }));

  const moduleDirs = fs.existsSync(courseDir)
    ? fs.readdirSync(courseDir, { withFileTypes: true }).filter((e) => e.isDirectory() && e.name.startsWith('Modulo-'))
    : [];

  for (const entry of moduleDirs) {
    const dirPath = path.join(courseDir, entry.name);
    const meta = readModuleMeta(dirPath);
    if (!meta) continue;

    const blocoNumber = parseInt(meta.moduleNumber.split('.')[0], 10);
    const bloco = blocos.find((b) => b.number === blocoNumber);
    if (!bloco) continue;

    const courseModule: CourseModule = {
      slug: entry.name,
      moduleNumber: meta.moduleNumber,
      title: meta.title,
      files: findModuleFiles(dirPath),
    };
    bloco.modules.push(courseModule);
  }

  for (const bloco of blocos) {
    bloco.modules.sort((a, b) => a.moduleNumber.localeCompare(b.moduleNumber, undefined, { numeric: true }));
  }

  return {
    slug: manifest.slug,
    title: manifest.title,
    description: manifest.description,
    priceCents: manifest.priceCents,
    blocos,
  };
}

/**
 * Escaneia a cada chamada (sem cache) — o conteúdo muda raramente e isso
 * evita servir catálogo desatualizado se um módulo for adicionado/editado
 * nas pastas-irmãs sem reiniciar a API.
 */
export function scanAllCourses(coursesRoot: string): Course[] {
  return COURSE_MANIFESTS.map((manifest) => scanCourse(manifest, coursesRoot));
}
