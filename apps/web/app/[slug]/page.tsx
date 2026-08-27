import { CSSProperties } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Newsreader, Work_Sans } from 'next/font/google';
import { fetchPublicProfile } from '../../lib/api';
import { getPalette, SitePalette } from '../../lib/site-palettes';
import { sitePrimaryButtonStyle } from '../../lib/site-ui';
import ContactForm from './ContactForm';
import BookingWidget from './BookingWidget';
import CommentsSection from './CommentsSection';
import VideoThumb from './VideoThumb';
import ProfileBlockSections from './ProfileBlockSections';
import SideNav from './SideNav';

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-worksans',
  display: 'swap',
});

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

const SOCIAL_ICON_PATHS: Record<string, string> = {
  Instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5.3a3.7 3.7 0 1 0 0 7.4 3.7 3.7 0 0 0 0-7.4ZM17 6.6h.01',
  YouTube:
    'M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3A2.7 2.7 0 0 0 2.4 7.2 28 28 0 0 0 2 12a28 28 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9C6 19 12 19 12 19s6 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.8ZM10 15V9l5.2 3-5.2 3Z',
  Facebook: 'M13.5 21v-7.2h2.4l.4-2.8h-2.8v-1.8c0-.8.2-1.4 1.4-1.4h1.5V5.1C15.9 5 15 5 14 5c-2.2 0-3.7 1.3-3.7 3.8V11H8v2.8h2.3V21h3.2Z',
  LinkedIn:
    'M4.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3 9h3v12H3V9Zm6.5 0h2.9v1.6h.04c.4-.8 1.5-1.6 3-1.6 3.2 0 3.8 2 3.8 4.7V21h-3v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21h-3V9Z',
  TikTok:
    'M15 3h2.6c.2 1.7 1.3 3.1 3.4 3.4v2.7c-1.3 0-2.5-.4-3.5-1.1v6.4a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.8a2.8 2.8 0 1 0 1.9 2.7V3Z',
};

function SocialIcon({ path }: { path: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={path} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function socialLinksOf(profile: {
  socialInstagram?: string | null;
  socialYoutube?: string | null;
  socialFacebook?: string | null;
  socialLinkedin?: string | null;
  socialTiktok?: string | null;
}): { name: string; url: string }[] {
  return [
    { name: 'Instagram', url: profile.socialInstagram },
    { name: 'YouTube', url: profile.socialYoutube },
    { name: 'Facebook', url: profile.socialFacebook },
    { name: 'LinkedIn', url: profile.socialLinkedin },
    { name: 'TikTok', url: profile.socialTiktok },
  ].filter((s): s is { name: string; url: string } => Boolean(s.url));
}

export default async function PublicProfilePage({ params }: { params: { slug: string } }) {
  const profile = await fetchPublicProfile(params.slug);
  if (!profile) notFound();

  const p = getPalette(profile.colorPalette);
  const specialtyList = profile.specialties
    ? profile.specialties.split(',').map((s) => s.trim()).filter(Boolean)
    : [];
  const socialLinks = socialLinksOf(profile);
  const locationLabel = [profile.publicCity, profile.publicState].filter(Boolean).join(' — ');
  const hasFormacaoOuCredencial = profile.blocks.some((b) => b.type === 'formacao' || b.type === 'credencial');
  const hasExperiencia = profile.blocks.some((b) => b.type === 'experiencia');
  const hasFaq = profile.blocks.some((b) => b.type === 'faq');
  const sideNavItems = [
    profile.attendanceInfo && { href: '#sobre', label: 'Sobre o atendimento' },
    specialtyList.length > 0 && { href: '#areas', label: 'Áreas de atuação' },
    hasFormacaoOuCredencial && { href: '#formacao', label: 'Formação e credenciais' },
    hasExperiencia && { href: '#experiencia', label: 'Experiência' },
    hasFaq && { href: '#faq', label: 'Perguntas frequentes' },
    profile.bookingEnabled && { href: '#agendar', label: 'Agendamento' },
    { href: '#comentarios', label: 'Comentários' },
    { href: '#contato', label: 'Contato' },
  ].filter((item): item is { href: string; label: string } => Boolean(item));

  return (
    <div
      className={`site-profissional ${newsreader.variable} ${workSans.variable}`}
      style={{
        ...paletteVars(p),
        background: p.ground,
        color: p.ink,
        minHeight: '100vh',
      }}
    >
      <SideNav items={sideNavItems} p={p} />

      {/* Header */}
      <header
        style={{
          position: 'sticky', top: 0, zIndex: 5, background: p.surface, borderBottom: `1px solid ${p.line}`,
          padding: '0.9rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem',
        }}
      >
        <strong style={{ fontSize: '1rem', color: p.ink }}>{profile.name}</strong>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
          {socialLinks.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  style={{ color: p.inkSoft, display: 'flex' }}
                >
                  <SocialIcon path={SOCIAL_ICON_PATHS[s.name]} />
                </a>
              ))}
            </div>
          )}
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
        </div>
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
          <h1 className="site-display" style={{ fontSize: '2rem', margin: '0 0 0.4rem', color: p.ink, lineHeight: 1.2 }}>
            {profile.name}
            {profile.crpVerified && profile.crpNumber && (
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: p.accent, marginLeft: '0.6rem', verticalAlign: 'middle' }}>
                CRP {profile.crpNumber}
              </span>
            )}
          </h1>
          {locationLabel && (
            <p style={{ fontSize: '0.88rem', color: p.inkSoft, margin: '0 0 0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.7" />
              </svg>
              {locationLabel}
            </p>
          )}
          {profile.bio && (
            <p style={{ fontSize: '1rem', color: p.inkSoft, lineHeight: 1.6, margin: '0 0 1.4rem', whiteSpace: 'pre-wrap' }}>
              {profile.bio.length > 220 ? `${profile.bio.slice(0, 220)}…` : profile.bio}
            </p>
          )}
          <a
            href={profile.bookingEnabled ? '#agendar' : '#contato'}
            style={sitePrimaryButtonStyle()}
          >
            {profile.bookingEnabled ? 'Agende sua sessão' : 'Agende uma conversa'}
          </a>
        </div>
        {profile.photoUrl && (
          <div style={{ flex: '1 1 260px', maxWidth: '340px' }}>
            {profile.presentationVideoUrl ? (
              <VideoThumb videoUrl={profile.presentationVideoUrl} photoUrl={profile.photoUrl} alt={profile.name} />
            ) : (
              <img
                src={profile.photoUrl}
                alt={profile.name}
                style={{ width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', borderRadius: '16px', display: 'block' }}
              />
            )}
          </div>
        )}
      </section>

      {/* About */}
      {profile.attendanceInfo && (
        <section id="sobre" style={{ background: p.surface, borderTop: `1px solid ${p.line}`, borderBottom: `1px solid ${p.line}` }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
            <h2 className="site-display" style={{ fontSize: '1.15rem', margin: '0 0 1rem', color: p.ink }}>Sobre o atendimento</h2>
            <p style={{ fontSize: '0.98rem', color: p.inkSoft, lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>{profile.attendanceInfo}</p>
          </div>
        </section>
      )}

      {/* Especialidades */}
      {specialtyList.length > 0 && (
        <section id="areas" style={{ maxWidth: '960px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
          <h2 className="site-display" style={{ fontSize: '1.15rem', margin: '0 0 1.2rem', color: p.ink }}>Áreas de atuação</h2>
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

      <ProfileBlockSections blocks={profile.blocks} p={p} />

      {/* Agendamento público */}
      {profile.bookingEnabled && (
        <section id="agendar" style={{ background: p.surface, borderTop: `1px solid ${p.line}`, borderBottom: `1px solid ${p.line}` }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 1.5rem' }}>
            <h2 className="site-display" style={{ fontSize: '1.25rem', margin: '0 0 0.5rem', color: p.ink }}>Agende sua sessão</h2>
            <p style={{ fontSize: '0.92rem', color: p.inkSoft, margin: '0 0 1.5rem' }}>
              Escolha um horário disponível e garanta sua vaga com o pagamento.
            </p>
            <BookingWidget slug={params.slug} />
          </div>
        </section>
      )}

      {/* Comentários e curtidas */}
      <section id="comentarios" style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <h2 className="site-display" style={{ fontSize: '1.25rem', margin: '0 0 1.5rem', color: p.ink }}>Comentários</h2>
        <CommentsSection slug={params.slug} />
      </section>

      {/* Contato */}
      <section id="contato" style={{ background: p.accentSoft }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          <h2 className="site-display" style={{ fontSize: '1.25rem', margin: '0 0 0.5rem', color: p.ink }}>Vamos conversar?</h2>
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
