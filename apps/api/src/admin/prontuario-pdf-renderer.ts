// esModuleInterop está desligado neste tsconfig — ver o mesmo comentário em
// psych-documents/psych-document-pdf-renderer.ts.
import PDFDocument = require('pdfkit');

interface ProntuarioPatientInfo {
  name: string;
  socialName?: string | null;
  cpfCnpj?: string | null;
  birthDate?: Date | null;
  email?: string | null;
  tenant: { name: string; slug: string };
}

interface ProntuarioEntryInfo {
  content: string;
  createdAt: Date;
  author: { name: string; role: string };
}

/**
 * PDF não editável do prontuário oficial, para o console do administrador —
 * exigência do CRP (Resolução 06/2019): a plataforma precisa conseguir
 * fornecer o prontuário se o psicólogo sair, cometer irregularidade, ou o
 * paciente pedir. Inclui só as entradas de ProntuarioEntry (append-only) —
 * a anotação privada do psicólogo (Patient.privateNote) é deliberadamente
 * excluída, é um rascunho pessoal, não parte do registro oficial.
 */
export function renderProntuarioPdf(
  patient: ProntuarioPatientInfo,
  entries: ProntuarioEntryInfo[],
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks: Buffer[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    doc.fontSize(16).fillColor('#000').text('Portal do Psi — Prontuário (exportação oficial)', { align: 'center' });
    doc.moveDown();
    doc
      .fontSize(9)
      .fillColor('#555')
      .text(
        `Documento gerado pelo console administrativo em ${new Date().toLocaleString('pt-BR')}. ` +
          'Exportação oficial somente para leitura — qualquer alteração ao prontuário deve ser feita através do sistema, nunca neste arquivo.',
      );
    doc.moveDown();

    doc.fontSize(12).fillColor('#000');
    doc.text(`Clínica: ${patient.tenant.name} (${patient.tenant.slug})`);
    doc.text(`Paciente: ${patient.name}${patient.socialName ? ` (${patient.socialName})` : ''}`);
    if (patient.cpfCnpj) doc.text(`CPF/CNPJ: ${patient.cpfCnpj}`);
    if (patient.birthDate) doc.text(`Data de nascimento: ${patient.birthDate.toLocaleDateString('pt-BR')}`);
    if (patient.email) doc.text(`E-mail: ${patient.email}`);

    doc.moveDown();
    doc.fontSize(13).text('Evolução do prontuário', { underline: true });
    doc.moveDown(0.5);

    if (entries.length === 0) {
      doc.fontSize(11).fillColor('#555').text('Nenhuma entrada de prontuário registrada.');
    }

    for (const entry of entries) {
      doc
        .fontSize(9)
        .fillColor('#555')
        .text(`${entry.createdAt.toLocaleString('pt-BR')} — ${entry.author.name} (${entry.author.role})`);
      doc.fontSize(11).fillColor('#000').text(entry.content, { paragraphGap: 10 });
      doc.moveDown(0.3);
    }

    doc.end();
  });
}
