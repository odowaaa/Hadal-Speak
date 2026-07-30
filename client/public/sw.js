// Bump this on every release that changes cached assets so old caches are dropped.
const CACHE_VERSION = 'v2';
const CACHE_NAME = `hadal-english-${CACHE_VERSION}`;

// Vite fingerprints built JS/CSS filenames, so we can't know them ahead of
// time here. Instead we precache the app shell + static PWA assets, and
// cache everything else the first time it's actually requested.
const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/offline.html',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle same-origin GET requests; let everything else pass through.
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) {
    return;
  }

  // Navigations (loading a page/route): network-first so users get fresh
  // content when online, falling back to the cached shell or offline page.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('/', clone));
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match('/') || caches.match('/offline.html'))
        )
    );
    return;
  }

  // Static assets (hashed JS/CSS/images): cache-first, then update the
  // cache in the background so the next load picks up new versions.
  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
