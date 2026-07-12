'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createPatient, fetchMe, getTenantKind, listPatients, Me, Patient, submitCrp } from '../../lib/api';
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
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
    try {
      const patient = await createPatient({
        name,
        email: email || undefined,
        phone: phone || undefined,
        cpfCnpj: cpfCnpj || undefined,
      });
      setPatients((prev) => [...prev, patient]);
      setName('');
      setEmail('');
      setPhone('');
      setCpfCnpj('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

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
      <table>
        <thead>
          <tr><th>Nome</th><th>E-mail</th></tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td><Link href={`/dashboard/pacientes/${p.id}`} style={{ color: 'var(--accent)' }}>{p.name}</Link></td>
              <td>{p.email ?? '—'}</td>
            </tr>
          ))}
          {patients.length === 0 && (
            <tr><td colSpan={2} style={{ color: 'var(--ink-soft)' }}>Nenhum paciente ainda.</td></tr>
          )}
        </tbody>
      </table>

      <form onSubmit={onAddPatient} style={{ marginTop: '1.2rem', flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <label style={{ flex: 1 }}>
          Novo paciente
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do paciente" required />
        </label>
        <label>
          E-mail
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="opcional" type="email" />
        </label>
        <label>
          Telefone
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="opcional" />
        </label>
        <label>
          CPF/CNPJ
          <input
            value={cpfCnpj}
            onChange={(e) => setCpfCnpj(e.target.value)}
            placeholder="p/ cobrar via Asaas"
          />
        </label>
        <button type="submit">Adicionar</button>
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
