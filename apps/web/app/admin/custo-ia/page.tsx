'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminShell from '../../../components/AdminShell';
import { getAdminToken } from '../../../lib/admin-api';
import { AiUsageSummary, getAiUsageSummary } from '../../../lib/ai-usage-api';

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card" style={{ flex: '1 1 140px', textAlign: 'center' }}>
      <p style={{ margin: '0 0 0.2rem', fontSize: '1.4rem', fontWeight: 700, color: 'var(--ink)' }}>{value}</p>
      <p className="sub" style={{ margin: 0, fontSize: '0.78rem' }}>{label}</p>
    </div>
  );
}

export default function AdminCustoIaPage() {
  const router = useRouter();
  const [data, setData] = useState<AiUsageSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!getAdminToken()) {
      router.push('/admin/login');
      return;
    }
    getAiUsageSummary()
      .then(setData)
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <AdminShell
      title="Custo de IA"
      description="Uso e gasto real da API da Anthropic, registrado pelo proxy LiteLLM (rodando no próprio servidor — nenhum dado sai daqui). Cobre assistente administrativo, resumo de prontuário, qualificação e busca da prospecção."
    >
      {error && <span className="error">{error}</span>}

      {data && (
        <>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', margin: '0 0 1rem' }}>
            <StatCard label="Gasto total registrado" value={`$${data.totalSpend.toFixed(4)}`} />
            <StatCard label="Chamadas" value={data.totalCalls} />
            <StatCard label="Falhas" value={data.failedCalls} />
            <StatCard label="Tokens totais" value={data.totalTokens.toLocaleString('pt-BR')} />
          </div>

          <div className="card" style={{ marginBottom: '1rem' }}>
            <p style={{ margin: '0 0 0.6rem', fontWeight: 700 }}>Por modelo</p>
            <table>
              <thead>
                <tr><th>Modelo</th><th>Chamadas</th><th>Falhas</th><th>Tokens</th><th>Gasto</th></tr>
              </thead>
              <tbody>
                {Object.entries(data.byModel).map(([model, m]) => (
                  <tr key={model}>
                    <td>{model}</td>
                    <td>{m.calls}</td>
                    <td>{m.failures}</td>
                    <td>{m.tokens.toLocaleString('pt-BR')}</td>
                    <td>${m.spend.toFixed(4)}</td>
                  </tr>
                ))}
                {Object.keys(data.byModel).length === 0 && (
                  <tr><td colSpan={5}>Nenhuma chamada registrada ainda.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="card">
            <p style={{ margin: '0 0 0.6rem', fontWeight: 700 }}>Chamadas recentes</p>
            <table>
              <thead>
                <tr><th>Quando</th><th>Modelo</th><th>Status</th><th>Tokens</th><th>Gasto</th></tr>
              </thead>
              <tbody>
                {data.recent.map((r, i) => (
                  <tr key={i}>
                    <td>{new Date(r.startTime).toLocaleString('pt-BR')}</td>
                    <td>{r.model}</td>
                    <td>
                      <span className={`badge ${r.status === 'failure' ? 'badge-crit' : ''}`}>
                        {r.status === 'failure' ? 'Falhou' : r.status}
                      </span>
                    </td>
                    <td>{r.tokens.toLocaleString('pt-BR')}</td>
                    <td>${r.spend.toFixed(4)}</td>
                  </tr>
                ))}
                {data.recent.length === 0 && (
                  <tr><td colSpan={5}>Nenhuma chamada registrada ainda.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </AdminShell>
  );
}
