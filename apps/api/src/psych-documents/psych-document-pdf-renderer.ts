// esModuleInterop está desligado neste tsconfig (só allowSyntheticDefaultImports,
// que afeta so a checagem de tipos, nao o JS emitido) - "import PDFDocument from
// 'pdfkit'" compilava para pdfkit_1.default, que não existe em runtime (pdfkit
// exporta a classe direto via module.exports). import = require() evita o wrapper.
import PDFDocument = require('pdfkit');
import * as fs from 'fs';
import { CONFIDENTIALITY_NOTE } from './catalog';

interface RenderSection {
  label: string;
  content: string;
}

interface RenderInput {
  templateTitle: string;
  cid?: string | null;
  sections: RenderSection[];
  patient: {
    name: string;
    socialName?: string | null;
    cpfCnpj?: string | null;
    birthDate?: Date | null;
  };
  author: {
    name: string;
    crpNumber?: string | null;
    signatureImagePath?: string | null;
    /** Nome da clínica (Tenant.name) — o topo do papel timbrado. Cai pro nome do profissional se não preenchido. */
    clinicName?: string | null;
    /** Endereço/telefone/e-mail da clínica (Tenant.publicAddress/publicPhone/publicEmail — mesmo dado do Site Profissional, configurado em /dashboard/site). */
    contactAddress?: string | null;
    contactPhone?: string | null;
    contactEmail?: string | null;
  };
  includesReceiptProtocol?: boolean;
  issuedAt: Date;
}

const INK = '#16211d';
const INK_SOFT = '#4b544e';
const ACCENT = '#1f6f63';
const ACCENT_DEEP = '#123832';
const LINE = '#dcded6';

const MARGIN_LEFT = 50;
const MARGIN_RIGHT = 50;
const MARGIN_TOP = 130;
const MARGIN_BOTTOM = 95;

function contactLine(author: RenderInput['author']): string | null {
  const parts = [author.contactPhone, author.contactEmail].filter(Boolean);
  return parts.length > 0 ? parts.join(' · ') : null;
}

function addressLine(author: RenderInput['author']): string | null {
  return author.contactAddress?.trim() || null;
}

/**
 * Cabeçalho do papel timbrado — desenhado em TODA página (ver
 * bufferedPageRange no fim do arquivo), sempre com posição absoluta (x/y
 * fixos), nunca no fluxo normal de `.text()`, senão ficaria preso à margem
 * reservada em vez de ocupar a faixa de topo por cima dela.
 */
function drawHeader(doc: PDFKit.PDFDocument, author: RenderInput['author']): void {
  const pageWidth = doc.page.width;
  const contentWidth = pageWidth - MARGIN_LEFT - MARGIN_RIGHT;
  const clinicName = author.clinicName?.trim() || author.name;
  // `lineBreak: false` é essencial em todo texto de cabeçalho/rodapé: sem
  // isso, o pdfkit checa a posição contra a margem inferior da página
  // (mesmo com x/y absolutos) e, perto da borda, insere uma página nova
  // sozinho — foi um bug real aqui (rodapé perto da margem duplicava
  // páginas em branco). lineBreak:false desliga esse comportamento.
  const opts = { width: contentWidth, lineBreak: false };

  let y = 40;
  doc.font('Helvetica-Bold').fontSize(14).fillColor(ACCENT_DEEP).text(clinicName, MARGIN_LEFT, y, opts);
  y += 20;

  if (author.clinicName?.trim()) {
    doc
      .font('Helvetica')
      .fontSize(9)
      .fillColor(INK_SOFT)
      .text(`Psicólogo(a) responsável: ${author.name}${author.crpNumber ? ` — CRP ${author.crpNumber}` : ''}`, MARGIN_LEFT, y, opts);
    y += 13;
  } else if (author.crpNumber) {
    doc.font('Helvetica').fontSize(9).fillColor(INK_SOFT).text(`Psicólogo(a) — CRP ${author.crpNumber}`, MARGIN_LEFT, y, opts);
    y += 13;
  }

  const headerAddress = addressLine(author);
  if (headerAddress) {
    doc.font('Helvetica').fontSize(9).fillColor(INK_SOFT).text(headerAddress, MARGIN_LEFT, y, opts);
    y += 13;
  }
  const headerContact = contactLine(author);
  if (headerContact) {
    doc.font('Helvetica').fontSize(9).fillColor(INK_SOFT).text(headerContact, MARGIN_LEFT, y, opts);
    y += 13;
  }

  doc.moveTo(MARGIN_LEFT, y + 4).lineTo(pageWidth - MARGIN_RIGHT, y + 4).strokeColor(ACCENT).lineWidth(1.2).stroke();
}

/**
 * Rodapé do papel timbrado — mesma lógica de posição absoluta do
 * cabeçalho, repetido em toda página.
 *
 * pdfkit checa a posição Y contra `page.height - margins.bottom` em TODO
 * `.text()`, mesmo com x/y absolutos e `lineBreak:false` — como o rodapé
 * fica DENTRO da margem inferior reservada de propósito, sem essa checagem
 * desligada ele insere uma página nova sozinho a cada chamada (bug real
 * encontrado testando: cada rodapé duplicava a página em duas). Zerar
 * `margins.bottom` temporariamente é a forma oficial de desligar essa
 * checagem pro trecho que desenha dentro da margem, restaurando o valor
 * logo depois pra não afetar o fluxo normal de conteúdo.
 */
function drawFooter(doc: PDFKit.PDFDocument, author: RenderInput['author'], pageNumber: number, pageCount: number): void {
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const contentWidth = pageWidth - MARGIN_LEFT - MARGIN_RIGHT;
  const clinicName = author.clinicName?.trim() || author.name;

  const ruleY = pageHeight - MARGIN_BOTTOM + 18;
  doc.moveTo(MARGIN_LEFT, ruleY).lineTo(pageWidth - MARGIN_RIGHT, ruleY).strokeColor(LINE).lineWidth(1).stroke();

  const identityParts = [clinicName, addressLine(author), contactLine(author), author.crpNumber ? `CRP ${author.crpNumber}` : null].filter(Boolean);

  const realBottomMargin = doc.page.margins.bottom;
  doc.page.margins.bottom = 0;
  doc
    .font('Helvetica')
    .fontSize(8)
    .fillColor(INK_SOFT)
    .text(identityParts.join('  ·  '), MARGIN_LEFT, ruleY + 8, { width: contentWidth, align: 'center', lineBreak: false });
  doc
    .font('Helvetica')
    .fontSize(8)
    .fillColor(INK_SOFT)
    .text(`Página ${pageNumber} de ${pageCount}`, MARGIN_LEFT, ruleY + 20, { width: contentWidth, align: 'center', lineBreak: false });
  doc.page.margins.bottom = realBottomMargin;
}

/**
 * PDF final de um PsychDocument (laudo/relatório/atestado/declaração/
 * encaminhamento/parecer). Uma vez gerado (na finalização), nunca é
 * reeditado — qualquer correção exige um novo PsychDocument.
 *
 * Papel timbrado de verdade: cabeçalho e rodapé (nome da clínica, endereço,
 * telefone, e-mail, CRP) se repetem em TODA página — usa `bufferPages` pra
 * desenhar os dois só depois que todo o conteúdo já foi escrito e o número
 * final de páginas é conhecido (ver loop com bufferedPageRange no fim).
 * Carimbo/assinatura e o nome completo do profissional aparecem só UMA vez,
 * centralizados, logo depois do fim do texto do documento — nunca por
 * página, e nunca antes do conteúdo.
 */
export function renderPsychDocumentPdf(input: RenderInput): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      bufferPages: true,
      margins: { top: MARGIN_TOP, bottom: MARGIN_BOTTOM, left: MARGIN_LEFT, right: MARGIN_RIGHT },
    });
    const chunks: Buffer[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    doc.font('Helvetica-Bold').fontSize(16).fillColor(INK).text(input.templateTitle.toUpperCase(), { align: 'center' });
    doc.moveDown();

    doc.font('Helvetica').fontSize(11).fillColor(INK);
    doc.text(`Paciente: ${input.patient.name}${input.patient.socialName ? ` (${input.patient.socialName})` : ''}`);
    if (input.patient.cpfCnpj) doc.text(`CPF: ${input.patient.cpfCnpj}`);
    if (input.patient.birthDate) doc.text(`Data de nascimento: ${input.patient.birthDate.toLocaleDateString('pt-BR')}`);
    if (input.cid) doc.text(`CID (referência): ${input.cid}`);
    doc.text(`Data de emissão: ${input.issuedAt.toLocaleDateString('pt-BR')}`);
    doc.moveDown();

    for (const section of input.sections) {
      if (!section.content) continue;
      doc.font('Helvetica-Bold').fontSize(12).fillColor(ACCENT_DEEP).text(section.label);
      doc.moveDown(0.3);
      doc.font('Helvetica').fontSize(11).fillColor(INK).text(section.content, { paragraphGap: 8 });
      doc.moveDown(0.5);
    }

    doc.moveDown();
    doc.font('Helvetica').fontSize(9).fillColor(INK_SOFT).text(CONFIDENTIALITY_NOTE);

    // Bloco de carimbo/assinatura — só uma vez, centralizado, depois do fim
    // do texto. Garante espaço suficiente antes de desenhar; se não couber
    // no que sobrou da página atual, quebra pra uma nova página em vez de
    // cortar a imagem ou invadir a faixa do rodapé.
    const signatureBlockHeight = 150;
    if (doc.y > doc.page.height - MARGIN_BOTTOM - signatureBlockHeight) {
      doc.addPage();
    }
    doc.moveDown(2);

    const hasSignatureImage = input.author.signatureImagePath && fs.existsSync(input.author.signatureImagePath);
    if (hasSignatureImage) {
      // `align` do pdfkit só centraliza a imagem DENTRO da caixa de fit —
      // a caixa em si nasce onde o cursor já está (a margem esquerda), não
      // no centro da página, por isso o x precisa ser calculado à mão.
      // Além disso, `x`/`y` explícitos fazem o pdfkit tratar a imagem como
      // "posicionada" e NÃO avançar o cursor sozinho depois — por isso o
      // `doc.y` também é ajustado manualmente logo abaixo, usando a altura
      // reservada da caixa (não a altura real da imagem, que varia por
      // proporção), pra manter o espaçamento sempre igual até o nome.
      const imageBoxWidth = 180;
      const imageBoxHeight = 90;
      const contentWidth = doc.page.width - MARGIN_LEFT - MARGIN_RIGHT;
      const imageX = MARGIN_LEFT + (contentWidth - imageBoxWidth) / 2;
      const imageY = doc.y;
      doc.image(input.author.signatureImagePath as string, imageX, imageY, { fit: [imageBoxWidth, imageBoxHeight], align: 'center' });
      doc.y = imageY + imageBoxHeight + 10;
    } else {
      const contentWidth = doc.page.width - MARGIN_LEFT - MARGIN_RIGHT;
      const lineY = doc.y + 20;
      const lineWidth = 220;
      const lineX = MARGIN_LEFT + (contentWidth - lineWidth) / 2;
      doc.moveTo(lineX, lineY).lineTo(lineX + lineWidth, lineY).strokeColor(INK_SOFT).lineWidth(0.8).stroke();
      doc.y = lineY + 6;
    }

    doc.font('Helvetica-Bold').fontSize(11).fillColor(INK).text(input.author.name, { align: 'center' });
    if (input.author.crpNumber) {
      doc.font('Helvetica').fontSize(10).fillColor(INK_SOFT).text(`Psicólogo(a) — CRP ${input.author.crpNumber}`, { align: 'center' });
    }

    if (input.includesReceiptProtocol) {
      doc.moveDown(2);
      doc.font('Helvetica').fontSize(10).fillColor(INK).text('Protocolo de recebimento:');
      doc.text('Eu, ______________________________________, RG ________________________,');
      doc.text('confirmo ter recebido o presente documento no dia ___/___/___ e me responsabilizo pelo sigilo das informações e uso do mesmo.');
      doc.moveDown();
      doc.text('_______________________________________');
    }

    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      drawHeader(doc, input.author);
      drawFooter(doc, input.author, i - range.start + 1, range.count);
    }

    doc.end();
  });
}
