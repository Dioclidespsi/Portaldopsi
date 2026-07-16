'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createPatient, fetchMe, getTenantKind, listPatients, Me, Patient, setPatientActive, submitCrp } from '../../lib/api';
import { isValidEmail, maskCpfCnpj, maskPhone } from '../../lib/masks';
import DashboardNav from '../../components/DashboardNav';

const CRP_STATUS_LABEL: Record<string, string> = {
  NAO_ENVIADO: 'Você ainda não enviou seu CRP para verificação.',
  EM_ANALISE: 'Seu CRP está em análise pela nossa equipe.',
  REJEITADO: 'Seu envio de CRP foi rejeitado — confira o motivo abaixo e reenvie.',
};

export default function DashboardPage() {
  const router = useRouter();
  const [me, setMe] = useState<Me | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ativos' | 'inativos' | 'todos'>('ativos');
  const [name, setName] = useState('');
  const [socialName, setSocialName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const emailInvalid = email.length > 0 && !isValidEmail(email);
  const [crpNumber, setCrpNumber] = useState('');
  const [crpFile, setCrpFile] = useState<File | null>(null);
  const [crpInfo, setCrpInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (getTenantKind() === 'ESTUDANTE') {
      router.push('/dashboard/cursos');
      return;
    }
    Promise.all([fetchMe(), listPatients()])
      .then(([meData, patientsData]) => {
        setMe(meData);
        setPatients(patientsData);
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onAddPatient(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (emailInvalid) {
      setError('E-mail inválido.');
      return;
    }
    try {
      const patient = await createPatient({
        name,
        socialName: socialName || undefined,
        email: email || undefined,
        phone: phone || undefined,
        cpfCnpj: cpfCnpj || undefined,
      });
      setPatients((prev) => [...prev, patient]);
      setName('');
      setSocialName('');
      setEmail('');
      setPhone('');
      setCpfCnpj('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onToggleActive(patient: Patient) {
    setError(null);
    try {
      const updated = await setPatientActive(patient.id, !patient.active);
      setPatients((prev) => prev.map((p) => (p.id === patient.id ? updated : p)));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  const visiblePatients = patients.filter((p) => {
    if (statusFilter === 'ativos' && !p.active) return false;
    if (statusFilter === 'inativos' && p.active) return false;
    if (search.trim()) {
      const term = search.trim().toLowerCase();
      const matches = p.name.toLowerCase().includes(term) || (p.socialName ?? '').toLowerCase().includes(term);
      if (!matches) return false;
    }
    return true;
  });

  async function onSubmitCrp(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setCrpInfo(null);
    if (!crpFile) {
      setError('Selecione o arquivo do documento do CRP.');
      return;
    }
    try {
      await submitCrp(crpNumber, crpFile);
      setMe((prev) => (prev ? { ...prev, crpStatus: 'EM_ANALISE', crpRejectionReason: null } : prev));
      setCrpInfo('Documento enviado — aguarde a análise da nossa equipe.');
      setCrpNumber('');
      setCrpFile(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;
  if (!me) return null;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <p className="sub">Olá, {me.name} · {me.role}</p>

      {me.role === 'PSICOLOGO_TITULAR' && me.crpStatus !== 'VERIFICADO' && (
        <div className="callout-box" style={{ marginBottom: '1.2rem' }}>
          <p style={{ margin: '0 0 0.5rem' }}>
            <strong>Pendência:</strong> {CRP_STATUS_LABEL[me.crpStatus]}
            {me.crpStatus === 'REJEITADO' && me.crpRejectionReason && ` (${me.crpRejectionReason})`}
          </p>
          <form onSubmit={onSubmitCrp} style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <label>
              Número do CRP
              <input value={crpNumber} onChange={(e) => setCrpNumber(e.target.value)} required />
            </label>
            <label>
              Documento (PDF/JPG/PNG)
              <input
                type="file"
                accept="application/pdf,image/jpeg,image/png"
                onChange={(e) => setCrpFile(e.target.files?.[0] ?? null)}
                required
              />
            </label>
            <button type="submit">Enviar para análise</button>
          </form>
          {crpInfo && <p className="sub" style={{ marginTop: '0.5rem' }}>{crpInfo}</p>}
        </div>
      )}

      <h2 style={{ fontSize: '1.05rem' }}>Pacientes</h2>
      <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
        <label style={{ flex: 1, minWidth: '200px' }}>
          Buscar
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nome ou apelido" />
        </label>
        <label>
          Status
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}>
            <option value="ativos">Ativos</option>
            <option value="inativos">Inativos</option>
            <option value="todos">Todos</option>
          </select>
        </label>
      </div>
      <table>
        <thead>
          <tr><th>Nome</th><th>E-mail</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          {visiblePatients.map((p) => (
            <tr key={p.id}>
              <td>
                <Link href={`/dashboard/pacientes/${p.id}`} style={{ color: 'var(--accent)' }}>
                  {p.name}{p.socialName && ` (${p.socialName})`}
                </Link>
              </td>
              <td>{p.email ?? '—'}</td>
              <td>{p.active ? 'Ativo' : 'Inativo'}</td>
              <td>
                <button
                  type="button"
                  onClick={() => onToggleActive(p)}
                  style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}
                >
                  {p.active ? 'Desativar' : 'Ativar'}
                </button>
              </td>
            </tr>
          ))}
          {visiblePatients.length === 0 && (
            <tr><td colSpan={4} style={{ color: 'var(--ink-soft)' }}>Nenhum paciente encontrado.</td></tr>
          )}
        </tbody>
      </table>

      <form onSubmit={onAddPatient} style={{ marginTop: '1.2rem', flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <label style={{ flex: 1 }}>
          Novo paciente
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do paciente" required />
        </label>
        <label>
          Nome social ou apelido
          <input value={socialName} onChange={(e) => setSocialName(e.target.value)} placeholder="opcional" />
        </label>
        <label>
          E-mail
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="opcional"
            type="email"
            style={emailInvalid ? { borderColor: 'var(--error, #c0392b)' } : undefined}
          />
          {emailInvalid && <span className="error" style={{ fontSize: '0.78rem' }}>E-mail inválido</span>}
        </label>
        <label>
          Telefone
          <input
            value={phone}
            onChange={(e) => setPhone(maskPhone(e.target.value))}
            placeholder="(11) 91234-5678"
            inputMode="tel"
          />
        </label>
        <label>
          CPF/CNPJ
          <input
            value={cpfCnpj}
            onChange={(e) => setCpfCnpj(maskCpfCnpj(e.target.value))}
            placeholder="p/ cobrar via Asaas"
            inputMode="numeric"
          />
        </label>
        <button type="submit">Adicionar</button>
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
