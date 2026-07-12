'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNav from '../../../components/DashboardNav';
import { listOffers, Offer } from '../../../lib/api';

export default function OfertasPage() {
  const router = useRouter();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listOffers()
      .then(setOffers)
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>Ofertas</h2>
      <p className="sub">Novidades e produtos selecionados pela equipe do Portal do Psi.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginTop: '1rem' }}>
        {offers.map((o) => (
          <a
            key={o.id}
            href={o.externalUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              border: '1px solid var(--line)',
              borderRadius: '8px',
              padding: '0.9rem 1.1rem',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            {o.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={o.imageUrl} alt="" style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />
            )}
            <div>
              <p style={{ margin: '0 0 0.2rem', fontWeight: 600 }}>{o.title}</p>
              <p className="sub" style={{ margin: 0 }}>{o.description}</p>
            </div>
          </a>
        ))}
        {offers.length === 0 && <p className="sub">Nenhuma oferta no momento.</p>}
      </div>
    </div>
  );
}
