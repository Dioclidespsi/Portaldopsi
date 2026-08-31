'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardShell from '../../../components/DashboardShell';
import PasswordInput from '../../../components/PasswordInput';
import {
  AccountInfo,
  changeAccountEmail,
  changeAccountPassword,
  fetchAccount,
  fetchWhatsAppTemplates,
  getRole,
  updateTenantName,
  updateWhatsAppTemplates,
} from '../../../lib/api';
import { DEFAULT_WHATSAPP_TEMPLATES, WhatsAppTemplate } from '../../../lib/whatsapp';

export default function ContaPage() {
  const router = useRouter();
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const isTitular = getRole() === 'PSICOLOGO_TITULAR';

  const [newEmail, setNewEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailSaved, setEmailSaved] = useState(false);
  const [savingEmail, setSavingEmail] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [tenantName, setTenantName] = useState('');
  const [tenantNameError, setTenantNameError] = useState<string | null>(null);
  const [tenantNameSaved, setTenantNameSaved] = useState(false);
  const [savingTenantName, setSavingTenantName] = useState(false);

  const [templates, setTemplates] = useState<WhatsAppTemplate[]>(DEFAULT_WHATSAPP_TEMPLATES);
  const [templatesError, setTemplatesError] = useState<string | null>(null);
  const [templatesSaved, setTemplatesSaved] = useState(false);
  const [savingTemplates, setSavingTemplates] = useState(false);

  useEffect(() => {
    fetchAccount()
      .then((data) => {
        setAccount(data);
        setNewEmail(data.email);
        setTenantName(data.tenantName);
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    if (getRole() !== 'PSICOLOGO_TITULAR') return;
    fetchWhatsAppTemplates()
      .then((result) => {
        if (result.templates && result.templates.length === 5) setTemplates(result.templates);
      })
      .catch(() => undefined);
  }, []);

  async function onChangeEmail(e: FormEvent) {
    e.preventDefault();
    setEmailError(null);
    setEmailSaved(false);
    setSavingEmail(true);
    try {
      const result = await changeAccountEmail(newEmail, emailPassword);
      setAccount((prev) => (prev ? { ...prev, email: result.email } : prev));
      setEmailPassword('');
      setEmailSaved(true);
    } catch (err) {
      setEmailError((err as Error).message);
    } finally {
      setSavingEmail(false);
    }
  }

  async function onChangePassword(e: FormEvent) {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSaved(false);
    setSavingPassword(true);
    try {
      await changeAccountPassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setPasswordSaved(true);
    } catch (err) {
      setPasswordError((err as Error).message);
    } finally {
      setSavingPassword(false);
    }
  }

  async function onChangeTenantName(e: FormEvent) {
    e.preventDefault();
    setTenantNameError(null);
    setTenantNameSaved(false);
    setSavingTenantName(true);
    try {
      const result = await updateTenantName(tenantName);
      setAccount((prev) => (prev ? { ...prev, tenantName: result.name } : prev));
      setTenantNameSaved(true);
    } catch (err) {
      setTenantNameError((err as Error).message);
    } finally {
      setSavingTenantName(false);
    }
  }

  function onTemplateFieldChange(index: number, field: 'label' | 'text', value: string) {
    setTemplates((prev) => prev.map((t, i) => (i === index ? { ...t, [field]: value } : t)));
  }

  async function onSaveTemplates(e: FormEvent) {
    e.preventDefault();
    setTemplatesError(null);
    setTemplatesSaved(false);
    setSavingTemplates(true);
    try {
      const result = await updateWhatsAppTemplates(templates);
      if (result.templates) setTemplates(result.templates);
      setTemplatesSaved(true);
    } catch (err) {
      setTemplatesError((err as Error).message);
    } finally {
      setSavingTemplates(false);
    }
  }

  if (loading || !account) return <div className="shell">Carregando…</div>;

  return (
    <DashboardShell title="Minha conta" description={`${account.name} — ${isTitular ? 'titular de' : 'membro de'} ${account.tenantName}`}>
      <h3 style={{ fontSize: '0.92rem', marginTop: '1.2rem' }}>E-mail de login</h3>
      <form onSubmit={onChangeEmail}>
        <label>
          Novo e-mail
          <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required />
        </label>
        <label>
          Senha atual (confirmação)
          <PasswordInput
            name="current-password"
            autoComplete="current-password"
            value={emailPassword}
            onChange={(e) => setEmailPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={savingEmail} style={{ alignSelf: 'flex-start' }}>
          {savingEmail ? 'Salvando…' : 'Salvar e-mail'}
        </button>
        {emailSaved && <span style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>E-mail atualizado.</span>}
        {emailError && <span className="error">{emailError}</span>}
      </form>

      <h3 style={{ fontSize: '0.92rem', marginTop: '1.5rem' }}>Trocar senha</h3>
      <form onSubmit={onChangePassword}>
        <label>
          Senha atual
          <PasswordInput
            name="current-password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Nova senha
          <PasswordInput
            name="new-password"
            autoComplete="new-password"
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={savingPassword} style={{ alignSelf: 'flex-start' }}>
          {savingPassword ? 'Salvando…' : 'Salvar senha'}
        </button>
        {passwordSaved && <span style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>Senha atualizada.</span>}
        {passwordError && <span className="error">{passwordError}</span>}
      </form>

      {isTitular && (
        <>
          <h3 style={{ fontSize: '0.92rem', marginTop: '1.5rem' }}>Nome da clínica</h3>
          <form onSubmit={onChangeTenantName}>
            <label>
              Nome
              <input value={tenantName} onChange={(e) => setTenantName(e.target.value)} required minLength={2} />
            </label>
            <button type="submit" disabled={savingTenantName} style={{ alignSelf: 'flex-start' }}>
              {savingTenantName ? 'Salvando…' : 'Salvar nome'}
            </button>
            {tenantNameSaved && <span style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>Nome atualizado.</span>}
            {tenantNameError && <span className="error">{tenantNameError}</span>}
          </form>

          <h3 style={{ fontSize: '0.92rem', marginTop: '1.5rem' }}>Mensagens de WhatsApp</h3>
          <p className="sub">
            Os 5 modelos usados no botão de WhatsApp da ficha do paciente. Use <code>{'{nome}'}</code> onde quiser que
            entre o nome do paciente — o texto final ainda pode ser editado na hora do envio, tanto aqui na
            plataforma quanto depois, já dentro do WhatsApp.
          </p>
          <form onSubmit={onSaveTemplates}>
            {templates.map((t, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.9rem' }}>
                <input
                  value={t.label}
                  onChange={(e) => onTemplateFieldChange(i, 'label', e.target.value)}
                  placeholder="Nome do modelo (ex: Lembrete de consulta)"
                  required
                  style={{ fontWeight: 600 }}
                />
                <textarea
                  value={t.text}
                  onChange={(e) => onTemplateFieldChange(i, 'text', e.target.value)}
                  rows={2}
                  placeholder="Texto da mensagem"
                  style={{
                    padding: '0.55rem 0.7rem', border: '1px solid var(--line)', borderRadius: '6px',
                    fontFamily: 'inherit', fontSize: '0.95rem', background: 'var(--ground)', color: 'var(--ink)', resize: 'vertical',
                  }}
                />
              </div>
            ))}
            <button type="submit" disabled={savingTemplates} style={{ alignSelf: 'flex-start' }}>
              {savingTemplates ? 'Salvando…' : 'Salvar modelos'}
            </button>
            {templatesSaved && <span style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>Modelos atualizados.</span>}
            {templatesError && <span className="error">{templatesError}</span>}
          </form>
        </>
      )}
    </DashboardShell>
  );
}
