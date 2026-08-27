export interface SiteProfileBlockField {
  key: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export interface SiteProfileBlockType {
  type: string;
  label: string;
  fields: SiteProfileBlockField[];
}

/**
 * Catálogo em código dos tipos de bloco repetível do Site Profissional —
 * mesmo padrão de PSYCH_DOCUMENT_CATALOG: a estrutura vive aqui, o banco só
 * guarda `type` + `fields: Json` (ver SiteProfileBlock no schema). Nenhum
 * campo vem preenchido — o placeholder só orienta o formato, o conteúdo é
 * sempre escrito pelo psicólogo.
 */
export const SITE_PROFILE_BLOCK_CATALOG: Record<string, SiteProfileBlockType> = {
  formacao: {
    type: 'formacao',
    label: 'Formação acadêmica',
    fields: [
      { key: 'titulo', label: 'Curso/título', placeholder: 'Ex: Graduação em Psicologia', required: true },
      { key: 'instituicao', label: 'Instituição', placeholder: 'Ex: Universidade Federal de...', required: true },
      { key: 'ano', label: 'Ano de conclusão', placeholder: 'Ex: 2018' },
    ],
  },
  experiencia: {
    type: 'experiencia',
    label: 'Experiência profissional',
    fields: [
      { key: 'titulo', label: 'Cargo/atuação', placeholder: 'Ex: Psicólogo clínico', required: true },
      { key: 'local', label: 'Local/instituição', placeholder: 'Ex: Clínica ABC' },
      { key: 'periodo', label: 'Período', placeholder: 'Ex: 2019 – atual' },
      { key: 'descricao', label: 'Descrição', placeholder: 'Breve descrição da atuação nesse período' },
    ],
  },
  credencial: {
    type: 'credencial',
    label: 'Credenciais e certificações',
    fields: [
      { key: 'nome', label: 'Nome da credencial', placeholder: 'Ex: Certificação em Terapia Cognitivo-Comportamental', required: true },
      { key: 'orgaoEmissor', label: 'Órgão emissor', placeholder: 'Ex: CFP, instituição de ensino' },
      { key: 'ano', label: 'Ano', placeholder: 'Ex: 2021' },
    ],
  },
  faq: {
    type: 'faq',
    label: 'Perguntas frequentes',
    fields: [
      { key: 'pergunta', label: 'Pergunta', placeholder: 'Ex: Como funciona a primeira sessão?', required: true },
      { key: 'resposta', label: 'Resposta', placeholder: 'Resposta objetiva, sem promessa de resultado terapêutico', required: true },
    ],
  },
};

export function getSiteProfileBlockType(type: string): SiteProfileBlockType | null {
  return SITE_PROFILE_BLOCK_CATALOG[type] ?? null;
}

export function listSiteProfileBlockTypes(): SiteProfileBlockType[] {
  return Object.values(SITE_PROFILE_BLOCK_CATALOG);
}
