import { initializeApp, getApps } from 'firebase/app';
import { getMessaging, getToken, onMessage, isSupported, type Messaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let messagingPromise: Promise<Messaging | null> | null = null;

/** null quando o navegador não suporta push (Safari antigo, iOS fora do modo instalado) ou faltam as env vars. */
function getMessagingInstance(): Promise<Messaging | null> {
  if (!messagingPromise) {
    messagingPromise = (async () => {
      if (!firebaseConfig.apiKey || typeof window === 'undefined') return null;
      if (!(await isSupported())) return null;
      const app = getApps()[0] ?? initializeApp(firebaseConfig);
      return getMessaging(app);
    })();
  }
  return messagingPromise;
}

/**
 * Pede permissão de notificação e obtém o token FCM deste dispositivo —
 * quem chama é responsável por mandar o token pro backend (ver
 * registerPushToken em patient-api.ts). Retorna null se o navegador não
 * suporta, a permissão foi negada, ou a config do Firebase não foi preenchida.
 */
export async function requestPushToken(): Promise<string | null> {
  const messaging = await getMessagingInstance();
  const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
  if (!messaging || !vapidKey) return null;

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return null;

  const registration = await navigator.serviceWorker.ready;
  try {
    return await getToken(messaging, { vapidKey, serviceWorkerRegistration: registration });
  } catch {
    return null;
  }
}

/** Notificação chegando com o app aberto em primeiro plano — o SO não mostra isso sozinho, tratamos aqui. */
export async function onForegroundPush(callback: (title: string, body: string) => void) {
  const messaging = await getMessagingInstance();
  if (!messaging) return;
  onMessage(messaging, (payload) => {
    callback(payload.notification?.title ?? 'Portal do Psi', payload.notification?.body ?? '');
  });
}
