import { notFound } from 'next/navigation';
import { verifyCertificate } from '../../../lib/api';

export default async function VerifyCertificatePage({ params }: { params: { code: string } }) {
  const cert = await verifyCertificate(params.code);
  if (!cert) notFound();

  return (
    <div className="shell">
      <h1>Certificado válido</h1>
      <p className="sub">Código {cert.verificationCode}</p>
      <p><strong>{cert.holderName}</strong> concluiu o curso</p>
      <p style={{ fontSize: '1.1rem', margin: '0.3rem 0 1rem' }}>{cert.courseTitle}</p>
      <p className="sub">Emitido em {new Date(cert.issuedAt).toLocaleDateString('pt-BR')} · {cert.clinicName}</p>
    </div>
  );
}
