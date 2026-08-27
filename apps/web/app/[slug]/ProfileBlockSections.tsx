'use client';

import { ReactNode, useEffect, useState } from 'react';
import { SitePalette } from '../../lib/site-palettes';
import { SiteProfileBlock } from '../../lib/api';

/** Mesmo padrão visual da página suspensa de CommentsSection.tsx — reaproveitado aqui pra Formação/Credenciais/FAQ. */
function FloatingPanel({ title, p, onClose, children }: { title: string; p: SitePalette; onClose: () => void; children: ReactNode }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: p.ground, borderRadius: '12px', maxWidth: '560px',
          width: '100%', maxHeight: '80vh', display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem 1.2rem', borderBottom: `1px solid ${p.line}`,
        }}>
          <p className="site-display" style={{ margin: 0, fontWeight: 700, color: p.ink }}>{title}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            style={{
              background: 'transparent', border: 'none', fontSize: '1.3rem', lineHeight: 1,
              color: p.inkSoft, cursor: 'pointer', padding: '0.2rem 0.5rem',
            }}
          >
            ×
          </button>
        </div>
        <div style={{ overflowY: 'auto', padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function titleRowStyle(p: SitePalette): React.CSSProperties {
  return {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', textAlign: 'left',
    background: p.surface, border: `1px solid ${p.line}`, borderRadius: '10px',
    padding: '0.85rem 1.1rem', fontSize: '0.95rem', fontWeight: 600, color: p.ink,
    fontFamily: 'inherit', cursor: 'pointer',
  };
}

function ChevronHint({ p }: { p: SitePalette }) {
  return <span style={{ color: p.accent, fontWeight: 700, flexShrink: 0, marginLeft: '0.6rem' }}>›</span>;
}

function FormacaoDetail({ b, p }: { b: SiteProfileBlock; p: SitePalette }) {
  return (
    <div>
      <p style={{ fontSize: '0.98rem', fontWeight: 700, color: p.ink, margin: '0 0 0.15rem' }}>{b.fields.titulo}</p>
      <p style={{ fontSize: '0.88rem', color: p.inkSoft, margin: 0 }}>
        {[b.fields.instituicao, b.fields.ano].filter(Boolean).join(' · ')}
      </p>
    </div>
  );
}

function FaqDetail({ b, p }: { b: SiteProfileBlock; p: SitePalette }) {
  return (
    <div>
      <p style={{ fontSize: '0.96rem', fontWeight: 700, color: p.ink, margin: '0 0 0.3rem' }}>{b.fields.pergunta}</p>
      <p style={{ fontSize: '0.92rem', color: p.inkSoft, lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>{b.fields.resposta}</p>
    </div>
  );
}

/**
 * Renderiza os blocos de conteúdo repetível do Site Profissional (formação,
 * experiência, credenciais, FAQ) — cada tipo condicional (some por completo
 * quando não há bloco daquele tipo, nunca um placeholder). Ordem segue
 * `position`, já ordenado pela API.
 *
 * Formação/Credenciais e FAQ usam o mesmo recurso de "página suspensa" já
 * usado em CommentsSection: na página, só o título aparece; o conteúdo
 * completo só é mostrado ao clicar. Formação e Credenciais abrem a MESMA
 * página suspensa (pedido explícito de juntar as duas); FAQ tem a sua
 * própria. Experiência continua exibida por completo, sem modal — não foi
 * pedido para ela.
 */
export default function ProfileBlockSections({ blocks, p }: { blocks: SiteProfileBlock[]; p: SitePalette }) {
  const formacao = blocks.filter((b) => b.type === 'formacao');
  const experiencia = blocks.filter((b) => b.type === 'experiencia');
  const credencial = blocks.filter((b) => b.type === 'credencial');
  const faq = blocks.filter((b) => b.type === 'faq');

  const [showFormacaoPanel, setShowFormacaoPanel] = useState(false);
  const [showFaqPanel, setShowFaqPanel] = useState(false);

  useEffect(() => {
    if (showFormacaoPanel || showFaqPanel) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [showFormacaoPanel, showFaqPanel]);

  return (
    <>
      {(formacao.length > 0 || credencial.length > 0) && (
        <section id="formacao" style={{ maxWidth: '680px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
          {formacao.length > 0 && (
            <div style={{ marginBottom: credencial.length > 0 ? '1.8rem' : 0 }}>
              <h2 className="site-display" style={{ fontSize: '1.15rem', margin: '0 0 1.2rem', color: p.ink }}>Formação acadêmica</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {formacao.map((b) => (
                  <button key={b.id} type="button" onClick={() => setShowFormacaoPanel(true)} style={titleRowStyle(p)}>
                    {b.fields.titulo}
                    <ChevronHint p={p} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {credencial.length > 0 && (
            <div>
              <h2 className="site-display" style={{ fontSize: '1.15rem', margin: '0 0 1.2rem', color: p.ink }}>Credenciais e certificações</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {credencial.map((b) => (
                  <button key={b.id} type="button" onClick={() => setShowFormacaoPanel(true)} style={titleRowStyle(p)}>
                    {b.fields.nome}
                    <ChevronHint p={p} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {experiencia.length > 0 && (
        <section id="experiencia" style={{ background: p.surface, borderTop: `1px solid ${p.line}`, borderBottom: `1px solid ${p.line}` }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
            <h2 className="site-display" style={{ fontSize: '1.15rem', margin: '0 0 1.2rem', color: p.ink }}>Experiência profissional</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {experiencia.map((b) => (
                <div key={b.id}>
                  <p style={{ fontSize: '0.98rem', fontWeight: 700, color: p.ink, margin: '0 0 0.15rem' }}>{b.fields.titulo}</p>
                  <p style={{ fontSize: '0.88rem', color: p.inkSoft, margin: '0 0 0.35rem' }}>
                    {[b.fields.local, b.fields.periodo].filter(Boolean).join(' · ')}
                  </p>
                  {b.fields.descricao && (
                    <p style={{ fontSize: '0.92rem', color: p.inkSoft, lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>
                      {b.fields.descricao}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {faq.length > 0 && (
        <section id="faq" style={{ background: p.surface, borderTop: `1px solid ${p.line}`, borderBottom: `1px solid ${p.line}` }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
            <h2 className="site-display" style={{ fontSize: '1.15rem', margin: '0 0 1.2rem', color: p.ink }}>Perguntas frequentes</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {faq.map((b) => (
                <button key={b.id} type="button" onClick={() => setShowFaqPanel(true)} style={titleRowStyle(p)}>
                  {b.fields.pergunta}
                  <ChevronHint p={p} />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {showFormacaoPanel && (
        <FloatingPanel title="Formação e credenciais" p={p} onClose={() => setShowFormacaoPanel(false)}>
          {formacao.length > 0 && (
            <div>
              <p className="site-display" style={{ fontSize: '0.85rem', fontWeight: 700, color: p.accent, margin: '0 0 0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Formação acadêmica
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {formacao.map((b) => <FormacaoDetail key={b.id} b={b} p={p} />)}
              </div>
            </div>
          )}
          {credencial.length > 0 && (
            <div>
              <p className="site-display" style={{ fontSize: '0.85rem', fontWeight: 700, color: p.accent, margin: '0 0 0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Credenciais e certificações
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {credencial.map((b) => (
                  <span
                    key={b.id}
                    style={{
                      background: p.accentSoft, color: p.ink, fontSize: '0.88rem', fontWeight: 600,
                      padding: '0.5rem 1rem', borderRadius: '100px',
                    }}
                  >
                    {[b.fields.nome, b.fields.orgaoEmissor, b.fields.ano].filter(Boolean).join(' · ')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </FloatingPanel>
      )}

      {showFaqPanel && (
        <FloatingPanel title="Perguntas frequentes" p={p} onClose={() => setShowFaqPanel(false)}>
          {faq.map((b) => <FaqDetail key={b.id} b={b} p={p} />)}
        </FloatingPanel>
      )}
    </>
  );
}
