'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '../../../components/AdminNav';
import { getAdminToken } from '../../../lib/admin-api';
import { AiUsageSummary, getAiUsageSummary } from '../../../lib/ai-usage-api';

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="callout-box" style={{ flex: '1 1 140px', textAlign: 'center' }}>
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
    <div className="shell shell-wide">
      <AdminNav />
      <h2 style={{ fontSize: '1.05rem' }}>Custo de IA</h2>
      <p className="sub">
        Uso e gasto real da API da Anthropic, registrado pelo proxy LiteLLM (rodando no próprio servidor —
        nenhum dado sai daqui). Cobre assistente administrativo, resumo de prontuário, qualificação e busca da
        prospecção.
      </p>

      {error && <span className="error">{error}</span>}

      {data && (
        <>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', margin: '1rem 0' }}>
            <StatCard label="Gasto total registrado" value={`$${data.totalSpend.toFixed(4)}`} />
            <StatCard label="Chamadas" value={data.totalCalls} />
            <StatCard label="Falhas" value={data.failedCalls} />
            <StatCard label="Tokens totais" value={data.totalTokens.toLocaleString('pt-BR')} />
          </div>

          <div className="callout-box" style={{ marginBottom: '1rem' }}>
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

          <div className="callout-box">
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
                    <td style={{ color: r.status === 'failure' ? 'var(--crit, #a33)' : 'var(--accent, #2F6F62)' }}>
                      {r.status === 'failure' ? 'Falhou' : r.status}
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
    </div>
  );
}
