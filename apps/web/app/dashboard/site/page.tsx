'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardNav from '../../../components/DashboardNav';
import { fetchOwnProfile, Profile, updateProfile, uploadProfilePhoto } from '../../../lib/api';
import { SITE_PALETTES } from '../../../lib/site-palettes';
import { ALL_SPECIALTIES, SPECIALTY_CATEGORIES, SpecialtyGroup } from '../../../lib/specialty-options';

function parseSpecialties(raw: string | null | undefined): string[] {
  return raw
    ? raw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
}

export default function SiteProfissionalPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    fetchOwnProfile()
      .then(setProfile)
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onSave(e: FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setError(null);
    setSaved(false);
    try {
      const updated = await updateProfile({
        bio: profile.bio ?? '',
        attendanceInfo: profile.attendanceInfo ?? '',
        photoUrl: profile.photoUrl || undefined,
        specialties: profile.specialties ?? '',
        publicEmail: profile.publicEmail || undefined,
        publicPhone: profile.publicPhone ?? '',
        published: profile.published,
        colorPalette: profile.colorPalette,
        listedInDirectory: profile.listedInDirectory,
      });
      setProfile(updated);
      setSaved(true);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onPhotoSelected(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !profile) return;
    setError(null);
    setUploadingPhoto(true);
    try {
      const updated = await uploadProfilePhoto(file);
      setProfile(updated);
      setSaved(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploadingPhoto(false);
      e.target.value = '';
    }
  }

  function toggleSpecialty(name: string) {
    if (!profile) return;
    const current = parseSpecialties(profile.specialties);
    const next = current.includes(name) ? current.filter((s) => s !== name) : [...current, name];
    setProfile({ ...profile, specialties: next.join(', ') });
  }

  function onCustomSpecialtiesChange(e: ChangeEvent<HTMLInputElement>) {
    if (!profile) return;
    const known = parseSpecialties(profile.specialties).filter((s) => ALL_SPECIALTIES.has(s));
    const custom = e.target.value
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    setProfile({ ...profile, specialties: [...known, ...custom].join(', ') });
  }

  if (loading) return <div className="shell">Carregando…</div>;
  if (!profile) return null;

  const selectedSpecialties = parseSpecialties(profile.specialties);
  const customSpecialtiesText = selectedSpecialties.filter((s) => !ALL_SPECIALTIES.has(s)).join(', ');
  const selectedPalette = SITE_PALETTES[profile.colorPalette] ?? SITE_PALETTES.salvia;

  function renderSpecialtyGroup(group: SpecialtyGroup) {
    return SPECIALTY_CATEGORIES.filter((cat) => cat.group === group).map((cat) => (
      <div key={cat.label} style={{ marginBottom: '0.9rem' }}>
        <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-soft)', margin: '0 0 0.4rem' }}>{cat.label}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {cat.options.map((opt) => {
            const checked = selectedSpecialties.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleSpecialty(opt)}
                style={{
                  fontSize: '0.78rem',
                  padding: '0.35rem 0.7rem',
                  borderRadius: '999px',
                  border: checked ? '1px solid var(--accent)' : '1px solid var(--line)',
                  background: checked ? 'var(--accent)' : 'transparent',
                  color: checked ? '#fff' : 'var(--ink-soft)',
                  cursor: 'pointer',
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    ));
  }

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>Site profissional</h2>
      <p className="sub">
        Página pública em <Link href={`/p/${profile.slug}`} target="_blank">/p/{profile.slug}</Link>
        {!profile.published && ' — ainda não publicada.'}
      </p>

      <form onSubmit={onSave}>
        <h3 style={{ fontSize: '0.95rem', margin: '1.2rem 0 0.8rem', borderTop: '1px solid var(--line)', paddingTop: '1.2rem' }}>
          Sobre o psicólogo
        </h3>
        <div>
          <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', margin: '0 0 0.5rem' }}>Foto de perfil</p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {profile.photoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.photoUrl}
                alt="Foto de perfil"
                style={{ width: '96px', height: '96px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--line)' }}
              />
            )}
            <div style={{ flex: 1, minWidth: '220px' }}>
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={onPhotoSelected} disabled={uploadingPhoto} />
              {uploadingPhoto && <p className="sub" style={{ margin: '0.3rem 0 0', fontSize: '0.78rem' }}>Enviando…</p>}
              <label style={{ marginTop: '0.6rem' }}>
                Ou cole uma URL de foto já publicada
                <input
                  value={profile.photoUrl ?? ''}
                  onChange={(e) => setProfile({ ...profile, photoUrl: e.target.value })}
                  placeholder="https://…"
                />
              </label>
            </div>
          </div>
        </div>
        <label>
          Apresentação pessoal
          <input
            value={profile.bio ?? ''}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            placeholder="Como você se apresenta ao paciente (aparece em destaque no topo da página)"
          />
        </label>
        <div>
          <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', margin: '0 0 0.5rem' }}>
            Formação e abordagem <span style={{ fontWeight: 400 }}>(selecione quantas quiser)</span>
          </p>
          {renderSpecialtyGroup('psicologo')}
        </div>

        <h3 style={{ fontSize: '0.95rem', margin: '1.2rem 0 0.8rem', borderTop: '1px solid var(--line)', paddingTop: '1.2rem' }}>
          Sobre o atendimento
        </h3>
        <label>
          Como funciona o atendimento
          <input
            value={profile.attendanceInfo ?? ''}
            onChange={(e) => setProfile({ ...profile, attendanceInfo: e.target.value })}
            placeholder="Formato das sessões, duração, online/presencial, o que o paciente pode esperar"
          />
        </label>
        <div>
          <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', margin: '0 0 0.5rem' }}>
            Quem e o que você atende <span style={{ fontWeight: 400 }}>(aparece na página pública)</span>
          </p>
          {renderSpecialtyGroup('atendimento')}
          <label style={{ marginTop: '0.4rem' }}>
            Outras áreas (separadas por vírgula)
            <input
              value={customSpecialtiesText}
              onChange={onCustomSpecialtiesChange}
              placeholder="Alguma área que não está na lista acima"
            />
          </label>
        </div>
        <label>
          E-mail de contato público
          <input
            type="email"
            value={profile.publicEmail ?? ''}
            onChange={(e) => setProfile({ ...profile, publicEmail: e.target.value })}
          />
        </label>
        <label>
          Telefone de contato público
          <input
            value={profile.publicPhone ?? ''}
            onChange={(e) => setProfile({ ...profile, publicPhone: e.target.value })}
          />
        </label>

        <h3 style={{ fontSize: '0.95rem', margin: '1.2rem 0 0.8rem', borderTop: '1px solid var(--line)', paddingTop: '1.2rem' }}>
          Aparência da página
        </h3>
        <label>
          Paleta de cores da página pública
          <select
            value={profile.colorPalette}
            onChange={(e) => setProfile({ ...profile, colorPalette: e.target.value })}
          >
            {Object.values(SITE_PALETTES).map((p) => (
              <option key={p.key} value={p.key}>{p.label} — {p.description}</option>
            ))}
          </select>
        </label>
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.7rem',
            borderRadius: '8px', border: '1px solid var(--line)', background: selectedPalette.ground, width: 'fit-content',
          }}
        >
          <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: selectedPalette.accent, display: 'inline-block' }} />
          <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: selectedPalette.accentSoft, display: 'inline-block' }} />
          <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: selectedPalette.surface, border: `1px solid ${selectedPalette.line}`, display: 'inline-block' }} />
          <span style={{ fontSize: '0.78rem', color: selectedPalette.ink }}>Pré-visualização</span>
        </div>

        <label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={profile.published}
            onChange={(e) => setProfile({ ...profile, published: e.target.checked })}
            style={{ width: 'auto' }}
          />
          Publicar página
        </label>
        <label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={profile.listedInDirectory}
            onChange={(e) => setProfile({ ...profile, listedInDirectory: e.target.checked })}
            style={{ width: 'auto' }}
          />
          Aparecer na busca pública de profissionais (portaldopsi.com/profissionais)
        </label>
        <button type="submit">Salvar</button>
      </form>
      {saved && <span style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>Salvo.</span>}
      {error && <span className="error">{error}</span>}
    </div>
  );
}
