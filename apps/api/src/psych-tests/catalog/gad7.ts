import { TestDefinition } from './types';

/**
 * GAD-7 (Generalized Anxiety Disorder 7-item scale). Domínio público —
 * Spitzer RL, Kroenke K, Williams JB, Löwe B. "A brief measure for assessing
 * generalized anxiety disorder: the GAD-7." Arch Intern Med. 2006.
 *
 * Tradução para português abaixo é uma tradução de trabalho feita para este
 * protótipo, NÃO a versão validada oficialmente (ver Moreno AL et al., 2016,
 * para a validação brasileira). Antes de qualquer uso clínico real, revisar
 * a redação de cada item contra a versão validada em português.
 */
export const gad7: TestDefinition = {
  slug: 'gad-7',
  title: 'GAD-7 — Escala de Transtorno de Ansiedade Generalizada',
  category: 'ANSIEDADE',
  source: 'Spitzer, Kroenke, Williams & Löwe (2006), Arch Intern Med — domínio público.',
  disclaimer:
    'Tradução de trabalho, não a versão validada oficialmente em português — revisar contra a validação brasileira antes de uso clínico. É instrumento de rastreio, não diagnóstico: o resultado só deve virar entrada de Prontuário depois de revisado e assinado pelo psicólogo, nunca lançado sozinho pelo paciente sem revisão.',
  instructions:
    'Nas últimas 2 semanas, com que frequência você foi incomodado(a) pelos problemas abaixo?',
  responseScale: [
    { value: 0, label: 'Nunca' },
    { value: 1, label: 'Vários dias' },
    { value: 2, label: 'Mais da metade dos dias' },
    { value: 3, label: 'Quase todos os dias' },
  ],
  items: [
    { id: 'q1', text: 'Sentir-se nervoso(a), ansioso(a) ou muito tenso(a)' },
    { id: 'q2', text: 'Não ser capaz de impedir ou controlar as preocupações' },
    { id: 'q3', text: 'Preocupar-se muito com diversas coisas' },
    { id: 'q4', text: 'Dificuldade para relaxar' },
    { id: 'q5', text: 'Ficar tão inquieto(a) que se torna difícil permanecer sentado(a)' },
    { id: 'q6', text: 'Ficar facilmente aborrecido(a) ou irritado(a)' },
    { id: 'q7', text: 'Sentir medo como se algo terrível fosse acontecer' },
  ],
  scoreBands: [
    { maxScore: 4, label: 'Mínima' },
    { maxScore: 9, label: 'Leve' },
    { maxScore: 14, label: 'Moderada' },
    { maxScore: 21, label: 'Severa' },
  ],
};
