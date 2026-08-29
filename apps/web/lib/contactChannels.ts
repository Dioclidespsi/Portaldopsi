import { WhatsAppTemplate } from './whatsapp';

/**
 * Camada de "provedores de comunicação" da Prospecção Inteligente (ver
 * spec, item 14) — hoje só existe a via manual: gerar um link pronto
 * (wa.me, mailto, Instagram) que o admin abre e envia com as próprias
 * mãos. NADA aqui dispara mensagem sozinho. Quando a API oficial da Meta
 * for contratada, o ponto de extensão é substituir/complementar estas
 * funções por chamadas reais (WhatsAppBusinessProvider/InstagramGraphProvider),
 * sem mudar a tela — os botões continuam existindo, só passam a valer
 * também como confirmação de envio automático.
 */

/** Usados pelo AdminWhatsAppButton na tela de Prospecção — admin fala com o profissional prospectado. */
export const ADMIN_PROSPECTING_WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    label: 'Primeiro contato',
    text: 'Olá, {nome}! Sou da equipe do Portal do Psi, uma plataforma para psicólogos organizarem agenda, prontuário e presença profissional. Vi seu trabalho e achei que poderia fazer sentido pra você — posso te contar mais?',
  },
  {
    label: 'Convite pra página profissional',
    text: 'Olá, {nome}! Notei que você ainda não tem uma página profissional centralizada — o Portal do Psi ajuda com isso (agenda, site próprio, prontuário). Tem 2 minutos pra eu te mostrar?',
  },
  {
    label: 'Retomar contato',
    text: 'Olá, {nome}, tudo bem? Faz um tempo que te chamei sobre o Portal do Psi — ainda tem interesse em conhecer?',
  },
  { label: 'Mensagem em branco', text: '' },
];

export const ADMIN_PROSPECTING_EMAIL_TEMPLATES: { label: string; subject: string; body: string }[] = [
  {
    label: 'Primeiro contato',
    subject: 'Portal do Psi — presença profissional pra psicólogos',
    body:
      'Olá, {nome}!\n\nSou da equipe do Portal do Psi, uma plataforma para psicólogos organizarem agenda, ' +
      'prontuário e presença profissional em um só lugar. Vi seu trabalho e achei que poderia fazer sentido ' +
      'pra você.\n\nPosso te contar mais?\n\nAbraço.',
  },
  {
    label: 'Convite pra página profissional',
    subject: 'Sua página profissional no Portal do Psi',
    body:
      'Olá, {nome}!\n\nNotei que ainda não encontrei uma página profissional centralizada sua — o Portal do ' +
      'Psi ajuda com isso: agenda online, site próprio e prontuário digital.\n\nTem interesse em conhecer?\n\nAbraço.',
  },
  { label: 'Mensagem em branco', subject: '', body: '' },
];

export function renderTemplateText(text: string, nome: string): string {
  return text.replace(/\{nome\}/g, nome);
}

export function buildMailtoLink(email: string, subject: string, body: string): string {
  const qs = new URLSearchParams();
  if (subject) qs.set('subject', subject);
  if (body) qs.set('body', body);
  const query = qs.toString();
  return `mailto:${email}${query ? `?${query}` : ''}`;
}

/**
 * A Meta NÃO oferece um jeito de pré-preencher o texto de uma DM do
 * Instagram via link (diferente do wa.me) — o máximo possível é abrir a
 * conversa já pronta pra colar. Por isso todo fluxo de Instagram vem
 * sempre acompanhado de um botão "Copiar mensagem" (ver AdminInstagramButton).
 */
export function buildInstagramProfileLink(handle: string): string {
  const clean = handle.replace(/^@/, '').replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/\/$/, '');
  return `https://instagram.com/${clean}`;
}

export function buildInstagramDirectLink(handle: string): string {
  const clean = handle.replace(/^@/, '').replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/\/$/, '');
  return `https://ig.me/m/${clean}`;
}
