'use client';

import { useState } from 'react';
import { extractYouTubeId } from '../../lib/youtube';

export default function VideoThumb({ videoUrl, photoUrl, alt }: { videoUrl: string; photoUrl: string; alt: string }) {
  const [open, setOpen] = useState(false);
  const videoId = extractYouTubeId(videoUrl);

  if (!videoId) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={photoUrl} alt={alt} style={{ width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', borderRadius: '16px', display: 'block' }} />
    );
  }

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        style={{ position: 'relative', width: '100%', aspectRatio: '4 / 5', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photoUrl} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div
          style={{
            position: 'absolute', left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0))',
            color: '#fff', padding: '1.6rem 0.9rem 0.7rem',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            fontSize: '0.88rem', fontWeight: 700,
          }}
        >
          ▶ Vídeo de apresentação
        </div>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '640px', aspectRatio: '16 / 9' }}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="Vídeo de apresentação"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
            />
          </div>
        </div>
      )}
    </>
  );
}
