/**
 * Parser de CSV simples, sem dependência externa — cobre o que exportações
 * de scraper (Google Maps etc.) realmente produzem: vírgula como separador,
 * campos entre aspas quando têm vírgula/quebra de linha dentro (ex:
 * endereço "Rua Tal, 123, Bairro"), aspas escapadas como "" dentro de campo
 * entre aspas. Não cobre TSV nem separador ; — se precisar, é fácil detectar
 * pelo cabeçalho antes de chamar isso.
 */
export function parseCsv(text: string): Record<string, string>[] {
  // Remove BOM (comum em CSV exportado do Excel/Google Sheets).
  const clean = text.replace(/^﻿/, '');
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < clean.length; i++) {
    const c = clean[i];
    if (inQuotes) {
      if (c === '"') {
        if (clean[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
      continue;
    }
    if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && clean[i + 1] === '\n') i++;
      row.push(field);
      field = '';
      if (row.some((f) => f !== '')) rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  if (field !== '' || row.length > 0) {
    row.push(field);
    if (row.some((f) => f !== '')) rows.push(row);
  }

  if (rows.length === 0) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((r) => {
    const record: Record<string, string> = {};
    headers.forEach((h, idx) => {
      record[h] = (r[idx] ?? '').trim();
    });
    return record;
  });
}

const DIACRITICS = new RegExp('[' + String.fromCharCode(0x0300) + '-' + String.fromCharCode(0x036f) + ']', 'g');

/** Acha o valor da primeira coluna cujo cabeçalho (sem acento, minúsculo) bate com algum dos aliases. */
export function pickColumn(record: Record<string, string>, aliases: string[]): string | undefined {
  const normalize = (s: string) => s.normalize('NFD').replace(DIACRITICS, '').toLowerCase().trim();
  const normalizedAliases = aliases.map(normalize);
  for (const key of Object.keys(record)) {
    if (normalizedAliases.includes(normalize(key))) {
      const value = record[key];
      if (value) return value;
    }
  }
  return undefined;
}
