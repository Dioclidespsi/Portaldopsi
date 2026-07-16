import { CSSProperties } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchPublicProfile } from '../../../lib/api';
import { getPalette, SitePalette } from '../../../lib/site-palettes';
import ContactForm from './ContactForm';
import BookingWidget from './BookingWidget';

function paletteVars(p: SitePalette): CSSProperties {
  return {
    '--site-ground': p.ground,
    '--site-surface': p.surface,
    '--site-accent': p.accent,
    '--site-accent-soft': p.accentSoft,
    '--site-ink': p.ink,
    '--site-ink-soft': p.inkSoft,
    '--site-line': p.line,
  } as CSSProperties;
}

function toWhatsAppLink(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  const withCountryCode = digits.startsWith('55') ? digits : `55${digits}`;
  return `https://wa.me/${withCountryCode}`;
}

export default async function PublicProfilePage({ params }: { params: { slug: string } }) {
  const profile = await fetchPublicProfile(params.slug);
  if (!profile) notFound();

  const p = getPalette(profile.colorPalette);
  const specialtyList = profile.specialties
    ? profile.specialties.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div
      style={{
        ...paletteVars(p),
        background: p.ground,
        color: p.ink,
        minHeight: '100vh',
        fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          position: 'sticky', top: 0, zIndex: 5, background: p.surface, borderBottom: `1px solid ${p.line}`,
          padding: '0.9rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem',
        }}
      >
        <strong style={{ fontSize: '1rem', color: p.ink }}>{profile.name}</strong>
        {profile.publicPhone && (
          <a
            href={toWhatsAppLink(profile.publicPhone)}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: '0.85rem', fontWeight: 600, color: '#fff', background: p.accent,
              padding: '0.5rem 1rem', borderRadius: '100px', textDecoration: 'none',
            }}
          >
            💬 Fale no WhatsApp
          </a>
        )}
      </header>

      {/* Hero */}
      <section
        style={{
          display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'center', gap: '2rem',
          maxWidth: '960px', margin: '0 auto', padding: '3rem 1.5rem',
        }}
      >
        <div style={{ flex: '1 1 320px' }}>
          {specialtyList.length > 0 && (
            <p style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: p.accent, margin: '0 0 0.6rem' }}>
              {specialtyList.slice(0, 3).join(' · ')}
            </p>
          )}
          <h1 style={{ fontSize: '2rem', margin: '0 0 0.8rem', color: p.ink, lineHeight: 1.2 }}>{profile.name}</h1>
          {profile.bio && (
            <p style={{ fontSize: '1rem', color: p.inkSoft, lineHeight: 1.6, margin: '0 0 1.4rem' }}>
              {profile.bio.length > 220 ? `${profile.bio.slice(0, 220)}…` : profile.bio}
            </p>
          )}
          <a
            href={profile.bookingEnabled ? '#agendar' : '#contato'}
            style={{
              display: 'inline-block', fontSize: '0.92rem', fontWeight: 700, color: '#fff', background: p.accent,
              padding: '0.75rem 1.5rem', borderRadius: '8px', textDecoration: 'none',
            }}
          >
            {profile.bookingEnabled ? 'Agende sua sessão' : 'Agende uma conversa'}
          </a>
        </div>
        {profile.photoUrl && (
          <div style={{ flex: '1 1 260px', maxWidth: '340px' }}>
            <img
              src={profile.photoUrl}
              alt={profile.name}
              style={{ width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', borderRadius: '16px', display: 'block' }}
            />
          </div>
        )}
      </section>

      {/* About */}
      {profile.attendanceInfo && (
        <section style={{ background: p.surface, borderTop: `1px solid ${p.line}`, borderBottom: `1px solid ${p.line}` }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
            <h2 style={{ fontSize: '1.15rem', margin: '0 0 1rem', color: p.ink }}>Sobre o atendimento</h2>
            <p style={{ fontSize: '0.98rem', color: p.inkSoft, lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>{profile.attendanceInfo}</p>
          </div>
        </section>
      )}

      {/* Especialidades */}
      {specialtyList.length > 0 && (
        <section style={{ maxWidth: '960px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
          <h2 style={{ fontSize: '1.15rem', margin: '0 0 1.2rem', color: p.ink }}>Áreas de atuação</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem' }}>
            {specialtyList.map((s) => (
              <span
                key={s}
                style={{
                  background: p.accentSoft, color: p.ink, fontSize: '0.88rem', fontWeight: 600,
                  padding: '0.5rem 1rem', borderRadius: '100px',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Agendamento público */}
      {profile.bookingEnabled && (
        <section id="agendar" style={{ background: p.surface, borderTop: `1px solid ${p.line}`, borderBottom: `1px solid ${p.line}` }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem', color: p.ink }}>Agende sua sessão</h2>
            <p style={{ fontSize: '0.92rem', color: p.inkSoft, margin: '0 0 1.5rem' }}>
              Escolha um horário disponível e garanta sua vaga com o pagamento.
            </p>
            <BookingWidget slug={params.slug} />
          </div>
        </section>
      )}

      {/* Contato */}
      <section id="contato" style={{ background: p.accentSoft }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem', color: p.ink }}>Vamos conversar?</h2>
          <p style={{ fontSize: '0.92rem', color: p.inkSoft, margin: '0 0 1.5rem' }}>
            Deixe seu contato ou fale diretamente — a resposta é sempre pessoal.
          </p>

          {(profile.publicEmail || profile.publicPhone) && (
            <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', marginBottom: '1.5rem', fontSize: '0.92rem' }}>
              {profile.publicEmail && (
                <a href={`mailto:${profile.publicEmail}`} style={{ color: p.accent, fontWeight: 600, textDecoration: 'none' }}>
                  ✉ {profile.publicEmail}
                </a>
              )}
              {profile.publicPhone && (
                <a href={`tel:${profile.publicPhone}`} style={{ color: p.accent, fontWeight: 600, textDecoration: 'none' }}>
                  ☎ {profile.publicPhone}
                </a>
              )}
            </div>
          )}

          <ContactForm slug={params.slug} />
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '1.5rem', textAlign: 'center', fontSize: '0.78rem', color: p.inkSoft }}>
        <p style={{ margin: '0 0 0.3rem' }}>
          {profile.name}
          {profile.crpVerified && <span style={{ color: p.accent, fontWeight: 700 }}> · CRP verificado</span>}
        </p>
        <p style={{ margin: 0, opacity: 0.7 }}>
          Site profissional via <Link href="/" style={{ color: 'inherit' }}>Portal do Psi</Link>
        </p>
      </footer>
    </div>
  );
}
