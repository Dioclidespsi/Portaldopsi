export interface ComplianceRule {
  pattern: RegExp;
  reason: string;
}

/**
 * Checklist básico, NÃO revisão jurídica completa. Só entram aqui expressões
 * diretamente ligadas ao que a Resolução CFP nº 03/2007 (Cap. II) + Nota
 * Técnica nº 01/2022 vedam de forma inequívoca — prometer cura ou resultado
 * garantido (já citado em apps/api/src/library/catalog). Não tentei modelar
 * toda a resolução (ex: comparações, depoimentos de paciente) porque isso
 * exige julgamento contextual que um regex não capta com confiança.
 */
export const COMPLIANCE_RULES: ComplianceRule[] = [
  { pattern: /cura\s+(garantida|certeira|definitiva)/i, reason: 'Promete cura — vedado pela Resolução CFP nº 03/2007.' },
  { pattern: /garantia\s+de\s+cura/i, reason: 'Promete cura — vedado pela Resolução CFP nº 03/2007.' },
  { pattern: /resultado\s+garantido/i, reason: 'Promete resultado garantido — vedado pela Resolução CFP nº 03/2007.' },
  { pattern: /100%\s+(eficaz|de\s+eficácia|garantido)/i, reason: 'Promete eficácia garantida — vedado pela Resolução CFP nº 03/2007.' },
];

export interface ComplianceFlag {
  match: string;
  reason: string;
}

export function checkCompliance(content: string): ComplianceFlag[] {
  const flags: ComplianceFlag[] = [];
  for (const rule of COMPLIANCE_RULES) {
    const match = content.match(rule.pattern);
    if (match) flags.push({ match: match[0], reason: rule.reason });
  }
  return flags;
}
