export type SpecialtyGroup = 'psicologo' | 'atendimento';

export interface SpecialtyCategory {
  label: string;
  group: SpecialtyGroup;
  options: string[];
}

export const SPECIALTY_CATEGORIES: SpecialtyCategory[] = [
  {
    label: 'Abordagens teóricas',
    group: 'psicologo',
    options: [
      'Terapia Cognitivo-Comportamental (TCC)',
      'Psicanálise',
      'Gestalt-terapia',
      'Terapia Sistêmica',
      'Abordagem Humanista / Centrada na Pessoa',
      'Análise do Comportamento (ABA)',
      'Terapia Comportamental Dialética (DBT)',
      'Terapia de Aceitação e Compromisso (ACT)',
      'EMDR',
      'Terapia do Esquema',
      'Mindfulness',
      'Psicodrama',
      'Terapia Breve Focal',
      'Hipnose Clínica',
      'Terapias Corporais',
    ],
  },
  {
    label: 'Públicos e faixas etárias',
    group: 'atendimento',
    options: [
      'Psicologia Infantil',
      'Psicologia de Adolescentes',
      'Psicologia de Adultos',
      'Psicologia da Terceira Idade',
      'Terapia de Casal',
      'Terapia Familiar',
      'Psicologia Perinatal (gestação e puerpério)',
      'Parentalidade e Orientação de Pais',
    ],
  },
  {
    label: 'Áreas de atuação',
    group: 'psicologo',
    options: [
      'Psicologia Clínica',
      'Psicologia Escolar e Educacional',
      'Psicologia Organizacional e do Trabalho',
      'Psicologia Jurídica',
      'Psicologia Hospitalar',
      'Psicologia do Esporte',
      'Psicologia Social',
      'Psicologia do Trânsito',
      'Neuropsicologia',
      'Psicopedagogia',
      'Avaliação Psicológica',
      'Psico-oncologia',
      'Psicologia da Saúde',
    ],
  },
  {
    label: 'Temas e queixas frequentes',
    group: 'atendimento',
    options: [
      'Ansiedade',
      'Depressão',
      'Transtorno Obsessivo-Compulsivo (TOC)',
      'Transtorno Bipolar',
      'Transtornos Alimentares',
      'Transtorno do Espectro Autista (TEA)',
      'TDAH',
      'Transtornos de Personalidade',
      'Estresse Pós-Traumático',
      'Fobias e Síndrome do Pânico',
      'Luto',
      'Dependência Química e Comportamental',
      'Sexualidade e Identidade de Gênero',
      'Diversidade e População LGBTQIA+',
      'Violência Doméstica e Abuso',
      'Burnout e Estresse Ocupacional',
      'Transtornos do Sono',
      'Automutilação e Prevenção ao Suicídio',
      'Habilidades Sociais',
      'Autoestima e Autoconhecimento',
      'Relacionamentos Abusivos',
      'Procrastinação',
      'Orientação Profissional e de Carreira',
      'Adoção',
      'Doenças Crônicas e Cuidados Paliativos',
    ],
  },
];

export const ALL_SPECIALTIES = new Set(SPECIALTY_CATEGORIES.flatMap((c) => c.options));
