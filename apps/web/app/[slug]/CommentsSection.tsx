'use client';

import { FormEvent, useEffect, useState } from 'react';
import {
  fetchPublicComments,
  fetchSiteLikes,
  getVisitorToken,
  likeSite,
  PublicSiteComment,
  submitPublicComment,
  unlikeSite,
} from '../../lib/api';
import { siteFieldStyle, sitePrimaryButtonStyle } from '../../lib/site-ui';

const PREVIEW_COUNT = 2;
const MODAL_PAGE_SIZE = 30;

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: 'var(--site-accent)', fontSize: '0.85rem', letterSpacing: '1px' }}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  );
}

function CommentCard({ c }: { c: PublicSiteComment }) {
  return (
    <div style={{ background: 'var(--site-surface)', borderRadius: '8px', padding: '0.9rem 1.1rem' }}>
      {c.rating != null && <div style={{ marginBottom: '0.3rem' }}><Stars rating={c.rating} /></div>}
      <p style={{ fontSize: '0.92rem', color: 'var(--site-ink)', margin: '0 0 0.4rem', lineHeight: 1.6 }}>{c.content}</p>
      <p style={{ fontSize: '0.8rem', color: 'var(--site-ink-soft)', margin: 0 }}>
        — {c.authorName}, {new Date(c.createdAt).toLocaleDateString('pt-BR')}
      </p>
    </div>
  );
}

const fieldStyle = siteFieldStyle();

export default function CommentsSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<PublicSiteComment[]>([]);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeBusy, setLikeBusy] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [consentToPublish, setConsentToPublish] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [visibleInModal, setVisibleInModal] = useState(MODAL_PAGE_SIZE);

  useEffect(() => {
    const visitorToken = getVisitorToken();
    fetchPublicComments(slug).then(setComments);
    fetchSiteLikes(slug, visitorToken).then(({ count, likedByVisitor }) => {
      setLikeCount(count);
      setLiked(likedByVisitor);
    });
  }, [slug]);

  useEffect(() => {
    if (showAll) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [showAll]);

  async function onToggleLike() {
    setLikeBusy(true);
    try {
      const visitorToken = getVisitorToken();
      const result = liked ? await unlikeSite(slug, visitorToken) : await likeSite(slug, visitorToken);
      setLikeCount(result.count);
      setLiked(result.likedByVisitor);
    } catch {
      // curtida é low-stakes — falha silenciosa, sem poluir a tela com erro de rede.
    } finally {
      setLikeBusy(false);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await submitPublicComment(slug, { authorName, content, consentToPublish });
      setSent(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  const rated = comments.filter((c) => c.rating != null);
  const avgRating = rated.length ? Math.round(rated.reduce((sum, c) => sum + (c.rating ?? 0), 0) / rated.length) : null;
  const preview = comments.slice(0, PREVIEW_COUNT);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <button
        type="button"
        onClick={onToggleLike}
        disabled={likeBusy}
        style={{
          alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem',
          fontSize: '0.92rem', fontWeight: 600, color: liked ? '#fff' : 'var(--site-ink)',
          background: liked ? 'var(--site-accent)' : 'var(--site-surface)',
          border: '1px solid var(--site-line)', borderRadius: '100px',
          padding: '0.55rem 1.1rem', cursor: likeBusy ? 'default' : 'pointer', opacity: likeBusy ? 0.7 : 1,
        }}
      >
        {liked ? '♥ Curtido' : '♡ Curtir'} {likeCount > 0 && `· ${likeCount}`}
      </button>

      {comments.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {avgRating != null && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Stars rating={avgRating} />
              <span style={{ fontSize: '0.85rem', color: 'var(--site-ink-soft)' }}>
                {comments.length} avaliaç{comments.length === 1 ? 'ão' : 'ões'}
              </span>
            </div>
          )}
          {preview.map((c) => (
            <CommentCard key={c.id} c={c} />
          ))}
          {comments.length > PREVIEW_COUNT && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              style={{
                alignSelf: 'flex-start', fontSize: '0.88rem', fontWeight: 600, color: 'var(--site-accent)',
                background: 'transparent', border: '1px solid var(--site-accent)', borderRadius: '100px',
                padding: '0.5rem 1rem', cursor: 'pointer',
              }}
            >
              Ver todos os {comments.length} comentários
            </button>
          )}
        </div>
      )}

      {showAll && (
        <div
          onClick={() => setShowAll(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--site-ground, var(--site-surface))', borderRadius: '12px', maxWidth: '560px',
              width: '100%', maxHeight: '80vh', display: 'flex', flexDirection: 'column', overflow: 'hidden',
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1rem 1.2rem', borderBottom: '1px solid var(--site-line)',
            }}>
              <p style={{ margin: 0, fontWeight: 700, color: 'var(--site-ink)' }}>
                {comments.length} comentários
              </p>
              <button
                type="button"
                onClick={() => setShowAll(false)}
                aria-label="Fechar"
                style={{
                  background: 'transparent', border: 'none', fontSize: '1.3rem', lineHeight: 1,
                  color: 'var(--site-ink-soft)', cursor: 'pointer', padding: '0.2rem 0.5rem',
                }}
              >
                ×
              </button>
            </div>
            <div style={{ overflowY: 'auto', padding: '1rem 1.2rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {comments.slice(0, visibleInModal).map((c) => (
                <CommentCard key={c.id} c={c} />
              ))}
              {visibleInModal < comments.length && (
                <button
                  type="button"
                  onClick={() => setVisibleInModal((v) => v + MODAL_PAGE_SIZE)}
                  style={{
                    alignSelf: 'center', fontSize: '0.85rem', fontWeight: 600, color: 'var(--site-accent)',
                    background: 'transparent', border: '1px solid var(--site-accent)', borderRadius: '100px',
                    padding: '0.5rem 1.1rem', cursor: 'pointer', margin: '0.4rem 0',
                  }}
                >
                  Carregar mais
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {sent ? (
        <div style={{ background: 'var(--site-surface)', borderRadius: '8px', padding: '1rem 1.2rem', color: 'var(--site-ink)', fontSize: '0.92rem' }}>
          Obrigado pelo retorno!{' '}
          {consentToPublish
            ? 'Como você autorizou, ele pode aparecer aqui assim que o profissional revisar.'
            : 'Ele foi enviado só para o profissional, sem publicação.'}
        </div>
      ) : (
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '480px' }}>
          <p style={{ fontSize: '1.05rem', margin: 0, color: 'var(--site-ink)', fontWeight: 700 }}>Deixe seu comentário</p>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--site-ink-soft)' }}>
            Seu nome
            <input value={authorName} onChange={(e) => setAuthorName(e.target.value)} required style={fieldStyle} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--site-ink-soft)' }}>
            Comentário ou feedback
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={3} required style={fieldStyle} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--site-ink-soft)' }}>
            <input
              type="checkbox"
              checked={consentToPublish}
              onChange={(e) => setConsentToPublish(e.target.checked)}
              style={{ width: 'auto', marginTop: '0.2rem' }}
            />
            Autorizo a publicação deste comentário nesta página
          </label>
          <button type="submit" disabled={submitting} style={sitePrimaryButtonStyle({ disabled: submitting })}>
            {submitting ? 'Enviando…' : 'Enviar'}
          </button>
          {error && <span style={{ color: '#a33', fontSize: '0.85rem' }}>{error}</span>}
        </form>
      )}
    </div>
  );
}
