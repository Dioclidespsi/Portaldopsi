export interface TestItem {
  id: string;
  text: string;
}

export interface ScoreBand {
  /** Faixa fecha em maxScore inclusive; a primeira faixa cujo maxScore >= pontuação vence. */
  maxScore: number;
  label: string;
}

export interface TestDefinition {
  slug: string;
  title: string;
  category: 'ANSIEDADE' | 'PERSONALIDADE' | 'VOCACIONAL';
  /** Citação da fonte original — nunca inventar instrumento sem isso. */
  source: string;
  /** Aviso mostrado na tela antes de aplicar — ver README do módulo. */
  disclaimer: string;
  instructions: string;
  responseScale: { value: number; label: string }[];
  items: TestItem[];
  scoreBands: ScoreBand[];
}
