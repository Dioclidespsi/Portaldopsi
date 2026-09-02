/**
 * No Brasil, celular (DDD + 9 dígitos, começando com 9) é praticamente sempre
 * WhatsApp-alcançável, mesmo quando a fonte original só rotula como
 * "Telefone" — usado tanto na extração via IA (google-search.provider.ts)
 * quanto na importação de CSV (admin-prospecting.service.ts) pra nunca
 * descartar um lead bom só por falta de rótulo explícito "WhatsApp" na fonte.
 * Retorna o número original (não normalizado) se parecer celular, ou null.
 */
export function toBrWhatsapp(rawPhone: string | null | undefined): string | null {
  if (!rawPhone) return null;
  let digits = rawPhone.replace(/\D/g, '');
  // Remove o código do país (+55) antes de checar o formato local — sem
  // isso, "+55 11 99999-8888" (13 dígitos) nunca bate com o padrão de
  // celular (DDD + 9 dígitos = 11 dígitos).
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith('55')) {
    digits = digits.slice(2);
  }
  const isBrMobile = digits.length === 11 && digits[2] === '9';
  return isBrMobile ? rawPhone : null;
}
