'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNav from '../../../components/DashboardNav';
import {
  chargeInvoiceViaAsaas,
  createInvoice,
  createPayoutAccount,
  fetchOwnProfile,
  Invoice,
  listInvoices,
  listPatients,
  Patient,
  Profile,
  updateInvoiceStatus,
} from '../../../lib/api';

const STATUS_LABEL: Record<string, string> = {
  pendente: 'Pendente',
  pago: 'Pago',
  atrasado: 'Atrasado',
  cancelado: 'Cancelado',
};

function centsToReais(cents: number) {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function FinanceiroPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [patientId, setPatientId] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [payoutName, setPayoutName] = useState('');
  const [payoutEmail, setPayoutEmail] = useState('');
  const [payoutCpfCnpj, setPayoutCpfCnpj] = useState('');
  const [payoutPhone, setPayoutPhone] = useState('');
  const [chargingId, setChargingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([listInvoices(), listPatients(), fetchOwnProfile()])
      .then(([invoicesData, patientsData, profileData]) => {
        setInvoices(invoicesData);
        setPatients(patientsData);
        setProfile(profileData);
        if (patientsData[0]) setPatientId(patientsData[0].id);
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const amountCents = Math.round(parseFloat(amount.replace(',', '.')) * 100);
      const invoice = await createInvoice({ patientId, amountCents, dueDate });
      setInvoices((prev) => [...prev, invoice].sort((a, b) => a.dueDate.localeCompare(b.dueDate)));
      setAmount('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onStatusChange(id: string, status: string) {
    const updated = await updateInvoiceStatus(id, status);
    setInvoices((prev) => prev.map((i) => (i.id === id ? updated : i)));
  }

  async function onCreatePayoutAccount(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const result = await createPayoutAccount({
        name: payoutName,
        email: payoutEmail,
        cpfCnpj: payoutCpfCnpj,
        mobilePhone: payoutPhone,
      });
      setProfile((prev) => (prev ? { ...prev, ...result } : prev));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onCharge(id: string) {
    setError(null);
    setChargingId(id);
    try {
      const updated = await chargeInvoiceViaAsaas(id);
      setInvoices((prev) => prev.map((i) => (i.id === id ? updated : i)));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setChargingId(null);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>Financeiro</h2>
      <p className="sub">Lançamento manual sempre disponível; cobrança real (Pix/boleto/cartão) via Asaas quando a sub-conta abaixo estiver conectada.</p>

      <h3 style={{ fontSize: '0.92rem', marginTop: '0.4rem' }}>Recebimento via Asaas</h3>
      {profile?.payoutAccountId ? (
        <p className="sub">Sub-conta conectada ({profile.payoutProvider}) — cobranças ficam disponíveis para gerar Pix/boleto/cartão real.</p>
      ) : (
        <form onSubmit={onCreatePayoutAccount} style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <label>
            Nome completo
            <input value={payoutName} onChange={(e) => setPayoutName(e.target.value)} required />
          </label>
          <label>
            E-mail
            <input type="email" value={payoutEmail} onChange={(e) => setPayoutEmail(e.target.value)} required />
          </label>
          <label>
            CPF/CNPJ
            <input value={payoutCpfCnpj} onChange={(e) => setPayoutCpfCnpj(e.target.value)} required />
          </label>
          <label>
            Celular
            <input value={payoutPhone} onChange={(e) => setPayoutPhone(e.target.value)} required />
          </label>
          <button type="submit">Conectar sub-conta Asaas</button>
        </form>
      )}

      <table style={{ marginTop: '1.2rem' }}>
        <thead>
          <tr><th>Paciente</th><th>Valor</th><th>Vencimento</th><th>Status</th><th>Asaas</th></tr>
        </thead>
        <tbody>
          {invoices.map((i) => (
            <tr key={i.id}>
              <td>{i.patient.name}</td>
              <td style={{ fontVariantNumeric: 'tabular-nums' }}>{centsToReais(i.amountCents)}</td>
              <td>{new Date(i.dueDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
              <td>
                <select value={i.status} onChange={(e) => onStatusChange(i.id, e.target.value)}>
                  {Object.entries(STATUS_LABEL).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </td>
              <td>
                {i.paymentLink ? (
                  <a href={i.paymentLink} target="_blank" rel="noreferrer">Ver cobrança</a>
                ) : (
                  <button
                    onClick={() => onCharge(i.id)}
                    disabled={chargingId === i.id || !profile?.payoutAccountId}
                    style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}
                  >
                    {chargingId === i.id ? 'Gerando…' : 'Cobrar via Asaas'}
                  </button>
                )}
              </td>
            </tr>
          ))}
          {invoices.length === 0 && (
            <tr><td colSpan={5} style={{ color: 'var(--ink-soft)' }}>Nenhuma cobrança ainda.</td></tr>
          )}
        </tbody>
      </table>

      {patients.length === 0 ? (
        <p className="sub" style={{ marginTop: '1.2rem' }}>Cadastre um paciente primeiro para poder cobrar.</p>
      ) : (
        <form onSubmit={onCreate} style={{ marginTop: '1.2rem', flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <label>
            Paciente
            <select value={patientId} onChange={(e) => setPatientId(e.target.value)} required>
              {patients.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </label>
          <label>
            Valor (R$)
            <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="150,00" required />
          </label>
          <label>
            Vencimento
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
          </label>
          <button type="submit">Lançar cobrança</button>
        </form>
      )}
      {error && <span className="error">{error}</span>}
    </div>
  );
}
