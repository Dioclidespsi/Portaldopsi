/**
 * Paletas fixas pro Site Profissional (/p/{slug}) — só se aplicam na página
 * pública, nunca no dashboard interno (que sempre usa as variáveis de
 * globals.css). Escolhidas pra "conversar" com o contexto de uma clínica de
 * psicologia: tons terrosos/acalmados, nunca saturados/frios/corporativos.
 */
export interface SitePalette {
  key: string;
  label: string;
  description: string;
  ground: string;
  surface: string;
  accent: string;
  accentSoft: string;
  ink: string;
  inkSoft: string;
  line: string;
}

export const SITE_PALETTES: Record<string, SitePalette> = {
  salvia: {
    key: 'salvia',
    label: 'Sálvia',
    description: 'Verde-sálvia calmo — equilíbrio e crescimento.',
    ground: '#f4f6f2',
    surface: '#ffffff',
    accent: '#4a6b58',
    accentSoft: '#e3ebe3',
    ink: '#223027',
    inkSoft: '#56695f',
    line: '#dbe3dc',
  },
  terracota: {
    key: 'terracota',
    label: 'Terracota',
    description: 'Argila e calor — acolhimento e presença.',
    ground: '#faf3ec',
    surface: '#ffffff',
    accent: '#b0603f',
    accentSoft: '#f3e2d8',
    ink: '#3a2820',
    inkSoft: '#7a6156',
    line: '#ecdcd0',
  },
  oceano: {
    key: 'oceano',
    label: 'Oceano',
    description: 'Azul-acinzentado sereno — confiança e estabilidade.',
    ground: '#f2f5f7',
    surface: '#ffffff',
    accent: '#3d6a86',
    accentSoft: '#dde9ee',
    ink: '#1f2e36',
    inkSoft: '#52646d',
    line: '#dbe4e9',
  },
  lavanda: {
    key: 'lavanda',
    label: 'Lavanda',
    description: 'Lilás suave — introspecção e delicadeza.',
    ground: '#f6f4f8',
    surface: '#ffffff',
    accent: '#7c6a9c',
    accentSoft: '#e9e3f0',
    ink: '#2c2536',
    inkSoft: '#665d75',
    line: '#e5deec',
  },
  areia: {
    key: 'areia',
    label: 'Areia',
    description: 'Neutro quente — simplicidade atemporal.',
    ground: '#f7f4ee',
    surface: '#ffffff',
    accent: '#8a7355',
    accentSoft: '#ede6d8',
    ink: '#322a20',
    inkSoft: '#6e6151',
    line: '#e8e0d2',
  },
  vinho: {
    key: 'vinho',
    label: 'Vinho',
    description: 'Bordô suave — sofisticação e profundidade.',
    ground: '#f8f3f3',
    surface: '#ffffff',
    accent: '#7d3f43',
    accentSoft: '#f0dfe0',
    ink: '#2e1e1f',
    inkSoft: '#6b5254',
    line: '#ecdcdc',
  },
  amarela: {
    key: 'amarela',
    label: 'Amarela',
    description: 'Mel suave — otimismo e energia leve.',
    ground: '#faf6ec',
    surface: '#ffffff',
    accent: '#b08a2e',
    accentSoft: '#f3e8cc',
    ink: '#3a2f14',
    inkSoft: '#7a6a45',
    line: '#ece0c0',
  },
  rosa: {
    key: 'rosa',
    label: 'Rosa',
    description: 'Rosa-antigo — cuidado e ternura.',
    ground: '#faf3f4',
    surface: '#ffffff',
    accent: '#b06478',
    accentSoft: '#f3e0e4',
    ink: '#3a2226',
    inkSoft: '#7a5b62',
    line: '#ecd8dc',
  },
  coral: {
    key: 'coral',
    label: 'Coral',
    description: 'Coral suave — acolhimento vibrante.',
    ground: '#fbf4f0',
    surface: '#ffffff',
    accent: '#c06a4f',
    accentSoft: '#f5e2d9',
    ink: '#3d2620',
    inkSoft: '#7d6156',
    line: '#efdcd2',
  },
  grafite: {
    key: 'grafite',
    label: 'Grafite',
    description: 'Neutro moderno — clareza e objetividade.',
    ground: '#f4f4f5',
    surface: '#ffffff',
    accent: '#4a4a52',
    accentSoft: '#e5e5e8',
    ink: '#212124',
    inkSoft: '#5a5a62',
    line: '#dedee2',
  },
};

export const DEFAULT_PALETTE_KEY = 'salvia';

export function getPalette(key?: string | null): SitePalette {
  return SITE_PALETTES[key ?? ''] ?? SITE_PALETTES[DEFAULT_PALETTE_KEY];
}
