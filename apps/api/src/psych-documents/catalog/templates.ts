import { PsychDocumentTemplate } from './types';

/**
 * Catálogo em código dos modelos de documento psicológico — estrutura
 * (seções/campos) baseada em modelos de referência genéricos de uso comum
 * na profissão (atestado, declaração, laudo, relatório e parecer seguem o
 * padrão de "Resolução CFP nº 06/2019"; nenhum texto clínico de paciente
 * real foi copiado, só os RÓTULOS de seção). O conteúdo de cada seção é
 * sempre escrito pelo psicólogo no momento da emissão — nunca fabricado
 * aqui. Sem modelo de referência disponível para "encaminhamento"; a
 * estrutura abaixo é a mínima genérica (motivo + destino), sem nenhuma
 * redação clínica pré-pronta.
 */
export const PSYCH_DOCUMENT_CATALOG: Record<string, PsychDocumentTemplate> = {
  atestado: {
    slug: 'atestado',
    title: 'Atestado Psicológico',
    includesCid: true,
    includesReceiptProtocol: true,
    sections: [
      {
        key: 'corpo',
        label: 'Corpo do atestado',
        placeholder:
          'Ex: Atesto, para os devidos fins, que o(a) paciente compareceu a atendimento psicológico nesta data, no período de HH:MM às HH:MM...',
      },
    ],
  },
  declaracao: {
    slug: 'declaracao',
    title: 'Declaração',
    sections: [
      {
        key: 'corpo',
        label: 'Corpo da declaração',
        placeholder:
          'Ex: Declaro, para fins [trabalhistas/escolares/...], que o(a) paciente esteve em sessão nos dias e horários abaixo...',
      },
    ],
  },
  laudo: {
    slug: 'laudo',
    title: 'Laudo Psicológico',
    includesCid: true,
    sections: [
      { key: 'descricaoDemanda', label: 'Descrição da demanda', placeholder: 'Motivo da avaliação, quem solicitou, objetivo.' },
      { key: 'procedimentos', label: 'Procedimentos', placeholder: 'Entrevistas, observações, instrumentos/testes utilizados.' },
      { key: 'analise', label: 'Análise', placeholder: 'Integração dos dados coletados durante a avaliação.' },
      { key: 'conclusao', label: 'Conclusão', placeholder: 'Diagnóstico/prognóstico e encaminhamentos, se houver.' },
    ],
  },
  relatorio: {
    slug: 'relatorio',
    title: 'Relatório Psicológico',
    sections: [
      { key: 'descricaoDemanda', label: 'Descrição da demanda', placeholder: 'Quem solicitou o relatório e com qual finalidade.' },
      { key: 'procedimento', label: 'Procedimento', placeholder: 'Resumo do processo terapêutico/avaliativo realizado.' },
      { key: 'analise', label: 'Análise', placeholder: 'Observações relevantes sobre a evolução do caso.' },
      { key: 'conclusao', label: 'Conclusão e recomendações', placeholder: 'Síntese e eventuais recomendações.' },
    ],
  },
  encaminhamento: {
    slug: 'encaminhamento',
    title: 'Encaminhamento',
    sections: [
      { key: 'destino', label: 'Encaminhado para (profissional/especialidade)', placeholder: 'Ex: neurologista, psiquiatra, fonoaudiólogo...' },
      { key: 'motivo', label: 'Motivo do encaminhamento', placeholder: 'Por que este encaminhamento está sendo feito agora.' },
      { key: 'observacoes', label: 'Observações complementares', placeholder: 'Informações que ajudem o profissional de destino (opcional).' },
    ],
  },
  parecer: {
    slug: 'parecer',
    title: 'Parecer Psicológico',
    sections: [
      { key: 'solicitante', label: 'Solicitante e assunto', placeholder: 'Quem solicitou o parecer e sobre o que ele trata.' },
      { key: 'descricaoDemanda', label: 'Descrição da demanda', placeholder: 'Contexto da solicitação.' },
      { key: 'analise', label: 'Análise', placeholder: 'Fundamentação técnica do parecer.' },
      { key: 'conclusao', label: 'Conclusão', placeholder: 'Posicionamento final do parecer.' },
    ],
  },
  /**
   * Contrato de Prestação de Serviços Psicológicos — item 7 do pedido do
   * dono do projeto. Cláusulas com redação-padrão genérica (estrutura comum
   * a esse tipo de contrato na profissão: objeto, formato, honorários,
   * cancelamento, sigilo referenciando o Código de Ética art. 9º, vigência)
   * — não é cópia de nenhum modelo de terceiro, é boilerplate contratual
   * usual. O psicólogo DEVE revisar/ajustar (valores, política específica)
   * antes de finalizar; requiresPatientAcceptance faz o paciente ver
   * "Aceitar" em vez de só "Baixar".
   */
  contrato: {
    slug: 'contrato',
    title: 'Contrato de Prestação de Serviços Psicológicos',
    requiresPatientAcceptance: true,
    sections: [
      {
        key: 'objeto',
        label: 'Objeto',
        defaultValue:
          'O presente instrumento tem por objeto a prestação de serviços de atendimento psicológico ao(à) ' +
          'contratante, nos termos do Código de Ética Profissional do Psicólogo e das Resoluções do Conselho ' +
          'Federal de Psicologia (CFP) aplicáveis, incluindo a Resolução CFP nº 11/2018 quando o atendimento for ' +
          'realizado por meio de Tecnologias da Informação e da Comunicação (TICs).',
      },
      {
        key: 'formatoAtendimento',
        label: 'Formato e duração das sessões',
        defaultValue:
          'As sessões terão duração média de 50 (cinquenta) minutos, em dia e horário previamente combinados ' +
          'entre as partes. Alterações de horário dependem de disponibilidade de agenda e devem ser combinadas ' +
          'com antecedência.',
      },
      {
        key: 'honorarios',
        label: 'Honorários e forma de pagamento',
        defaultValue:
          'O valor da sessão e a forma de pagamento serão informados e combinados diretamente entre o ' +
          'profissional e o(a) contratante antes do início do atendimento, podendo ser revistos mediante ' +
          'comunicação prévia.',
      },
      {
        key: 'cancelamento',
        label: 'Cancelamento, remarcação e faltas',
        defaultValue:
          'Cancelamentos ou remarcações devem ser comunicados com antecedência mínima de 24 (vinte e quatro) ' +
          'horas. Cancelamentos fora desse prazo, ou faltas não justificadas, poderão implicar a cobrança ' +
          'integral da sessão, conforme acordado entre as partes.',
      },
      {
        key: 'sigilo',
        label: 'Sigilo profissional',
        defaultValue:
          'O(A) profissional respeitará o sigilo profissional previsto no Código de Ética Profissional do ' +
          'Psicólogo (art. 9º), preservando a confidencialidade das informações compartilhadas durante o ' +
          'atendimento, ressalvadas as exceções previstas em lei ou quando houver risco à vida do(a) ' +
          'contratante ou de terceiros.',
      },
      {
        key: 'vigencia',
        label: 'Vigência e rescisão',
        defaultValue:
          'Este contrato vigora a partir da data de aceite pelo(a) contratante, podendo ser rescindido por ' +
          'qualquer das partes mediante comunicação prévia, sem prejuízo das sessões já realizadas ou ' +
          'agendadas.',
      },
    ],
  },
};

export function getPsychDocumentTemplate(slug: string): PsychDocumentTemplate | null {
  return PSYCH_DOCUMENT_CATALOG[slug] ?? null;
}

export function listPsychDocumentTemplates(): PsychDocumentTemplate[] {
  return Object.values(PSYCH_DOCUMENT_CATALOG);
}
