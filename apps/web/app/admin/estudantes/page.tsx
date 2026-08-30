'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminShell from '../../../components/AdminShell';
import AdminWhatsAppButton from '../../../components/AdminWhatsAppButton';
import {
  approveStudentVerification,
  downloadStudentDocument,
  getAdminToken,
  listPendingStudentVerifications,
  PendingStudentVerification,
  rejectStudentVerification,
} from '../../../lib/admin-api';
import { ADMIN_VERIFICATION_TEMPLATES } from '../../../lib/whatsapp';

export default function AdminEstudantesPage() {
  const router = useRouter();
  const [pending, setPending] = useState<PendingStudentVerification[]>([]);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAdminToken()) {
      router.push('/admin/login');
      return;
    }
    listPendingStudentVerifications()
      .then(setPending)
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onApprove(userId: string) {
    setError(null);
    try {
      await approveStudentVerification(userId);
      setPending((prev) => prev.filter((p) => p.id !== userId));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onReject(e: FormEvent) {
    e.preventDefault();
    if (!rejectingId) return;
    setError(null);
    try {
      await rejectStudentVerification(rejectingId, reason);
      setPending((prev) => prev.filter((p) => p.id !== rejectingId));
      setRejectingId(null);
      setReason('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onDownload(userId: string, name: string) {
    setError(null);
    try {
      await downloadStudentDocument(userId, `matricula-${name}.pdf`);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <AdminShell title={"Verificação de matrícula (estudantes de psicologia)"} description={"Fila de compras de curso avulso que a IA não conseguiu aprovar automaticamente (documento em PDF, dado inconsistente ou indisponibilidade da IA) — revisão manual antes de liberar o acesso ao curso pago."}>
      <table style={{ marginTop: '1rem' }}>
        <thead>
          <tr><th>Nome</th><th>Instituição</th><th>Matrícula</th><th>Nota da IA</th><th>Documento</th><th>Ação</th></tr>
        </thead>
        <tbody>
          {pending.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.studentInstitution}</td>
              <td>{p.studentEnrollmentNumber}</td>
              <td style={{ maxWidth: '260px', fontSize: '0.8rem', color: 'var(--ink-soft)' }}>{p.studentVerificationNote}</td>
              <td>
                <button onClick={() => onDownload(p.id, p.name)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                  Baixar
                </button>
              </td>
              <td style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <button onClick={() => onApprove(p.id)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                  Aprovar
                </button>
                <button
                  onClick={() => setRejectingId(rejectingId === p.id ? null : p.id)}
                  style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
                >
                  Rejeitar
                </button>
                {p.tenant.publicPhone && (
                  <AdminWhatsAppButton name={p.name} phone={p.tenant.publicPhone} templates={ADMIN_VERIFICATION_TEMPLATES} />
                )}
              </td>
            </tr>
          ))}
          {pending.length === 0 && (
            <tr><td colSpan={6} style={{ color: 'var(--ink-soft)' }}>Nenhuma verificação pendente.</td></tr>
          )}
        </tbody>
      </table>

      {rejectingId && (
        <form onSubmit={onReject} style={{ marginTop: '1rem', flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <label style={{ flex: 1 }}>
            Motivo da rejeição
            <input value={reason} onChange={(e) => setReason(e.target.value)} required />
          </label>
          <button type="submit">Confirmar rejeição</button>
        </form>
      )}
      {error && <span className="error">{error}</span>}
    </AdminShell>
  );
}
