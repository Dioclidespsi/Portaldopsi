'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '../../../components/AdminNav';
import {
  AdminProntuarioPatient,
  AdminProntuarioPatientDetail,
  downloadProntuarioPdf,
  getAdminToken,
  getPatientProntuario,
  listPatientsByTenantSlug,
} from '../../../lib/admin-api';

export default function AdminProntuariosPage() {
  const router = useRouter();
  const [slug, setSlug] = useState('');
  const [tenantName, setTenantName] = useState<string | null>(null);
  const [patients, setPatients] = useState<AdminProntuarioPatient[]>([]);
  const [selected, setSelected] = useState<AdminProntuarioPatientDetail | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!getAdminToken()) router.push('/admin/login');
  }, [router]);

  async function onSearch(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSelected(null);
    setSelectedId(null);
    setSearching(true);
    try {
      const result = await listPatientsByTenantSlug(slug.trim());
      setTenantName(result.tenant.name);
      setPatients(result.patients);
    } catch (err) {
      setTenantName(null);
      setPatients([]);
      setError((err as Error).message);
    } finally {
      setSearching(false);
    }
  }

  async function onSelectPatient(patientId: string) {
    setError(null);
    setSelectedId(patientId);
    setLoadingDetail(true);
    try {
      const detail = await getPatientProntuario(patientId);
      setSelected(detail);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoadingDetail(false);
    }
  }

  async function onDownload(patientId: string, patientName: string) {
    setError(null);
    setDownloading(true);
    try {
      await downloadProntuarioPdf(patientId, `prontuario-${patientName}.pdf`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="shell shell-wide">
      <AdminNav />
      <h2 style={{ fontSize: '1.05rem' }}>Prontuários (exigência do CRP)</h2>
      <p className="sub">
        Acesso administrativo ao prontuário completo de qualquer paciente, de qualquer clínica — para os casos em
        que a Resolução CFP nº 06/2019 exige que a plataforma forneça o prontuário (psicólogo saiu da plataforma,
        cometeu alguma irregularidade, ou o próprio paciente pede a qualquer tempo). O PDF exportado é só leitura,
        sem possibilidade de edição, e nunca inclui as anotações privadas do psicólogo.
      </p>

      <form onSubmit={onSearch} style={{ marginTop: '1rem', flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <label style={{ flex: 1, minWidth: '220px' }}>
          Slug da clínica
          <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="ex: clinica-fulano" required />
        </label>
        <button type="submit" disabled={searching}>{searching ? 'Buscando…' : 'Buscar pacientes'}</button>
      </form>
      {error && <span className="error">{error}</span>}

      {tenantName && (
        <>
          <h3 style={{ fontSize: '0.92rem', marginTop: '1.2rem' }}>Pacientes de {tenantName}</h3>
          <table>
            <thead><tr><th>Nome</th><th>E-mail</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}{p.socialName && ` (${p.socialName})`}</td>
                  <td>{p.email ?? '—'}</td>
                  <td>{p.active ? 'Ativo' : 'Inativo'}</td>
                  <td>
                    <button
                      onClick={() => onSelectPatient(p.id)}
                      style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}
                    >
                      {selectedId === p.id && loadingDetail ? 'Carregando…' : 'Ver prontuário'}
                    </button>
                  </td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr><td colSpan={4} style={{ color: 'var(--ink-soft)' }}>Nenhum paciente encontrado nesta clínica.</td></tr>
              )}
            </tbody>
          </table>
        </>
      )}

      {selected && (
        <div className="callout-box" style={{ marginTop: '1.2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem' }}>
            <div>
              <strong>{selected.patient.name}{selected.patient.socialName && ` (${selected.patient.socialName})`}</strong>
              <p className="sub" style={{ margin: '0.2rem 0 0' }}>
                {selected.patient.cpfCnpj ?? '—'} · {selected.patient.email ?? '—'} ·{' '}
                {selected.patient.birthDate ? new Date(selected.patient.birthDate).toLocaleDateString('pt-BR') : '—'}
              </p>
            </div>
            <button onClick={() => onDownload(selectedId!, selected.patient.name)} disabled={downloading}>
              {downloading ? 'Gerando PDF…' : '⬇ Baixar PDF (só leitura)'}
            </button>
          </div>

          <h4 style={{ fontSize: '0.88rem', marginTop: '1rem' }}>Evolução do prontuário ({selected.entries.length} entrada(s))</h4>
          {selected.entries.map((entry, i) => (
            <div key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--line)' }}>
              <p style={{ fontSize: '0.86rem', margin: '0 0 0.2rem' }}>{entry.content}</p>
              <span className="sub" style={{ margin: 0 }}>
                {entry.author.name} ({entry.author.role}) · {new Date(entry.createdAt).toLocaleString('pt-BR')}
              </span>
            </div>
          ))}
          {selected.entries.length === 0 && <p className="sub">Nenhuma entrada de prontuário registrada.</p>}
        </div>
      )}
    </div>
  );
}
