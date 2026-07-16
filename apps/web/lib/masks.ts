/** Formata progressivamente enquanto o usuário digita — sem depender de lib externa. */
export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.replace(/^(\d*)/, '($1');
  if (digits.length <= 6) return digits.replace(/^(\d{2})(\d*)/, '($1) $2');
  if (digits.length <= 10) return digits.replace(/^(\d{2})(\d{4})(\d*)/, '($1) $2-$3');
  return digits.replace(/^(\d{2})(\d{5})(\d*)/, '($1) $2-$3');
}

/** Muda de máscara de CPF pra CNPJ automaticamente ao passar de 11 dígitos. */
export function maskCpfCnpj(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 14);
  if (digits.length <= 11) {
    return digits
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
  }
  return digits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Formata como reais enquanto digita (dígitos puros viram centavos: "15000" -> "150,00"). */
export function maskCurrency(value: string): string {
  const digits = value.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
  const cents = digits.padStart(3, '0');
  const reais = cents.slice(0, -2).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${reais},${cents.slice(-2)}`;
}

export function currencyToCents(masked: string): number {
  return parseInt(masked.replace(/\D/g, ''), 10) || 0;
}
