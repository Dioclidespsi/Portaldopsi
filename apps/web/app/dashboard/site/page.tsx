'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardNav from '../../../components/DashboardNav';
import { fetchOwnProfile, Profile, updateProfile } from '../../../lib/api';

export default function SiteProfissionalPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

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
        photoUrl: profile.photoUrl || undefined,
        specialties: profile.specialties ?? '',
        publicEmail: profile.publicEmail || undefined,
        publicPhone: profile.publicPhone ?? '',
        published: profile.published,
      });
      setProfile(updated);
      setSaved(true);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;
  if (!profile) return null;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>Site profissional</h2>
      <p className="sub">
        Página pública em <Link href={`/p/${profile.slug}`} target="_blank">/p/{profile.slug}</Link>
        {!profile.published && ' — ainda não publicada.'}
      </p>

      <form onSubmit={onSave}>
        <label>
          Bio
          <input
            value={profile.bio ?? ''}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            placeholder="Como você se apresenta ao paciente"
          />
        </label>
        <label>
          Especialidades
          <input
            value={profile.specialties ?? ''}
            onChange={(e) => setProfile({ ...profile, specialties: e.target.value })}
            placeholder="Ansiedade, TCC, casais"
          />
        </label>
        <label>
          Foto (URL)
          <input
            value={profile.photoUrl ?? ''}
            onChange={(e) => setProfile({ ...profile, photoUrl: e.target.value })}
            placeholder="https://…"
          />
        </label>
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
        <label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={profile.published}
            onChange={(e) => setProfile({ ...profile, published: e.target.checked })}
            style={{ width: 'auto' }}
          />
          Publicar página
        </label>
        <button type="submit">Salvar</button>
      </form>
      {saved && <span style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>Salvo.</span>}
      {error && <span className="error">{error}</span>}
    </div>
  );
}
