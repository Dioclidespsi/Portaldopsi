import PDFDocument from 'pdfkit';
import * as fs from 'fs';

const [, , inputPath, outputPath] = process.argv;
if (!inputPath || !outputPath) {
  console.error('uso: node md-to-pdf.mjs <entrada.md> <saida.pdf>');
  process.exit(1);
}

const text = fs.readFileSync(inputPath, 'utf-8');
const doc = new PDFDocument({ margin: 56 });
doc.pipe(fs.createWriteStream(outputPath));

for (const rawLine of text.split('\n')) {
  const line = rawLine.trimEnd();
  if (line === '---') {
    doc.moveDown(0.5);
    continue;
  }
  if (line.startsWith('# ')) {
    doc.moveDown(0.3);
    doc.font('Helvetica-Bold').fontSize(16).text(line.slice(2));
    doc.moveDown(0.4);
  } else if (line.startsWith('## ')) {
    doc.moveDown(0.5);
    doc.font('Helvetica-Bold').fontSize(12).text(line.slice(3));
    doc.moveDown(0.2);
  } else if (line.startsWith('**') && line.endsWith('**')) {
    doc.font('Helvetica-Bold').fontSize(10).text(line.replace(/\*\*/g, ''));
    doc.moveDown(0.2);
  } else if (line.trim() === '') {
    doc.moveDown(0.3);
  } else {
    doc.font('Helvetica').fontSize(10).text(line.replace(/\*\*/g, ''));
  }
}

doc.end();
console.log('gerado:', outputPath);
