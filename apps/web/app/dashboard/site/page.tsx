'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardNav from '../../../components/DashboardNav';
import {
  createSiteProfileBlock,
  deleteSiteProfileBlock,
  fetchOwnProfile,
  getSiteProfileBlockCatalog,
  listOwnSiteComments,
  listOwnSiteProfileBlocks,
  OwnSiteComment,
  Profile,
  removePresentationVideo,
  setPresentationVideoUrl,
  setSiteCommentPublished,
  SiteProfileBlock,
  SiteProfileBlockType,
  updateProfile,
  updateSiteProfileBlock,
  uploadProfilePhoto,
} from '../../../lib/api';
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
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [savingVideo, setSavingVideo] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [comments, setComments] = useState<OwnSiteComment[]>([]);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [blockCatalog, setBlockCatalog] = useState<SiteProfileBlockType[]>([]);
  const [blocks, setBlocks] = useState<SiteProfileBlock[]>([]);
  const [blockError, setBlockError] = useState<string | null>(null);
  const [newBlockType, setNewBlockType] = useState('');
  const [newBlockFields, setNewBlockFields] = useState<Record<string, string>>({});
  const [savingBlock, setSavingBlock] = useState(false);

  useEffect(() => {
    fetchOwnProfile()
      .then((p) => {
        setProfile(p);
        setVideoUrlInput(p.presentationVideoUrl ?? '');
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
    listOwnSiteComments().catch(() => []).then((list) => setComments(list ?? []));
    getSiteProfileBlockCatalog()
      .catch(() => [])
      .then((catalog) => {
        setBlockCatalog(catalog ?? []);
        setNewBlockType((catalog ?? [])[0]?.type ?? '');
      });
    listOwnSiteProfileBlocks().catch(() => []).then((list) => setBlocks(list ?? []));
  }, [router]);

  async function onTogglePublish(comment: OwnSiteComment) {
    setCommentError(null);
    try {
      const updated = await setSiteCommentPublished(comment.id, !comment.publishedByProfessional);
      setComments((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    } catch (err) {
      setCommentError((err as Error).message);
    }
  }

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
        publicAddress: profile.publicAddress ?? '',
        publicCity: profile.publicCity ?? '',
        publicState: profile.publicState ?? '',
        socialInstagram: profile.socialInstagram || undefined,
        socialYoutube: profile.socialYoutube || undefined,
        socialFacebook: profile.socialFacebook || undefined,
        socialLinkedin: profile.socialLinkedin || undefined,
        socialTiktok: profile.socialTiktok || undefined,
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

  async function onSaveVideoUrl() {
    if (!profile) return;
    setVideoError(null);
    setSavingVideo(true);
    try {
      const result = await setPresentationVideoUrl(videoUrlInput);
      setProfile({ ...profile, presentationVideoStatus: result.presentationVideoStatus, presentationVideoRejectionReason: null, presentationVideoUrl: videoUrlInput });
    } catch (err) {
      setVideoError((err as Error).message);
    } finally {
      setSavingVideo(false);
    }
  }

  async function onRemoveVideo() {
    if (!profile) return;
    setVideoError(null);
    setSavingVideo(true);
    try {
      const result = await removePresentationVideo();
      setProfile({ ...profile, presentationVideoStatus: result.presentationVideoStatus, presentationVideoRejectionReason: null, presentationVideoUrl: null });
      setVideoUrlInput('');
    } catch (err) {
      setVideoError((err as Error).message);
    } finally {
      setSavingVideo(false);
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

  function onNewBlockTypeChange(type: string) {
    setNewBlockType(type);
    setNewBlockFields({});
  }

  async function onAddBlock() {
    const typeDef = blockCatalog.find((t) => t.type === newBlockType);
    if (!typeDef) return;
    setBlockError(null);
    setSavingBlock(true);
    try {
      const created = await createSiteProfileBlock({ type: newBlockType, fields: newBlockFields });
      setBlocks((prev) => [...prev, created]);
      setNewBlockFields({});
    } catch (err) {
      setBlockError((err as Error).message);
    } finally {
      setSavingBlock(false);
    }
  }

  async function onDeleteBlock(id: string) {
    setBlockError(null);
    try {
      await deleteSiteProfileBlock(id);
      setBlocks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      setBlockError((err as Error).message);
    }
  }

  async function onMoveBlock(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    const a = blocks[index];
    const b = blocks[target];
    setBlockError(null);
    try {
      const [updatedA, updatedB] = await Promise.all([
        updateSiteProfileBlock(a.id, { position: b.position }),
        updateSiteProfileBlock(b.id, { position: a.position }),
      ]);
      setBlocks((prev) => {
        const next = [...prev];
        next[index] = updatedB;
        next[target] = updatedA;
        return next;
      });
    } catch (err) {
      setBlockError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;
  if (!profile) return null;

  const selectedSpecialties = parseSpecialties(profile.specialties);
  const customSpecialtiesText = selectedSpecialties.filter((s) => !ALL_SPECIALTIES.has(s)).join(', ');
  const selectedPalette = SITE_PALETTES[profile.colorPalette] ?? SITE_PALETTES.salvia;
  const newBlockTypeDef = blockCatalog.find((t) => t.type === newBlockType);

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
        Página pública em <Link href={`/${profile.slug}`} target="_blank">portaldopsi.com.br/{profile.slug}</Link>
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

        <div style={{ marginTop: '1.2rem' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', margin: '0 0 0.3rem' }}>Vídeo de apresentação</p>
          <p className="sub" style={{ margin: '0 0 0.6rem' }}>
            Poste o vídeo no YouTube como <strong>não listado</strong> (não aparece em busca, só quem tem o link acessa)
            e cole o link aqui. Depois de cadastrado, ele só aparece na sua página quando a administração revisar e
            publicar — nunca automaticamente.
          </p>
          {profile.presentationVideoStatus === 'PUBLICADO' && (
            <p style={{ color: 'var(--accent)', fontSize: '0.85rem', margin: '0 0 0.6rem' }}>Publicado — aparece na sua página pública.</p>
          )}
          {profile.presentationVideoStatus === 'EM_ANALISE' && (
            <p className="sub" style={{ margin: '0 0 0.6rem' }}>Em análise pela administração.</p>
          )}
          {profile.presentationVideoStatus === 'REJEITADO' && (
            <p style={{ color: '#a33', fontSize: '0.85rem', margin: '0 0 0.6rem' }}>
              Rejeitado{profile.presentationVideoRejectionReason && ` — ${profile.presentationVideoRejectionReason}`}. Você pode cadastrar outro link.
            </p>
          )}
          {/* <form> normal ficaria aninhado dentro do <form> principal da página (HTML/navegador não */}
          {/* permite isso — some silenciosamente); por isso é um <div> com botão type="button". */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap', gap: '0.6rem' }}>
            <label style={{ flex: 1, minWidth: '260px' }}>
              Link do YouTube
              <input
                value={videoUrlInput}
                onChange={(e) => setVideoUrlInput(e.target.value)}
                placeholder="https://youtu.be/…"
              />
            </label>
            <button type="button" onClick={onSaveVideoUrl} disabled={savingVideo || !videoUrlInput}>
              {savingVideo ? 'Salvando…' : 'Salvar link'}
            </button>
            {profile.presentationVideoStatus !== 'NAO_ENVIADO' && (
              <button
                type="button"
                onClick={onRemoveVideo}
                disabled={savingVideo}
                style={{ background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
              >
                Remover vídeo
              </button>
            )}
          </div>
          {videoError && <span className="error">{videoError}</span>}
        </div>

        <label>
          Apresentação pessoal
          <textarea
            rows={4}
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
          <textarea
            rows={4}
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
        <label>
          Endereço físico da clínica
          <input
            value={profile.publicAddress ?? ''}
            onChange={(e) => setProfile({ ...profile, publicAddress: e.target.value })}
            placeholder="Rua, número, bairro, cidade — UF"
          />
          <span className="sub" style={{ display: 'block', marginTop: '0.2rem' }}>
            Aparece na sua página pública e no cabeçalho/rodapé dos documentos gerados (laudos, atestados etc).
          </span>
        </label>
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          <label style={{ flex: '1 1 220px' }}>
            Cidade
            <input
              value={profile.publicCity ?? ''}
              onChange={(e) => setProfile({ ...profile, publicCity: e.target.value })}
              placeholder="Ex.: São Paulo"
            />
          </label>
          <label style={{ flex: '0 1 100px' }}>
            Estado (UF)
            <input
              value={profile.publicState ?? ''}
              onChange={(e) => setProfile({ ...profile, publicState: e.target.value.toUpperCase().slice(0, 2) })}
              placeholder="SP"
              maxLength={2}
            />
          </label>
        </div>
        <span className="sub" style={{ display: 'block', margin: '-0.6rem 0 0.6rem' }}>
          Aparece como selo ao lado do seu nome — útil mesmo pra quem atende só online, sem endereço físico.
        </span>

        <h3 style={{ fontSize: '0.95rem', margin: '1.2rem 0 0.8rem', borderTop: '1px solid var(--line)', paddingTop: '1.2rem' }}>
          Redes sociais
        </h3>
        <p className="sub" style={{ margin: '0 0 0.8rem' }}>
          Cada uma é opcional — só aparece na sua página pública se você preencher o link.
        </p>
        <label>
          Instagram
          <input
            value={profile.socialInstagram ?? ''}
            onChange={(e) => setProfile({ ...profile, socialInstagram: e.target.value })}
            placeholder="https://instagram.com/seu_perfil"
          />
        </label>
        <label>
          YouTube
          <input
            value={profile.socialYoutube ?? ''}
            onChange={(e) => setProfile({ ...profile, socialYoutube: e.target.value })}
            placeholder="https://youtube.com/@seu_canal"
          />
        </label>
        <label>
          Facebook
          <input
            value={profile.socialFacebook ?? ''}
            onChange={(e) => setProfile({ ...profile, socialFacebook: e.target.value })}
            placeholder="https://facebook.com/sua_pagina"
          />
        </label>
        <label>
          LinkedIn
          <input
            value={profile.socialLinkedin ?? ''}
            onChange={(e) => setProfile({ ...profile, socialLinkedin: e.target.value })}
            placeholder="https://linkedin.com/in/seu_perfil"
          />
        </label>
        <label>
          TikTok
          <input
            value={profile.socialTiktok ?? ''}
            onChange={(e) => setProfile({ ...profile, socialTiktok: e.target.value })}
            placeholder="https://tiktok.com/@seu_perfil"
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

      <h3 style={{ fontSize: '0.95rem', margin: '1.5rem 0 0.8rem', borderTop: '1px solid var(--line)', paddingTop: '1.2rem' }}>
        Formação, experiência e credenciais
      </h3>
      <p className="sub" style={{ margin: '0 0 1rem' }}>
        Cada item aparece na sua página pública só depois de adicionado aqui — nada é preenchido automaticamente.
      </p>
      {blockError && <span className="error">{blockError}</span>}
      {blocks.map((b, index) => {
        const typeDef = blockCatalog.find((t) => t.type === b.type);
        const summary = (typeDef?.fields ?? [])
          .map((f) => b.fields[f.key])
          .filter(Boolean)
          .join(' · ');
        return (
          <div key={b.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.7rem 0', borderBottom: '1px solid var(--line)' }}>
            <div style={{ flex: 1 }}>
              <p className="sub" style={{ margin: '0 0 0.15rem', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {typeDef?.label ?? b.type}
              </p>
              <p style={{ margin: 0, fontSize: '0.92rem' }}>{summary || '(sem conteúdo)'}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.3rem' }}>
              <button
                type="button"
                onClick={() => onMoveBlock(index, -1)}
                disabled={index === 0}
                style={{ fontSize: '0.78rem', padding: '0.3rem 0.5rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => onMoveBlock(index, 1)}
                disabled={index === blocks.length - 1}
                style={{ fontSize: '0.78rem', padding: '0.3rem 0.5rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => onDeleteBlock(b.id)}
                style={{ fontSize: '0.78rem', padding: '0.3rem 0.5rem', background: 'transparent', color: '#a33', border: '1px solid var(--line)' }}
              >
                Excluir
              </button>
            </div>
          </div>
        );
      })}
      {blocks.length === 0 && <p className="sub">Nada adicionado ainda.</p>}

      {blockCatalog.length > 0 && (
        <div style={{ marginTop: '1rem', padding: '0.9rem', border: '1px solid var(--line)', borderRadius: '8px' }}>
          <label>
            Tipo
            <select value={newBlockType} onChange={(e) => onNewBlockTypeChange(e.target.value)}>
              {blockCatalog.map((t) => (
                <option key={t.type} value={t.type}>{t.label}</option>
              ))}
            </select>
          </label>
          {newBlockTypeDef?.fields.map((f) => (
            <label key={f.key}>
              {f.label}
              <input
                value={newBlockFields[f.key] ?? ''}
                onChange={(e) => setNewBlockFields((prev) => ({ ...prev, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
              />
            </label>
          ))}
          <button type="button" onClick={onAddBlock} disabled={savingBlock}>
            {savingBlock ? 'Adicionando…' : 'Adicionar'}
          </button>
        </div>
      )}

      <h3 style={{ fontSize: '0.95rem', margin: '1.5rem 0 0.8rem', borderTop: '1px solid var(--line)', paddingTop: '1.2rem' }}>
        Comentários e feedback
      </h3>
      <p className="sub" style={{ margin: '0 0 1rem' }}>
        Você decide se cada comentário aparece na sua página pública ou não — o texto nunca pode ser editado, só publicado ou
        não. Comentários sem autorização do visitante ficam só aqui, como feedback privado.
      </p>
      {commentError && <span className="error">{commentError}</span>}
      {comments.map((c) => (
        <div key={c.id} style={{ padding: '0.9rem 0', borderBottom: '1px solid var(--line)' }}>
          {c.rating != null && (
            <p style={{ margin: '0 0 0.2rem', color: 'var(--accent)', fontSize: '0.85rem', letterSpacing: '1px' }}>
              {'★'.repeat(c.rating)}{'☆'.repeat(5 - c.rating)}
            </p>
          )}
          <p style={{ fontSize: '0.95rem', margin: '0 0 0.3rem' }}>{c.content}</p>
          <p className="sub" style={{ margin: '0 0 0.5rem' }}>
            — {c.authorName}, {new Date(c.createdAt).toLocaleDateString('pt-BR')}
            {!c.consentToPublish && ' · visitante não autorizou publicação'}
            {c.importedFrom && ` · importado do ${c.importedFrom}`}
          </p>
          {c.blockedByAdmin ? (
            <p style={{ fontSize: '0.82rem', color: '#a33', margin: 0 }}>
              Restrito pela administração{c.blockedReason && ` — ${c.blockedReason}`}
            </p>
          ) : c.consentToPublish ? (
            <button
              onClick={() => onTogglePublish(c)}
              style={
                c.publishedByProfessional
                  ? { fontSize: '0.82rem', padding: '0.35rem 0.7rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }
                  : { fontSize: '0.82rem', padding: '0.35rem 0.7rem' }
              }
            >
              {c.publishedByProfessional ? 'Despublicar' : 'Publicar na página'}
            </button>
          ) : (
            <p className="sub" style={{ fontSize: '0.82rem', margin: 0 }}>Não pode ser publicado sem autorização do visitante.</p>
          )}
        </div>
      ))}
      {comments.length === 0 && <p className="sub">Nenhum comentário ainda.</p>}
    </div>
  );
}
