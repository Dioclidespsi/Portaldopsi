import { TestDefinition } from './types';
import { gad7 } from './gad7';

/**
 * Catálogo de escalas abertas. Só entram aqui instrumentos cujo texto de item
 * eu (Claude) consigo reproduzir com confiança de fonte pública verificável —
 * por isso só o GAD-7 está registrado agora.
 *
 * IPIP (personalidade) e O*NET Interest Profiler/RIASEC (orientação
 * vocacional), citados no documento de arquitetura, foram deliberadamente
 * DEIXADOS DE FORA: são instrumentos de domínio público, mas com dezenas de
 * itens e regras de pontuação/inversão por fator que não devem ser
 * reproduzidos de memória sem checar contra a fonte oficial — o risco de um
 * item ligeiramente errado invalidar a pontuação clínica é real. Para
 * adicionar:
 *   1. Copiar o texto oficial dos itens de ipip.ori.org (IPIP) ou do banco de
 *      itens do O*NET Interest Profiler (onetcenter.org).
 *   2. Criar `ipip-50.ts` / `onet-riasec.ts` seguindo o formato de gad7.ts.
 *   3. Registrar no TEST_CATALOG abaixo.
 */
export const TEST_CATALOG: Record<string, TestDefinition> = {
  [gad7.slug]: gad7,
};

export function listTestDefinitions(): TestDefinition[] {
  return Object.values(TEST_CATALOG);
}

export function getTestDefinition(slug: string): TestDefinition | undefined {
  return TEST_CATALOG[slug];
}
