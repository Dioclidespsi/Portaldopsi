export interface AnamneseSection {
  key: string;
  label: string;
  /** Perguntas-guia da seção — o psicólogo escreve com as próprias palavras, isto só orienta o que não pode faltar. */
  placeholder: string;
}

export interface AnamneseTemplate {
  slug: string;
  title: string;
  /** Faixa etária sugerida (inclusiva) — usada só para sugerir automaticamente o modelo pela idade do paciente. */
  suggestedAgeRange: { min: number; max: number | null };
  sections: AnamneseSection[];
}
