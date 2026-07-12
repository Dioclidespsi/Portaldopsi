// Biblioteca compartilhada de documentos DOCX — Formação em Neurociência Aplicada à Psicoterapia

const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, PageBreak,
  Header, Footer, PageNumber,
} = require("docx");
const fs = require("fs");

const NAVY = "12283D";
const TERRA = "C1652F";
const INK = "2B2B2B";
const MUTED = "6B6157";
const PAPER = "F5F1EA";
const LINE = "D9D2C4";

const FONT = "Calibri";
const FONT_HEAD = "Cambria";

function sub(text) {
  return new Paragraph({
    spacing: { before: 60, after: 200 },
    children: [new TextRun({ text, italics: true, color: MUTED, font: FONT, size: 21 })],
  });
}

function capa(kicker, titulo, subtitulo) {
  return [
    new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: kicker, bold: true, color: TERRA, font: FONT, size: 18 })] }),
    new Paragraph({ spacing: { after: 160 }, children: [new TextRun({ text: titulo, bold: true, color: NAVY, font: FONT_HEAD, size: 44 })] }),
    sub(subtitulo),
  ];
}

function infoBox(linhas) {
  return new Table({
    width: { size: 9350, type: WidthType.DXA },
    columnWidths: [9350],
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: 9350, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: PAPER },
        margins: { top: 160, bottom: 160, left: 200, right: 200 },
        children: linhas.map((l) => new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({ text: l[0] + "  ", bold: true, font: FONT, size: 20, color: NAVY }),
            new TextRun({ text: l[1], font: FONT, size: 20, color: INK }),
          ],
        })),
      })],
    })],
  });
}

function vinhetaBox(text) {
  return new Table({
    width: { size: 9350, type: WidthType.DXA },
    columnWidths: [9350],
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: 9350, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: PAPER },
        margins: { top: 160, bottom: 160, left: 200, right: 200 },
        children: [new Paragraph({ children: [new TextRun({ text, italics: true, font: FONT, size: 22, color: INK })] })],
      })],
    })],
  });
}

function exNum(n, titulo) {
  return new Paragraph({
    spacing: { before: 300, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: LINE, space: 4 } },
    children: [
      new TextRun({ text: `Exercício ${n}`, bold: true, color: TERRA, font: FONT_HEAD, size: 24 }),
      new TextRun({ text: "   " }),
      new TextRun({ text: titulo, bold: true, color: NAVY, font: FONT, size: 24 }),
    ],
  });
}

function p(text, opts) {
  return new Paragraph({ spacing: { before: 80, after: 80 }, children: [new TextRun({ text, font: FONT, size: 22, color: INK, ...(opts || {}) })] });
}

function pergunta(n, text) {
  return new Paragraph({
    spacing: { before: 100, after: 60 },
    indent: { left: 300 },
    children: [
      new TextRun({ text: `${n}. `, bold: true, font: FONT, size: 22, color: NAVY }),
      new TextRun({ text, font: FONT, size: 22, color: INK }),
    ],
  });
}

function linhaResposta(qtd) {
  const linhas = [];
  for (let i = 0; i < (qtd || 1); i++) {
    linhas.push(new Paragraph({
      spacing: { before: 220, after: 220 },
      indent: { left: 300 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: LINE, space: 1 } },
      children: [new TextRun({ text: " ", size: 22 })],
    }));
  }
  return linhas;
}

function tabelaSimples(header, linhasVazias, larguras) {
  const cols = larguras || header.map(() => Math.floor(9350 / header.length));
  return new Table({
    width: { size: 9350, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      new TableRow({
        children: header.map((h, i) => new TableCell({
          width: { size: cols[i], type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, fill: NAVY },
          children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: "FFFFFF", font: FONT, size: 20 })] })],
        })),
      }),
      ...linhasVazias.map((linha) => new TableRow({
        children: linha.map((val, i) => new TableCell({
          width: { size: cols[i], type: WidthType.DXA },
          children: [new Paragraph({ children: [new TextRun({ text: val || " ", font: FONT, size: 20 })] })],
        })),
      })),
    ],
  });
}

function questaoObjetiva(n, enunciado, alternativas) {
  const letras = ["a", "b", "c", "d"];
  return [
    new Paragraph({
      spacing: { before: 260, after: 80 },
      children: [
        new TextRun({ text: `${n}. `, bold: true, color: TERRA, font: FONT, size: 22 }),
        new TextRun({ text: enunciado, font: FONT, size: 22, color: INK }),
      ],
    }),
    ...alternativas.map((alt, i) => new Paragraph({
      spacing: { after: 40 },
      indent: { left: 380 },
      children: [
        new TextRun({ text: `${letras[i]}) `, font: FONT, size: 21, color: INK }),
        new TextRun({ text: alt, font: FONT, size: 21, color: INK }),
      ],
    })),
  ];
}

function tituloH1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 380, after: 160 },
    children: [new TextRun({ text, bold: true, color: NAVY, font: FONT_HEAD, size: 27 })],
  });
}

function paginaDoc(headerTexto, footerTexto, children) {
  return new Document({
    sections: [{
      properties: {
        page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, bottom: 1080, left: 1260, right: 1260 } },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: headerTexto, size: 16, color: MUTED, font: FONT })] })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: footerTexto + " · página ", size: 16, color: MUTED, font: FONT }),
              new TextRun({ children: [PageNumber.CURRENT], size: 16, color: MUTED, font: FONT }),
            ],
          })],
        }),
      },
      children,
    }],
  });
}

function salvar(doc, nomeArquivo) {
  return Packer.toBuffer(doc).then((buf) => {
    fs.writeFileSync(nomeArquivo, buf);
    console.log("done:", nomeArquivo);
  });
}

module.exports = {
  Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak, ShadingType, BorderStyle, WidthType, Table, TableRow, TableCell,
  NAVY, TERRA, INK, MUTED, PAPER, LINE, FONT, FONT_HEAD,
  sub, capa, infoBox, vinhetaBox, exNum, p, pergunta, linhaResposta, tabelaSimples,
  questaoObjetiva, tituloH1, paginaDoc, salvar,
};
