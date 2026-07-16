import { CommunityCategory, COMMUNITY_CATEGORY_LABEL } from '../../../lib/api';

const CATEGORY_COLOR: Record<CommunityCategory, string> = {
  INDICACAO: '#2f6690',
  CASO_CLINICO: '#1f6f63',
  GESTAO_CONSULTORIO: '#a9762a',
  ABORDAGENS_TECNICAS: '#7a5ea8',
  CARREIRA_FORMACAO: '#4b7a3f',
  GERAL: '#6b7280',
};

const AVATAR_PALETTE = ['#2f6690', '#1f6f63', '#a9762a', '#7a5ea8', '#4b7a3f', '#b0563f', '#3f6b7a'];

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

export function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const color = AVATAR_PALETTE[hashString(name) % AVATAR_PALETTE.length];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.4,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {initials(name)}
    </div>
  );
}

export function CategoryChip({ category }: { category: CommunityCategory }) {
  const color = CATEGORY_COLOR[category];
  return (
    <span
      style={{
        fontSize: '0.68rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.03em',
        color,
        border: `1px solid ${color}`,
        borderRadius: '100px',
        padding: '0.1rem 0.55rem',
        whiteSpace: 'nowrap',
      }}
    >
      {COMMUNITY_CATEGORY_LABEL[category]}
    </span>
  );
}

export function CrpBadge() {
  return (
    <span
      title="CRP verificado pela plataforma"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '15px',
        height: '15px',
        borderRadius: '50%',
        background: 'var(--accent)',
        color: '#fff',
        fontSize: '10px',
        marginLeft: '0.3rem',
      }}
    >
      ✓
    </span>
  );
}

export function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'agora mesmo';
  if (minutes < 60) return `há ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `há ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `há ${days} dia${days > 1 ? 's' : ''}`;
  const months = Math.floor(days / 30);
  if (months < 12) return `há ${months} ${months > 1 ? 'meses' : 'mês'}`;
  const years = Math.floor(months / 12);
  return `há ${years} ano${years > 1 ? 's' : ''}`;
}

export const CATEGORY_OPTIONS: CommunityCategory[] = ['INDICACAO', 'CASO_CLINICO', 'GESTAO_CONSULTORIO', 'ABORDAGENS_TECNICAS', 'CARREIRA_FORMACAO', 'GERAL'];
