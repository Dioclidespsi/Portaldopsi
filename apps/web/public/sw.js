const CACHE_NAME = 'portal-do-psi-v1';
const OFFLINE_URL = '/paciente';

// Config pública do Firebase (não é segredo — mesmo bloco que vai no app
// cliente, ver lib/firebase.ts). Service worker é um arquivo estático servido
// direto, não passa pelo build do Next, então não dá pra ler de env var aqui.
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyA40VqXXoLssLtxlHB92K4dqDnD3NRRVhY',
  authDomain: 'portal-do-pci.firebaseapp.com',
  projectId: 'portal-do-pci',
  storageBucket: 'portal-do-pci.firebasestorage.app',
  messagingSenderId: '612658137307',
  appId: '1:612658137307:web:cfc2ecfc673a1f5d2ce4fe',
});

// Notificação com o app em background/fechado — com o app aberto, o próprio
// onMessage() do lib/firebase.ts mostra um toast em vez de uma notificação do SO.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification?.title ?? 'Portal do Psi', {
    body: payload.notification?.body,
    icon: '/icons/icon-192.png',
  });
});

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(['/manifest.json'])));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))),
  );
  self.clients.claim();
});

// Network-first para navegação (sempre busca a versão mais nova quando online);
// cai pro cache só quando genuinamente offline — nunca serve tela velha com o usuário online.
self.addEventListener('fetch', (event) => {
  if (event.request.mode !== 'navigate') return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then((cached) => cached ?? caches.match(OFFLINE_URL))),
  );
});
