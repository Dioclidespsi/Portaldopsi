'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '../../../components/AdminNav';
import {
  approveSupervisor,
  getAdminToken,
  listPendingSupervisors,
  PendingSupervisor,
  rejectSupervisor,
} from '../../../lib/admin-api';

export default function AdminSupervisorsPage() {
  const router = useRouter();
  const [pending, setPending] = useState<PendingSupervisor[]>([]);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAdminToken()) {
      router.push('/admin/login');
      return;
    }
    listPendingSupervisors()
      .then(setPending)
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onApprove(userId: string) {
    setError(null);
    try {
      await approveSupervisor(userId);
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
      await rejectSupervisor(rejectingId, reason);
      setPending((prev) => prev.filter((p) => p.id !== rejectingId));
      setRejectingId(null);
      setReason('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <AdminNav />
      <h2 style={{ fontSize: '1.05rem' }}>Aprovação de supervisores</h2>
      <p className="sub">
        Fila de usuários cadastrados como SUPERVISOR por uma clínica assinante e que aguardam autorização da
        plataforma para poder atuar como supervisor (CRP já é verificado no cadastro do assinante, não é checado
        de novo aqui).
      </p>

      <table style={{ marginTop: '1rem' }}>
        <thead>
          <tr><th>Nome</th><th>E-mail</th><th>Clínica</th><th>Ação</th></tr>
        </thead>
        <tbody>
          {pending.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.email}</td>
              <td>{p.tenant.name}</td>
              <td style={{ display: 'flex', gap: '0.4rem' }}>
                <button onClick={() => onApprove(p.id)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                  Aprovar
                </button>
                <button
                  onClick={() => setRejectingId(rejectingId === p.id ? null : p.id)}
                  style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
                >
                  Rejeitar
                </button>
              </td>
            </tr>
          ))}
          {pending.length === 0 && (
            <tr><td colSpan={4} style={{ color: 'var(--ink-soft)' }}>Nenhuma aprovação pendente.</td></tr>
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
    </div>
  );
}
