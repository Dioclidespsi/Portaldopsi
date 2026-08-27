import { AnamneseTemplate } from './types';

/**
 * Catálogo em código dos 4 modelos de anamnese, por faixa etária. A
 * estrutura (seções e perguntas-guia) foi montada comparando múltiplas
 * fontes de referência da prática clínica em psicologia (fichas de
 * anamnese amplamente usadas na profissão, convergentes entre si —
 * Amplimed, Ciclo CEAP, PsiFllux, Elisabeth Assis, Studocu; a parte
 * cognitiva/funcional do modelo idoso segue a estrutura de anamnese
 * geriátrica do Manual MSD, referência profissional de medicina),
 * unindo os itens que se repetem entre elas. Nenhum texto clínico de
 * paciente real foi copiado — só os RÓTULOS de seção e as
 * perguntas-guia. O conteúdo de cada seção é sempre escrito pelo
 * psicólogo no momento do preenchimento.
 */
export const ANAMNESE_CATALOG: Record<string, AnamneseTemplate> = {
  infantil: {
    slug: 'infantil',
    title: 'Anamnese Infantil',
    suggestedAgeRange: { min: 0, max: 11 },
    sections: [
      {
        key: 'identificacao',
        label: 'Identificação',
        placeholder: 'Nome da criança, data de nascimento, nome do(s) responsável(is), parentesco, com quem mora, escola e série/turma.',
      },
      {
        key: 'motivoConsulta',
        label: 'Motivo da consulta',
        placeholder: 'Queixa principal relatada pelo responsável — o que motivou a busca por atendimento, desde quando, em que situações aparece.',
      },
      {
        key: 'gestacaoParto',
        label: 'Gestação e parto',
        placeholder: 'Gestação planejada/desejada, intercorrências na gestação, tipo de parto, prematuridade, intercorrências no nascimento.',
      },
      {
        key: 'desenvolvimento',
        label: 'Desenvolvimento',
        placeholder: 'Marcos do desenvolvimento (sentar, engatinhar, andar, primeiras palavras), controle esfincteriano (dia/noite), alimentação (amamentação, introdução alimentar, dificuldades atuais).',
      },
      {
        key: 'sono',
        label: 'Sono',
        placeholder: 'Rotina de sono, dificuldades para dormir, pesadelos, com quem divide o quarto/cama.',
      },
      {
        key: 'saude',
        label: 'Saúde',
        placeholder: 'Doenças, cirurgias, medicações em uso, alergias, acompanhamento médico atual (pediatra, neuro, outros).',
      },
      {
        key: 'historicoFamiliar',
        label: 'Histórico familiar',
        placeholder: 'Doenças psiquiátricas/neurológicas na família, composição familiar, eventos significativos (separações, luto, mudanças).',
      },
      {
        key: 'ambienteFamiliarSocial',
        label: 'Ambiente familiar e social',
        placeholder: 'Relação com pais e irmãos, rotina em casa, regras e limites, com quem passa mais tempo.',
      },
      {
        key: 'vidaEscolar',
        label: 'Vida escolar',
        placeholder: 'Adaptação à escola, rendimento, relação com colegas e professores, mudanças de escola.',
      },
      {
        key: 'comportamento',
        label: 'Comportamento e queixas específicas',
        placeholder: 'Agressividade, ansiedade, medos, birras, comportamento sexual inadequado (sinal de alerta), uso de telas/eletrônicos.',
      },
      {
        key: 'observacoesIniciais',
        label: 'Observações e hipóteses iniciais',
        placeholder: 'Primeira impressão do profissional e hipóteses iniciais.',
      },
    ],
  },
  adolescente: {
    slug: 'adolescente',
    title: 'Anamnese Adolescente',
    suggestedAgeRange: { min: 12, max: 17 },
    sections: [
      {
        key: 'identificacao',
        label: 'Identificação',
        placeholder: 'Nome, idade, escolaridade/série, com quem mora.',
      },
      {
        key: 'queixaPrincipal',
        label: 'Queixa principal (visão do adolescente)',
        placeholder: 'Por que o(a) adolescente acha que está aqui hoje — e, se houver, a visão dos responsáveis, registrada separadamente.',
      },
      {
        key: 'vidaEscolarSocial',
        label: 'Vida escolar e social',
        placeholder: 'Desempenho escolar, reprovações, relação com colegas, grupo de pertencimento, episódios de bullying (sofrido ou praticado).',
      },
      {
        key: 'sexualidadeRiscos',
        label: 'Sexualidade e comportamentos de risco',
        placeholder: 'Espaço seguro para o adolescente falar livremente: orientação sexual/identidade de gênero, início da vida sexual e uso de proteção, uso de álcool/tabaco/outras substâncias, comportamentos de autolesão ou pensamentos de morte.',
      },
      {
        key: 'familia',
        label: 'Família',
        placeholder: 'Relação com os pais, conflitos frequentes em casa, sente-se compreendido pela família.',
      },
      {
        key: 'saudeFisicaMental',
        label: 'Saúde física e mental',
        placeholder: 'Histórico médico, medicações em uso, sono, alimentação, psicoterapia anterior.',
      },
      {
        key: 'usoTecnologia',
        label: 'Uso de tecnologia e redes sociais',
        placeholder: 'Tempo de tela, uso de redes sociais e jogos, impacto no sono/rotina/relações.',
      },
      {
        key: 'historicoFamiliar',
        label: 'Histórico familiar',
        placeholder: 'Doenças psiquiátricas/neurológicas na família, eventos familiares significativos.',
      },
      {
        key: 'observacoesIniciais',
        label: 'Observações e hipóteses iniciais',
        placeholder: 'Observações do profissional e hipóteses iniciais.',
      },
    ],
  },
  adulto: {
    slug: 'adulto',
    title: 'Anamnese Adulto',
    suggestedAgeRange: { min: 18, max: 59 },
    sections: [
      {
        key: 'identificacao',
        label: 'Identificação',
        placeholder: 'Nome, idade, estado civil, profissão, escolaridade, contato de emergência.',
      },
      {
        key: 'queixaPrincipal',
        label: 'Queixa principal',
        placeholder: 'Motivo da procura, na fala do próprio paciente.',
      },
      {
        key: 'historiaQueixaAtual',
        label: 'História da queixa atual',
        placeholder: 'Quando começou, como evoluiu, intensidade e frequência, sintomas físicos e emocionais associados.',
      },
      {
        key: 'historicoSaude',
        label: 'Histórico de saúde',
        placeholder: 'Doenças, cirurgias, medicações em uso, alergias, acompanhamento médico atual.',
      },
      {
        key: 'historicoPsiquiatrico',
        label: 'Histórico psiquiátrico e psicoterapia anterior',
        placeholder: 'Psicoterapia anterior, internações, uso de psicofármacos, diagnósticos prévios.',
      },
      {
        key: 'habitosVida',
        label: 'Hábitos de vida',
        placeholder: 'Sono, alimentação, atividade física, uso de álcool/tabaco/outras substâncias.',
      },
      {
        key: 'historicoFamiliar',
        label: 'Histórico familiar',
        placeholder: 'Composição familiar, doenças psiquiátricas na família, eventos significativos.',
      },
      {
        key: 'vidaSocialProfissional',
        label: 'Vida social, afetiva e profissional',
        placeholder: 'Relacionamentos, satisfação no trabalho, rede de apoio.',
      },
      {
        key: 'examePsiquico',
        label: 'Exame psíquico',
        placeholder: 'Aparência, humor, afeto, curso e conteúdo do pensamento, orientação — observação clínica do profissional.',
      },
      {
        key: 'hipotesesIniciais',
        label: 'Hipóteses iniciais e plano',
        placeholder: 'Hipóteses diagnósticas iniciais e plano de condução do caso.',
      },
    ],
  },
  idoso: {
    slug: 'idoso',
    title: 'Anamnese Idoso',
    suggestedAgeRange: { min: 60, max: null },
    sections: [
      {
        key: 'identificacao',
        label: 'Identificação',
        placeholder: 'Nome, idade, estado civil, com quem mora; se houver informante além do próprio paciente, nome, vínculo e grau de confiabilidade da informação.',
      },
      {
        key: 'queixaPrincipal',
        label: 'Queixa principal',
        placeholder: 'Queixa principal — do próprio idoso e/ou do informante/cuidador, registradas separadamente se divergirem.',
      },
      {
        key: 'funcaoCognitiva',
        label: 'Função cognitiva',
        placeholder: 'Quando notaram os primeiros sinais de declínio, queixas de memória, orientação, dificuldade para aprender coisas novas, ler ou escrever.',
      },
      {
        key: 'historicoMedico',
        label: 'Histórico médico',
        placeholder: 'Doenças crônicas, medicações em uso (atenção a polifarmácia), quedas recentes, déficits sensoriais (visão/audição).',
      },
      {
        key: 'historicoPsiquiatricoFamiliar',
        label: 'Histórico psiquiátrico e familiar',
        placeholder: 'Histórico psiquiátrico pessoal, histórico familiar de doenças neurológicas/psiquiátricas.',
      },
      {
        key: 'aspectosEmocionais',
        label: 'Aspectos emocionais e afetivos',
        placeholder: 'Humor, sentimentos de tristeza/luto, solidão ou isolamento, ansiedade.',
      },
      {
        key: 'avaliacaoFuncional',
        label: 'Avaliação funcional',
        placeholder: 'Autonomia nas atividades básicas (higiene, alimentação, mobilidade) e instrumentais (finanças, medicações, transporte) do dia a dia.',
      },
      {
        key: 'redeApoio',
        label: 'Rede de apoio',
        placeholder: 'Rede de apoio familiar e social, quem são os cuidadores principais.',
      },
      {
        key: 'observacoesIniciais',
        label: 'Observações e hipóteses iniciais',
        placeholder: 'Observações do profissional e hipóteses iniciais.',
      },
    ],
  },
};

export function getAnamneseTemplate(slug: string): AnamneseTemplate | null {
  return ANAMNESE_CATALOG[slug] ?? null;
}

export function listAnamneseTemplates(): AnamneseTemplate[] {
  return Object.values(ANAMNESE_CATALOG);
}

/** Sugere o modelo pela idade do paciente (em anos) — retorna null se a idade não bater com nenhuma faixa (não deveria acontecer, as 4 juntas cobrem 0+). */
export function suggestAnamneseTemplateByAge(ageInYears: number): AnamneseTemplate | null {
  return (
    listAnamneseTemplates().find(
      (t) => ageInYears >= t.suggestedAgeRange.min && (t.suggestedAgeRange.max === null || ageInYears <= t.suggestedAgeRange.max),
    ) ?? null
  );
}
