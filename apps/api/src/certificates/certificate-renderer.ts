import * as fs from 'fs';

/**
 * `require` em vez de `import` de propósito: o "types" do pacote sharp
 * aponta pro arquivo de tipos ESM (dist/index.d.mts, com `export default`),
 * que não bate com a resolução de módulo "Node10"/clássica deste tsconfig
 * (module: commonjs, sem moduleResolution explícito) — qualquer forma de
 * import tipado aqui falha com "not callable". Contorna sem mudar a
 * configuração do projeto inteiro.
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharp = require('sharp');

export interface CertificateTextPositions {
  nameX: number;
  nameY: number;
  nameFontSize: number;
  courseX: number;
  courseY: number;
  courseFontSize: number;
  dateX: number;
  dateY: number;
  dateFontSize: number;
  codeX: number;
  codeY: number;
  codeFontSize: number;
}

export interface CertificateRenderData {
  name: string;
  courseTitle: string;
  dateStr: string;
  code: string;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildOverlaySvg(width: number, height: number, p: CertificateTextPositions, d: CertificateRenderData): string {
  const text = (x: number, y: number, fontSize: number, content: string) =>
    `<text x="${x}%" y="${y}%" text-anchor="middle" font-family="sans-serif" font-size="${fontSize}" fill="#1a1a1a">${escapeXml(content)}</text>`;
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    ${text(p.nameX, p.nameY, p.nameFontSize, d.name)}
    ${text(p.courseX, p.courseY, p.courseFontSize, d.courseTitle)}
    ${text(p.dateX, p.dateY, p.dateFontSize, d.dateStr)}
    ${text(p.codeX, p.codeY, p.codeFontSize, d.code)}
  </svg>`;
}

/** Compõe nome/curso/data/código sobre a imagem-modelo e retorna o PNG resultante em memória. */
export async function renderCertificateBuffer(
  imageAbsolutePath: string,
  positions: CertificateTextPositions,
  data: CertificateRenderData,
): Promise<Buffer> {
  const base = sharp(imageAbsolutePath);
  const metadata = await base.metadata();
  const width = metadata.width ?? 1000;
  const height = metadata.height ?? 700;
  const svg = buildOverlaySvg(width, height, positions, data);
  return base.composite([{ input: Buffer.from(svg), top: 0, left: 0 }]).png().toBuffer();
}

export async function renderCertificateToFile(
  imageAbsolutePath: string,
  positions: CertificateTextPositions,
  data: CertificateRenderData,
  outputAbsolutePath: string,
): Promise<void> {
  const buffer = await renderCertificateBuffer(imageAbsolutePath, positions, data);
  await fs.promises.writeFile(outputAbsolutePath, buffer);
}
