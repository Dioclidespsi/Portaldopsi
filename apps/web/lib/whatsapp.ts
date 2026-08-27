export interface WhatsAppTemplate {
  label: string;
  /** Pode conter o placeholder literal "{nome}" — substituído por renderWhatsAppTemplate. */
  text: string;
}

/**
 * Usados enquanto o titular não configurar os próprios em /dashboard/conta
 * (Tenant.whatsappTemplates fica null nesse caso) — ver AccountService.getWhatsAppTemplates.
 */
export const DEFAULT_WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  { label: 'Lembrete de consulta', text: 'Olá, {nome}! Passando para lembrar da sua consulta agendada. Qualquer dúvida, estou à disposição.' },
  { label: 'Confirmação de agendamento', text: 'Olá, {nome}! Sua consulta foi confirmada. Nos vemos em breve!' },
  { label: 'Boas-vindas', text: 'Olá, {nome}! Seja bem-vindo(a). Fico à disposição para o que precisar.' },
  { label: 'Retomar contato', text: 'Olá, {nome}, tudo bem? Faz um tempo que não conversamos — gostaria de saber como você está.' },
  { label: 'Mensagem em branco', text: '' },
];

/** Usados pelo AdminWhatsAppButton nas filas de verificação (CRP/estudante/supervisor) — admin fala com o profissional, não com paciente. */
export const ADMIN_VERIFICATION_TEMPLATES: WhatsAppTemplate[] = [
  { label: 'Lembrete de pendência', text: 'Olá, {nome}! Notamos que seu cadastro no Portal do Psi está com uma verificação pendente. Precisa de ajuda para concluir?' },
  { label: 'Aprovado(a)', text: 'Olá, {nome}! Sua verificação foi aprovada — você já pode aproveitar todos os recursos da plataforma.' },
  { label: 'Pedido de documento adicional', text: 'Olá, {nome}! Para concluir sua verificação, precisamos de mais um documento ou informação. Pode me enviar por aqui?' },
  { label: 'Mensagem em branco', text: '' },
];

/** Usados pelo AdminWhatsAppButton em /admin/programa-piloto — admin fala com quem se cadastrou como lead da campanha. */
export const ADMIN_CAMPAIGN_LEAD_TEMPLATES: WhatsAppTemplate[] = [
  { label: 'Confirmar interesse', text: 'Olá, {nome}! Vi seu cadastro no Programa Piloto do Portal do Psi. Ainda tem interesse nos 3 meses grátis?' },
  { label: 'Pedido de cadastro', text: 'Olá, {nome}! Para garantir sua vaga no Programa Piloto, falta só criar sua conta em portaldopsi.com.br/signup. Posso te ajudar com isso?' },
  { label: 'Vaga garantida', text: 'Olá, {nome}! Sua vaga no Programa Piloto está garantida — já liberamos os 3 meses grátis na sua conta.' },
  { label: 'Retomar contato', text: 'Olá, {nome}, tudo bem? Vi que você se interessou pelo Programa Piloto e queria saber se ainda posso ajudar.' },
  { label: 'Mensagem em branco', text: '' },
];

export function renderWhatsAppTemplate(text: string, nome: string): string {
  return text.replace(/\{nome\}/g, nome);
}

/** wa.me exige só dígitos com DDI — assume Brasil (55) quando o telefone salvo só tem DDD+número. */
export function toWhatsAppDigits(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length <= 11) return `55${digits}`;
  return digits;
}

export function buildWhatsAppLink(phone: string, message: string): string {
  const digits = toWhatsAppDigits(phone);
  const qs = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${digits}${qs}`;
}
