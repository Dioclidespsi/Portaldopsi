'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNav from '../../../components/DashboardNav';
import { CertificateRecord, downloadCertificate, listMyCertificates } from '../../../lib/api';

export default function CertificadosPage() {
  const router = useRouter();
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listMyCertificates()
      .then(setCertificates)
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onDownload(c: CertificateRecord) {
    setError(null);
    try {
      await downloadCertificate(c.id, `certificado-${c.course.title}.png`);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>Certificados</h2>
      <p className="sub">Emitidos automaticamente ao concluir todos os módulos de um curso.</p>

      <table>
        <thead><tr><th>Curso</th><th>Emitido em</th><th>Verificação</th><th>Ação</th></tr></thead>
        <tbody>
          {certificates.map((c) => (
            <tr key={c.id}>
              <td>{c.course.title}</td>
              <td>{new Date(c.issuedAt).toLocaleDateString('pt-BR')}</td>
              <td><a href={`/verificar/${c.verificationCode}`} target="_blank">{c.verificationCode.slice(0, 8)}…</a></td>
              <td>
                <button onClick={() => onDownload(c)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                  Baixar
                </button>
              </td>
            </tr>
          ))}
          {certificates.length === 0 && (
            <tr><td colSpan={4} style={{ color: 'var(--ink-soft)' }}>Nenhum certificado ainda — conclua todos os módulos de um curso em Cursos.</td></tr>
          )}
        </tbody>
      </table>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
