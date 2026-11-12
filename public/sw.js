// Eldivan Outdoor - Self-cleaning Service Worker
// Vercel üzerinde beyaz ekran ve bayat bundle sorununu önler
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll())
      .then((clients) => {
        clients.forEach((client) => {
          if (client.url && 'navigate' in client) {
            client.navigate(client.url);
          }
        });
      })
  );
});

self.addEventListener('fetch', (event) => {
  // Asla bayat önbellekten getirme; daima canlı ağa yönlendir
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
