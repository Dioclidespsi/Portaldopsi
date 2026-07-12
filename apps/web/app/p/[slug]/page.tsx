import { notFound } from 'next/navigation';
import { fetchPublicProfile } from '../../../lib/api';

export default async function PublicProfilePage({ params }: { params: { slug: string } }) {
  const profile = await fetchPublicProfile(params.slug);
  if (!profile) notFound();

  return (
    <div className="shell">
      {profile.photoUrl && (
        <img
          src={profile.photoUrl}
          alt={profile.name}
          style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem', objectFit: 'cover', maxHeight: '260px' }}
        />
      )}
      <h1>{profile.name}</h1>
      {profile.specialties && <p className="sub">{profile.specialties}</p>}
      {profile.bio && <p style={{ color: 'var(--ink-soft)' }}>{profile.bio}</p>}
      {(profile.publicEmail || profile.publicPhone) && (
        <div style={{ marginTop: '1.2rem', fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
          {profile.publicEmail && <div>{profile.publicEmail}</div>}
          {profile.publicPhone && <div>{profile.publicPhone}</div>}
        </div>
      )}
    </div>
  );
}
