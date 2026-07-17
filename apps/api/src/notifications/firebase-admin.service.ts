import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { cert, initializeApp, getApps, App } from 'firebase-admin/app';
import { getMessaging, Messaging } from 'firebase-admin/messaging';

export interface PushPayload {
  title: string;
  body: string;
  data?: Record<string, string>;
}

/**
 * Mesmo padrão de AiService/TeleconsultaService: sem FIREBASE_SERVICE_ACCOUNT_JSON
 * configurado, `messaging` fica null e sendToTokens() é um no-op silencioso —
 * nunca quebra o fluxo (assinar dever de casa, confirmar consulta) por falta
 * de credencial opcional.
 */
@Injectable()
export class FirebaseAdminService {
  private readonly logger = new Logger(FirebaseAdminService.name);
  private readonly messaging: Messaging | null;

  constructor(private readonly config: ConfigService) {
    const raw = this.config.get<string>('FIREBASE_SERVICE_ACCOUNT_JSON');
    if (!raw) {
      this.messaging = null;
      return;
    }
    const serviceAccount = JSON.parse(raw);
    const app: App = getApps()[0] ?? initializeApp({ credential: cert(serviceAccount) });
    this.messaging = getMessaging(app);
  }

  get enabled(): boolean {
    return this.messaging !== null;
  }

  /** Retorna os tokens que o FCM reportou como inválidos/expirados — quem chama deve removê-los do banco. */
  async sendToTokens(tokens: string[], payload: PushPayload): Promise<{ invalidTokens: string[] }> {
    if (!this.messaging || tokens.length === 0) return { invalidTokens: [] };

    const response = await this.messaging.sendEachForMulticast({
      tokens,
      notification: { title: payload.title, body: payload.body },
      data: payload.data,
      webpush: { fcmOptions: { link: '/paciente' } },
    });

    const invalidTokens: string[] = [];
    response.responses.forEach((r, i) => {
      if (!r.success && (r.error?.code === 'messaging/registration-token-not-registered' || r.error?.code === 'messaging/invalid-registration-token')) {
        invalidTokens.push(tokens[i]);
      } else if (!r.success) {
        this.logger.warn(`Falha ao enviar push: ${r.error?.message}`);
      }
    });
    return { invalidTokens };
  }
}
