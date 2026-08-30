'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardShell from '../../../components/DashboardShell';
import {
  Appointment,
  chargeInvoiceViaAsaas,
  createInvoice,
  createPayoutAccount,
  fetchInvoiceSummary,
  fetchMe,
  fetchOwnProfile,
  Invoice,
  InvoiceSummary,
  linkExistingPayoutAccount,
  listAppointments,
  listInvoices,
  listPatients,
  Me,
  Patient,
  Profile,
  updateInvoiceStatus,
} from '../../../lib/api';
import { currencyToCents, maskCep, maskCpfCnpj, maskCurrency, maskPhone } from '../../../lib/masks';

const STATUS_LABEL: Record<string, string> = {
  pendente: 'Pendente',
  pago: 'Pago',
  atrasado: 'Atrasado',
  cancelado: 'Cancelado',
};

const PERIODS = {
  todos: 'Todos os vencimentos',
  semana: 'Última semana',
  mes: 'Último mês',
  tresmeses: 'Últimos 3 meses',
  ano: 'Último ano',
} as const;
type Period = keyof typeof PERIODS;

function periodRange(period: Period): { from?: string; to?: string } {
  if (period === 'todos') return {};
  const now = new Date();
  const days = { semana: 7, mes: 30, tresmeses: 90, ano: 365 }[period];
  const from = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  return { from: from.toISOString(), to: now.toISOString() };
}

function centsToReais(cents: number) {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function FinanceiroPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [summary, setSummary] = useState<InvoiceSummary | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [me, setMe] = useState<Me | null>(null);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | keyof typeof STATUS_LABEL>('todos');
  const [period, setPeriod] = useState<Period>('todos');

  const [patientId, setPatientId] = useState('');
  const [patientAppointments, setPatientAppointments] = useState<Appointment[]>([]);
  const [appointmentId, setAppointmentId] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  const [payoutName, setPayoutName] = useState('');
  const [payoutEmail, setPayoutEmail] = useState('');
  const [payoutCpfCnpj, setPayoutCpfCnpj] = useState('');
  const [payoutPhone, setPayoutPhone] = useState('');
  const [payoutBirthDate, setPayoutBirthDate] = useState('');
  const [payoutIncomeValue, setPayoutIncomeValue] = useState('');
  const [payoutAddress, setPayoutAddress] = useState('');
  const [payoutAddressNumber, setPayoutAddressNumber] = useState('');
  const [payoutComplement, setPayoutComplement] = useState('');
  const [payoutProvince, setPayoutProvince] = useState('');
  const [payoutPostalCode, setPayoutPostalCode] = useState('');

  const [payoutMode, setPayoutMode] = useState<'new' | 'existing'>('new');
  const [existingWalletId, setExistingWalletId] = useState('');

  const [chargingId, setChargingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadInvoices(p: Period) {
    const data = await listInvoices(periodRange(p));
    setInvoices(data);
  }

  async function loadSummary() {
    setSummary(await fetchInvoiceSummary());
  }

  useEffect(() => {
    Promise.all([loadInvoices(period), listPatients(true), fetchOwnProfile(), fetchMe(), loadSummary()])
      .then(([, patientsData, profileData, meData]) => {
        setPatients(patientsData);
        setProfile(profileData);
        setMe(meData);
        if (patientsData[0]) setPatientId(patientsData[0].id);
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (loading) return;
    loadInvoices(period).catch((err) => setError((err as Error).message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  // Pré-preenche o cadastro na Asaas com os dados que já temos do psicólogo, evitando digitar de novo.
  useEffect(() => {
    if (me && !profile?.payoutAccountId) {
      setPayoutName((prev) => prev || me.name);
      setPayoutEmail((prev) => prev || me.email);
    }
  }, [me, profile]);

  useEffect(() => {
    if (!patientId) {
      setPatientAppointments([]);
      return;
    }
    setAppointmentId('');
    listAppointments({ patientId }).then(setPatientAppointments).catch(() => setPatientAppointments([]));
  }, [patientId]);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const invoice = await createInvoice({
        patientId,
        amountCents: currencyToCents(amount),
        dueDate,
        appointmentId: appointmentId || undefined,
      });
      setInvoices((prev) => [...prev, invoice].sort((a, b) => a.dueDate.localeCompare(b.dueDate)));
      setAmount('');
      setAppointmentId('');
      await loadSummary();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onStatusChange(id: string, status: string) {
    const updated = await updateInvoiceStatus(id, status);
    setInvoices((prev) => prev.map((i) => (i.id === id ? updated : i)));
    await loadSummary();
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
        birthDate: payoutBirthDate,
        incomeValueCents: currencyToCents(payoutIncomeValue),
        address: payoutAddress,
        addressNumber: payoutAddressNumber,
        complement: payoutComplement || undefined,
        province: payoutProvince,
        postalCode: payoutPostalCode,
      });
      setProfile((prev) => (prev ? { ...prev, ...result } : prev));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  /** Pra quem já tem conta Asaas própria — ver AsaasService.linkExistingPayoutAccount. */
  async function onLinkExistingPayoutAccount(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const result = await linkExistingPayoutAccount(existingWalletId.trim());
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

  const visibleInvoices = useMemo(() => {
    return invoices.filter((i) => {
      if (statusFilter !== 'todos' && i.status !== statusFilter) return false;
      if (search.trim() && !i.patient.name.toLowerCase().includes(search.trim().toLowerCase())) return false;
      return true;
    });
  }, [invoices, statusFilter, search]);

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <DashboardShell title={"Financeiro"} description={"Lançamento manual sempre disponível; cobrança real (Pix/boleto/cartão) via Asaas quando a sub-conta abaixo estiver conectada."}>
      {summary && (
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', margin: '0.8rem 0 1.2rem' }}>
          <div className="card" style={{ flex: 1, minWidth: '160px' }}>
            <span className="sub" style={{ margin: 0 }}>Recebido no mês</span>
            <p style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
              {centsToReais(summary.receivedThisMonthCents)}
            </p>
          </div>
          <div className="card" style={{ flex: 1, minWidth: '160px' }}>
            <span className="sub" style={{ margin: 0 }}>Pendente</span>
            <p style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
              {centsToReais(summary.pendingCents)}
            </p>
          </div>
          <div className="card" style={{ flex: 1, minWidth: '160px' }}>
            <span className="sub" style={{ margin: 0 }}>Atrasado</span>
            <p style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: '#ef4444' }}>
              {centsToReais(summary.overdueCents)}
            </p>
          </div>
        </div>
      )}

      <h3 style={{ fontSize: '0.92rem', marginTop: '0.4rem' }}>Recebimento via Asaas</h3>
      {profile?.payoutAccountId ? (
        <p className="sub">Sub-conta conectada ({profile.payoutProvider}) — cobranças ficam disponíveis para gerar Pix/boleto/cartão real.</p>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '0.5rem', margin: '0.4rem 0 0.8rem' }}>
            <button
              type="button"
              onClick={() => setPayoutMode('new')}
              style={payoutMode === 'new' ? { fontWeight: 700, textDecoration: 'underline' } : undefined}
            >
              Criar conta nova
            </button>
            <button
              type="button"
              onClick={() => setPayoutMode('existing')}
              style={payoutMode === 'existing' ? { fontWeight: 700, textDecoration: 'underline' } : undefined}
            >
              Já tenho conta Asaas
            </button>
          </div>

          {payoutMode === 'existing' ? (
            <form onSubmit={onLinkExistingPayoutAccount} style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <label style={{ flex: 1, minWidth: '260px' }}>
                Wallet ID da sua conta Asaas
                <input
                  value={existingWalletId}
                  onChange={(e) => setExistingWalletId(e.target.value)}
                  placeholder="Ex: 8a2f1e3b-..."
                  required
                />
              </label>
              <button type="submit">Vincular conta existente</button>
              <p className="sub" style={{ width: '100%', margin: '0.3rem 0 0' }}>
                Encontre seu Wallet ID no painel Asaas em Minha Conta → Integrações → Chave de API/Wallet ID.
              </p>
            </form>
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
                <input value={payoutCpfCnpj} onChange={(e) => setPayoutCpfCnpj(maskCpfCnpj(e.target.value))} inputMode="numeric" required />
              </label>
              <label>
                Celular
                <input value={payoutPhone} onChange={(e) => setPayoutPhone(maskPhone(e.target.value))} placeholder="(11) 91234-5678" inputMode="tel" required />
              </label>
              <label>
                Data de nascimento
                <input type="date" value={payoutBirthDate} onChange={(e) => setPayoutBirthDate(e.target.value)} required />
              </label>
              <label>
                Renda/faturamento mensal
                <input
                  value={payoutIncomeValue}
                  onChange={(e) => setPayoutIncomeValue(maskCurrency(e.target.value))}
                  inputMode="numeric"
                  placeholder="0,00"
                  required
                />
              </label>
              <label>
                CEP
                <input value={payoutPostalCode} onChange={(e) => setPayoutPostalCode(maskCep(e.target.value))} inputMode="numeric" placeholder="00000-000" required />
              </label>
              <label>
                Endereço
                <input value={payoutAddress} onChange={(e) => setPayoutAddress(e.target.value)} required />
              </label>
              <label>
                Número
                <input value={payoutAddressNumber} onChange={(e) => setPayoutAddressNumber(e.target.value)} required />
              </label>
              <label>
                Complemento
                <input value={payoutComplement} onChange={(e) => setPayoutComplement(e.target.value)} placeholder="opcional" />
              </label>
              <label>
                Bairro
                <input value={payoutProvince} onChange={(e) => setPayoutProvince(e.target.value)} required />
              </label>
              <button type="submit">Conectar sub-conta Asaas</button>
            </form>
          )}
        </>
      )}

      <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-end', flexWrap: 'wrap', margin: '1.2rem 0 0.6rem' }}>
        <label style={{ flex: 1, minWidth: '200px' }}>
          Buscar paciente
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nome do paciente" />
        </label>
        <label>
          Status
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}>
            <option value="todos">Todos</option>
            {Object.entries(STATUS_LABEL).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
        <label>
          Vencimento
          <select value={period} onChange={(e) => setPeriod(e.target.value as Period)}>
            {Object.entries(PERIODS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
      </div>

      <table>
        <thead>
          <tr><th>Paciente</th><th>Sessão</th><th>Valor</th><th>Vencimento</th><th>Status</th><th>Asaas</th></tr>
        </thead>
        <tbody>
          {visibleInvoices.map((i) => (
            <tr key={i.id}>
              <td>{i.patient.name}</td>
              <td className="sub" style={{ margin: 0 }}>
                {i.appointment ? new Date(i.appointment.startsAt).toLocaleString('pt-BR') : '—'}
              </td>
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
          {visibleInvoices.length === 0 && (
            <tr><td colSpan={6} style={{ color: 'var(--ink-soft)' }}>Nenhuma cobrança encontrada.</td></tr>
          )}
        </tbody>
      </table>

      {patients.length === 0 ? (
        <p className="sub" style={{ marginTop: '1.2rem' }}>Cadastre um paciente ativo primeiro para poder cobrar.</p>
      ) : (
        <form onSubmit={onCreate} style={{ marginTop: '1.2rem', flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <label>
            Paciente
            <select value={patientId} onChange={(e) => setPatientId(e.target.value)} required>
              {patients.map((p) => <option key={p.id} value={p.id}>{p.name}{p.socialName && ` (${p.socialName})`}</option>)}
            </select>
          </label>
          <label>
            Sessão vinculada (opcional)
            <select value={appointmentId} onChange={(e) => setAppointmentId(e.target.value)}>
              <option value="">Cobrança avulsa</option>
              {patientAppointments.map((a) => (
                <option key={a.id} value={a.id}>
                  {new Date(a.startsAt).toLocaleString('pt-BR')} · {a.status}
                </option>
              ))}
            </select>
          </label>
          <label>
            Valor (R$)
            <input value={amount} onChange={(e) => setAmount(maskCurrency(e.target.value))} placeholder="150,00" inputMode="numeric" required />
          </label>
          <label>
            Vencimento
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
          </label>
          <button type="submit">Lançar cobrança</button>
        </form>
      )}
      {error && <span className="error">{error}</span>}
    </DashboardShell>
  );
}
