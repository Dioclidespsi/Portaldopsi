export interface PsychDocumentSection {
  key: string;
  label: string;
  placeholder?: string;
  /** Texto inicial sugerido — o psicólogo revisa/edita antes de finalizar (usado no modelo "contrato"). */
  defaultValue?: string;
}

export interface PsychDocumentTemplate {
  slug: string;
  title: string;
  /** Mostra um campo "CID de referência (opcional)" antes das seções. */
  includesCid?: boolean;
  /**
   * Bloco de protocolo de recebimento (o paciente assina confirmando que
   * recebeu o documento e é responsável pelo sigilo) — só faz sentido em
   * documentos entregues em mão/impressos; opcional no PDF gerado.
   */
  includesReceiptProtocol?: boolean;
  /**
   * Documentos deste tipo exigem consentimento explícito do PACIENTE (botão
   * "Aceitar" no lugar de só "Baixar") — hoje só o contrato de prestação de
   * serviços. Ver PsychDocument.requiresPatientAcceptance/acceptedByPatientAt.
   */
  requiresPatientAcceptance?: boolean;
  sections: PsychDocumentSection[];
}

/**
 * Texto fixo de confidencialidade, presente em todo documento — mesma
 * redação-padrão encontrada nos modelos de referência (atestado/declaração)
 * usados pela profissão. Não é fabricado: é boilerplate jurídico padrão do
 * exercício da psicologia, não conteúdo clínico específico de um paciente.
 */
export const CONFIDENTIALITY_NOTE =
  'O presente documento é de natureza sigilosa, possui caráter extrajudicial e deverá ser ' +
  'utilizado apenas para a finalidade descrita.';
