import type { CapacitorConfig } from '@capacitor/cli';

/**
 * Casca nativa, não um app separado: o WebView carrega o site publicado
 * direto (server.url) em vez de empacotar HTML/JS local — qualquer deploy
 * novo no site já aparece pro paciente sem precisar gerar um APK novo.
 * webDir aponta pra um index.html vazio só porque o Capacitor exige que a
 * pasta exista, mas ele nunca é servido (server.url tem prioridade).
 */
const config: CapacitorConfig = {
  appId: 'br.com.portaldopsi.app',
  appName: 'Portal do Psi',
  webDir: 'www',
  server: {
    url: 'https://portaldopsi.com.br',
    cleartext: false,
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;
