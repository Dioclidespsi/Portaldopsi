import { LibraryResource } from './types';

/**
 * Igual ao catálogo de testes: só entram aqui referências que eu (Claude)
 * tenho confiança de fonte verificável — nada de protocolo clínico ou modelo
 * de documento fabricado de memória. Por isso o acervo começa só com as
 * regulamentações já citadas (e conferidas) ao longo deste projeto; expandir
 * com protocolos/artigos reais é trabalho futuro, não fabricação agora.
 */
export const LIBRARY_CATALOG: LibraryResource[] = [
  {
    slug: 'lgpd-dado-sensivel-saude',
    title: 'LGPD — dado de saúde como dado sensível',
    category: 'REGULAMENTACAO',
    summary:
      'Lei nº 13.709/2018 (LGPD), Art. 5º, II: dado de saúde é "dado pessoal sensível", exigindo base legal específica para tratamento (consentimento explícito ou tutela da saúde) e cuidado redobrado com prontuário eletrônico.',
    whereToFind: 'Texto oficial no Planalto (planalto.gov.br), Lei nº 13.709/2018.',
  },
  {
    slug: 'cfp-06-2019-prontuario',
    title: 'Resolução CFP nº 06/2019 — Prontuário Psicológico',
    category: 'REGULAMENTACAO',
    summary:
      'Regula a elaboração e manuseio do prontuário, incluindo prontuário eletrônico: exige assinatura eletrônica qualificada ou certificado digital, backup, e retenção mínima de 5 anos após o último atendimento.',
    whereToFind: 'Texto oficial no site do CFP (site.cfp.org.br).',
  },
  {
    slug: 'cfp-11-2018-atendimento-distancia',
    title: 'Resolução CFP nº 11/2018 — Atendimento a Distância',
    category: 'REGULAMENTACAO',
    summary:
      'Regula a prestação de serviços psicológicos mediados por tecnologia (Teleconsulta): exige registro do serviço no e-Psi do CFP e consentimento informado documentado por sessão.',
    whereToFind: 'Texto oficial no site do CFP (site.cfp.org.br).',
  },
  {
    slug: 'cfp-03-2007-publicidade',
    title: 'Resolução CFP nº 03/2007 + Nota Técnica nº 01/2022 — Publicidade Profissional',
    category: 'ETICA',
    summary:
      'Regula publicidade profissional do psicólogo (Cap. II da Resolução) e sua aplicação a redes sociais (Nota Técnica de 2022): veda, entre outros pontos, prometer cura ou resultado garantido.',
    whereToFind: 'Texto oficial no site do CFP (site.cfp.org.br).',
  },
];
