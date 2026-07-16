export interface ScoreBand {
  maxScore: number;
  label: string;
}

export interface ResponseScaleOption {
  value: number;
  label: string;
}

export interface SubscaleDef {
  key: string;
  label: string;
  scoreBands?: ScoreBand[];
}

export interface DerivedScoreFormulaTerm {
  subscale: string;
  weight: number;
}

export interface DerivedScoreDef {
  key: string;
  label: string;
  formula: DerivedScoreFormulaTerm[];
  scoreBands?: ScoreBand[];
}

export interface ScorableQuestion {
  id: string;
  type: string;
  reverseScored?: boolean;
  subscale?: string | null;
}

export interface NamedScoreResult {
  key: string;
  label: string;
  score: number;
  resultLabel: string | null;
}

export interface SuggestedScoreResult {
  suggestedScore: number | null;
  suggestedResultLabel: string | null;
  suggestedSubscaleScores: NamedScoreResult[] | null;
  suggestedDerivedScores: NamedScoreResult[] | null;
}

function matchBand(total: number, bands: ScoreBand[] | null | undefined): string | null {
  if (!bands || bands.length === 0) return null;
  const band = bands.find((b) => total <= b.maxScore) ?? bands[bands.length - 1];
  return band.label;
}

/**
 * Soma as respostas das perguntas objetivas e sugere uma faixa — só uma
 * sugestão, nunca o valor final (ver TestAssignment.finalScore). Itens
 * `reverseScored` (ex: Rosenberg) pontuam invertido: (min+max da escala) -
 * valor escolhido, em vez do valor bruto.
 *
 * Instrumentos com múltiplas subescalas (ex: YSQ com 18 esquemas, Seligman
 * com 6 dimensões) marcam cada TestQuestion.subscale com a `key` de uma
 * entrada em `subscales` — o escore geral (suggestedScore/scoreBands) some
 * apenas os itens SEM subscale; cada subescala soma só os itens com sua
 * própria key. `derivedScores` calcula compostos a partir das subescalas
 * (ex: "Total S - Total I"), como soma ponderada de subscale totals.
 */
export function computeSuggestedScore(
  questions: ScorableQuestion[],
  scoreBands: ScoreBand[] | null | undefined,
  answers: Record<string, number | string>,
  responseScale?: ResponseScaleOption[] | null,
  subscales?: SubscaleDef[] | null,
  derivedScores?: DerivedScoreDef[] | null,
): SuggestedScoreResult {
  const objective = questions.filter((q) => q.type === 'objetiva');

  const values = responseScale?.map((o) => o.value) ?? [];
  const minMaxSum = values.length > 0 ? Math.min(...values) + Math.max(...values) : 0;

  const scoreOf = (q: ScorableQuestion): number => {
    const value = answers[q.id];
    if (typeof value !== 'number') return 0;
    return q.reverseScored ? minMaxSum - value : value;
  };

  const untagged = objective.filter((q) => !q.subscale);
  let suggestedScore: number | null = null;
  let suggestedResultLabel: string | null = null;
  if (untagged.length > 0) {
    suggestedScore = untagged.reduce((sum, q) => sum + scoreOf(q), 0);
    suggestedResultLabel = matchBand(suggestedScore, scoreBands);
  }

  const subscaleTotals: Record<string, number> = {};
  let suggestedSubscaleScores: NamedScoreResult[] | null = null;
  if (subscales && subscales.length > 0) {
    suggestedSubscaleScores = subscales.map((def) => {
      const total = objective.filter((q) => q.subscale === def.key).reduce((sum, q) => sum + scoreOf(q), 0);
      subscaleTotals[def.key] = total;
      return { key: def.key, label: def.label, score: total, resultLabel: matchBand(total, def.scoreBands) };
    });
  }

  let suggestedDerivedScores: NamedScoreResult[] | null = null;
  if (derivedScores && derivedScores.length > 0) {
    suggestedDerivedScores = derivedScores.map((def) => {
      const total = def.formula.reduce((sum, term) => sum + (subscaleTotals[term.subscale] ?? 0) * term.weight, 0);
      return { key: def.key, label: def.label, score: total, resultLabel: matchBand(total, def.scoreBands) };
    });
  }

  return { suggestedScore, suggestedResultLabel, suggestedSubscaleScores, suggestedDerivedScores };
}
