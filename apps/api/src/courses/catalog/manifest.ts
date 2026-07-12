import { CourseManifest } from './types';

/**
 * Metadados de negócio por bloco (título, se é gratuito, se é exclusivo do
 * bundle) — não dá pra derivar isso do sistema de arquivos, então fica
 * hand-authored aqui. A lista de módulos dentro de cada bloco é preenchida em
 * tempo real por scan.ts lendo as pastas Modulo-N.N e seus build-modulo.js.
 */
export const COURSE_MANIFESTS: CourseManifest[] = [
  {
    slug: 'formacao-neurociencia',
    folderName: 'Formacao-Neurociencia',
    title: 'Formação em Neurociência Aplicada à Psicoterapia',
    description: '47 módulos em 5 blocos: Fundamentos, Psicodiagnóstico, Farmacologia, Protocolos Clínicos e Integração/Carreira.',
    priceCents: null,
    blocos: [
      { number: 1, title: 'Fundamentos', free: false, bundleOnly: false },
      { number: 2, title: 'Psicodiagnóstico', free: false, bundleOnly: false },
      { number: 3, title: 'Farmacologia', free: false, bundleOnly: false },
      { number: 4, title: 'Protocolos Clínicos', free: false, bundleOnly: false },
      { number: 5, title: 'Integração, Carreira e Prática Supervisionada', free: false, bundleOnly: true },
    ],
  },
  {
    slug: 'escola-marketing-psicologos',
    folderName: 'Escola-Marketing-Psicologos',
    title: 'Escola de Marketing para Psicólogos',
    description: '27 módulos em 6 blocos: Posicionamento, Ética na Publicidade, Conteúdo, Aquisição de Pacientes, Vendas e Gestão.',
    priceCents: null,
    blocos: [
      { number: 1, title: 'Posicionamento e Nicho', free: false, bundleOnly: false },
      { number: 2, title: 'Ética na Publicidade', free: true, bundleOnly: false },
      { number: 3, title: 'Conteúdo e Autoridade', free: false, bundleOnly: false },
      { number: 4, title: 'Aquisição de Pacientes', free: false, bundleOnly: false },
      { number: 5, title: 'Vendas e Primeira Sessão', free: false, bundleOnly: false },
      { number: 6, title: 'Gestão e Escala', free: false, bundleOnly: true },
    ],
  },
];
