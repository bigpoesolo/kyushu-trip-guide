// Bump this version when shipping changes to the files in the offline cache.
const cacheName = 'fukuoka-trip-v8';
const shell = [
  './', './style.css?v=8', './app.js?v=8', './trip.js?v=8', './guides.js?v=8', './reservations.js?v=8',
  './manifest.webmanifest', './icon-192.png', './icon-512.png', './yufuin-winter.webp',
  './photo-yufuin-station.webp', './photo-yunotsubo.webp', './photo-airport.webp', './photo-hakata.webp', './photo-kushida.webp',
  './photo-mameshiba.webp', './photo-street-snacks.webp', './photo-night-snacks.webp',
  './photo-hakata-bread.webp', './photo-hakata-ramen.webp', './photo-hakata-unagi.webp',
  './photo-hakata-tempura.webp', './photo-hakata-gyoza.webp',
  './photo-forza.webp',
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(shell)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    await self.clients.claim();
    for (const key of await caches.keys()) {
      if (key.startsWith('fukuoka-trip-') && key !== cacheName) await caches.delete(key);
    }
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('./', { cacheName })));
  } else if (shell.some(path => new URL(path, self.registration.scope).href === event.request.url)) {
    event.respondWith(caches.match(event.request, { cacheName }).then(cached => cached || fetch(event.request)));
  }
});
