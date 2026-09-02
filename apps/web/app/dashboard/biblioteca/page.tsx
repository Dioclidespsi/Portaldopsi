'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronRight, Eye, X } from 'lucide-react';
import DashboardShell from '../../../components/DashboardShell';
import {
  downloadLibraryMaterial,
  getLibraryViewLink,
  LibraryMaterial,
  LIBRARY_VIEWABLE_EXTENSIONS,
  listLibrary,
} from '../../../lib/api';

/** Office/Google não conseguem ler o arquivo direto (ele não tem URL pública de verdade,
 * só o link de 10min do token) — mas ambos ACEITAM buscar qualquer URL http(s) que a gente
 * passe, então o link com token funciona igual a um link público normal pra esse fim. */
function viewerSrc(url: string, ext: string): string {
  if (ext === '.pdf') return url;
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
}

export default function BibliotecaPage() {
  const router = useRouter();
  const [materials, setMaterials] = useState<LibraryMaterial[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // Categorias começam recolhidas — só o nome aparece até o usuário abrir.
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
  const [viewing, setViewing] = useState<{ url: string; ext: string; title: string } | null>(null);
  const [viewLoadingId, setViewLoadingId] = useState<string | null>(null);

  useEffect(() => {
    listLibrary()
      .then(setMaterials)
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  function toggleCategory(cat: string) {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  async function onDownload(m: LibraryMaterial) {
    setError(null);
    try {
      await downloadLibraryMaterial(m.id, m.title);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onView(m: LibraryMaterial) {
    setError(null);
    setViewLoadingId(m.id);
    try {
      const { url } = await getLibraryViewLink(m.id);
      setViewing({ url, ext: m.fileExt, title: m.title });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setViewLoadingId(null);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  const byCategory = materials.reduce<Record<string, LibraryMaterial[]>>((acc, m) => {
    (acc[m.category] ??= []).push(m);
    return acc;
  }, {});

  return (
    <DashboardShell title={"Biblioteca"} description={"Materiais de apoio disponibilizados pela plataforma — visualize ou baixe o que precisar."}>
      {Object.entries(byCategory).map(([cat, items]) => {
        const open = openCategories.has(cat);
        return (
          <div key={cat} className="card" style={{ marginTop: '1rem', padding: 0, overflow: 'hidden' }}>
            <button
              type="button"
              onClick={() => toggleCategory(cat)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: 'transparent', color: 'var(--ink)', border: 'none',
                padding: '0.9rem 1.1rem', fontSize: '0.95rem', fontWeight: 600, textAlign: 'left',
              }}
            >
              {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              {cat}
              <span style={{ marginLeft: 'auto', fontSize: '0.78rem', fontWeight: 400, color: 'var(--ink-soft)' }}>
                {items.length} {items.length === 1 ? 'material' : 'materiais'}
              </span>
            </button>
            {open && (
              <div style={{ borderTop: '1px solid var(--line)' }}>
                {items.map((m) => (
                  <div key={m.id} style={{ padding: '0.7rem 1.1rem', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <div>
                      <strong style={{ fontSize: '0.92rem' }}>{m.title}</strong>
                      {m.description && <p style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', margin: '0.2rem 0 0' }}>{m.description}</p>}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                      {LIBRARY_VIEWABLE_EXTENSIONS.has(m.fileExt) && (
                        <button
                          type="button"
                          onClick={() => onView(m)}
                          disabled={viewLoadingId === m.id}
                          style={{ fontSize: '0.8rem', padding: '0.35rem 0.7rem', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}
                        >
                          <Eye size={14} /> {viewLoadingId === m.id ? 'Abrindo…' : 'Visualizar'}
                        </button>
                      )}
                      <button onClick={() => onDownload(m)} style={{ fontSize: '0.8rem', padding: '0.35rem 0.7rem', whiteSpace: 'nowrap' }}>
                        Baixar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
      {materials.length === 0 && <p className="sub">Nenhum material disponível ainda.</p>}
      {error && <span className="error">{error}</span>}

      {viewing && (
        <div
          role="dialog"
          aria-modal="true"
          style={{ position: 'fixed', inset: 0, background: 'rgba(15, 33, 29, 0.65)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          onClick={() => setViewing(null)}
        >
          <div
            style={{ background: 'var(--surface)', borderRadius: '12px', width: '100%', maxWidth: '1000px', height: '100%', maxHeight: '850px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 1.1rem', borderBottom: '1px solid var(--line)' }}>
              <strong style={{ fontSize: '0.92rem' }}>{viewing.title}</strong>
              <button
                type="button"
                onClick={() => setViewing(null)}
                aria-label="Fechar"
                style={{ background: 'transparent', color: 'var(--ink-soft)', border: 'none', padding: '0.3rem', display: 'flex' }}
              >
                <X size={18} />
              </button>
            </div>
            <iframe
              src={viewerSrc(viewing.url, viewing.ext)}
              title={viewing.title}
              style={{ flex: 1, border: 'none', width: '100%' }}
            />
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
