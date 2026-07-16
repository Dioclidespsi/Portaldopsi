import { registerDecorator, ValidationOptions } from 'class-validator';

function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
}

function isValidCpf(value: string): boolean {
  const cpf = onlyDigits(value);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const digits = cpf.split('').map(Number);
  for (const position of [9, 10]) {
    let sum = 0;
    for (let i = 0; i < position; i++) sum += digits[i] * (position + 1 - i);
    const check = ((sum * 10) % 11) % 10;
    if (check !== digits[position]) return false;
  }
  return true;
}

function isValidCnpj(value: string): boolean {
  const cnpj = onlyDigits(value);
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

  const digits = cnpj.split('').map(Number);
  const weightsFor = (position: number) => {
    const base = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    return base.slice(base.length - position);
  };
  for (const position of [12, 13]) {
    const weights = weightsFor(position);
    const sum = weights.reduce((acc, w, i) => acc + w * digits[i], 0);
    const check = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (check !== digits[position]) return false;
  }
  return true;
}

/** Aceita CPF (11 dígitos) ou CNPJ (14 dígitos), com ou sem máscara, validando o dígito verificador. */
export function IsCpfCnpj(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCpfCnpj',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (typeof value !== 'string') return false;
          const digits = onlyDigits(value);
          return digits.length === 11 ? isValidCpf(value) : digits.length === 14 ? isValidCnpj(value) : false;
        },
        defaultMessage() {
          return 'CPF ou CNPJ inválido.';
        },
      },
    });
  };
}

/** Telefone brasileiro: DDD (11–99) + 8 ou 9 dígitos, com ou sem máscara. */
export function IsBrPhone(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isBrPhone',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (typeof value !== 'string') return false;
          const digits = onlyDigits(value);
          if (digits.length !== 10 && digits.length !== 11) return false;
          const ddd = Number(digits.slice(0, 2));
          return ddd >= 11 && ddd <= 99;
        },
        defaultMessage() {
          return 'Telefone inválido — use DDD + número (ex: (11) 91234-5678).';
        },
      },
    });
  };
}
