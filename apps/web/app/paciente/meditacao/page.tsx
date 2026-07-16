'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { listOwnMeditationTracks, meditationAudioUrl, PatientMeditationTrack } from '../../../lib/patient-api';

export default function PatientMeditationPage() {
  const router = useRouter();
  const [tracks, setTracks] = useState<PatientMeditationTrack[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listOwnMeditationTracks()
      .then(setTracks)
      .catch(() => router.push('/paciente/login'))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <div className="shell">Carregando…</div>;

  const byCategory = tracks.reduce<Record<string, PatientMeditationTrack[]>>((acc, t) => {
    (acc[t.category] ??= []).push(t);
    return acc;
  }, {});

  return (
    <div className="shell shell-wide">
      <div className="topbar">
        <div>
          <h1>Trilhas de meditação</h1>
          <p className="sub">Áudios guiados pra usar quando precisar.</p>
        </div>
        <Link href="/paciente">
          <button style={{ background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}>Voltar</button>
        </Link>
      </div>

      {Object.entries(byCategory).map(([category, items]) => (
        <div key={category} style={{ marginBottom: '1.4rem' }}>
          <h3 style={{ fontSize: '0.92rem' }}>{category}</h3>
          {items.map((t) => (
            <div key={t.id} style={{ padding: '0.8rem 0', borderBottom: '1px solid var(--line)' }}>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 0.2rem' }}>
                {t.title}
                {t.durationSeconds && <span className="sub" style={{ marginLeft: '0.5rem' }}>{Math.round(t.durationSeconds / 60)} min</span>}
              </p>
              {t.description && <p className="sub" style={{ margin: '0 0 0.5rem' }}>{t.description}</p>}
              {playingId === t.id ? (
                <audio controls autoPlay src={meditationAudioUrl(t.id)} style={{ width: '100%' }} />
              ) : (
                <button onClick={() => setPlayingId(t.id)} style={{ fontSize: '0.85rem', padding: '0.4rem 0.7rem' }}>
                  ▶ Ouvir
                </button>
              )}
            </div>
          ))}
        </div>
      ))}
      {tracks.length === 0 && <p className="sub">Nenhuma trilha disponível no momento.</p>}
    </div>
  );
}
