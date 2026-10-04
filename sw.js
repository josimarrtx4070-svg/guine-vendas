/* GUINÉ-VENDAS - Service Worker (PWA / base do app Android TWA) */
const CACHE = 'gv-cache-v2';
const SHELL = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './js/supabase-config.js',
  './manifest.webmanifest',
  './images/icon-192.png',
  './images/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // Nunca intercetar API do Supabase nem pedidos não-GET
  if (url.hostname.includes('supabase.co')) return;
  if (e.request.method !== 'GET') return;
  const sameOrigin = url.origin === self.location.origin;
  const isShell = /\.(js|css|html|webmanifest)$/.test(url.pathname) || url.pathname.endsWith('/');
  e.respondWith(
    (async () => {
      // Ficheiros da app: network-first (evita versão presa em cache após deploys)
      if (sameOrigin && isShell) {
        try {
          const res = await fetch(e.request);
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
          }
          return res;
        } catch (err) {
          const hit = await caches.match(e.request);
          if (hit) return hit;
          return caches.match('./index.html');
        }
      }
      // Imagens/outros: cache-first
      const hit = await caches.match(e.request);
      if (hit) return hit;
      try {
        const res = await fetch(e.request);
        if (res && res.status === 200 && sameOrigin) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      } catch (err) {
        return caches.match('./index.html');
      }
    })()
  );
});
