const YOUTUBE_ID_RE = /^[\w-]{11}$/;

/** Aceita watch?v=, youtu.be/, embed/ e shorts/ — inclusive vídeos "não listados" (o link funciona igual). */
export function extractYouTubeId(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url.trim());
  } catch {
    return null;
  }
  const host = parsed.hostname.replace(/^www\./, '').replace(/^m\./, '');

  if (host === 'youtu.be') {
    const id = parsed.pathname.slice(1);
    return YOUTUBE_ID_RE.test(id) ? id : null;
  }
  if (host === 'youtube.com') {
    if (parsed.pathname === '/watch') {
      const id = parsed.searchParams.get('v');
      return id && YOUTUBE_ID_RE.test(id) ? id : null;
    }
    const match = parsed.pathname.match(/^\/(embed|shorts)\/([\w-]{11})/);
    if (match) return match[2];
  }
  return null;
}
