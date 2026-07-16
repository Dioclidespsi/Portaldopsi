const CACHE_NAME = 'portal-do-psi-v1';
const OFFLINE_URL = '/paciente';

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
