// Service Worker for Projekt Orion
const CACHE_VERSION = 'v1';
const CACHE_NAME = `orion-${CACHE_VERSION}`;
const STATIC_CACHE = `orion-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `orion-dynamic-${CACHE_VERSION}`;

const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/js/components/zemljevid.js',
  '/js/components/casovnica.js',
  '/js/components/omrezja.js',
  '/js/components/akcije.js',
  '/js/components/karta.js',
  '/data/raziskave.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('[SW] Cache installation failed:', err))
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating new Service Worker...');
  const cacheWhitelist = [STATIC_CACHE, DYNAMIC_CACHE];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log(`[SW] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  return self.clients.claim();
});

// Fetch event - smart caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Cache First for static assets
  if (request.destination === 'style' || request.destination === 'script' || request.destination === 'font') {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Cache First for images
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request, DYNAMIC_CACHE));
    return;
  }

  // Network First for HTML and JSON (always fresh)
  if (request.destination === 'document' || url.pathname.endsWith('.html') || url.pathname.endsWith('.json')) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    return;
  }

  // Default: Network First
  event.respondWith(networkFirst(request, DYNAMIC_CACHE));
});

// Cache First Strategy
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    console.log(`[SW] Cache hit: ${request.url}`);
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
      console.log(`[SW] Cached: ${request.url}`);
    }
    return response;
  } catch (error) {
    console.error(`[SW] Fetch failed for ${request.url}:`, error);
    return new Response('Offline - content not available', { status: 503 });
  }
}

// Network First Strategy
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
      console.log(`[SW] Updated cache: ${request.url}`);
    }
    return response;
  } catch (error) {
    console.log(`[SW] Network failed, trying cache: ${request.url}`);
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    return new Response('Offline - content not available', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({ 'Content-Type': 'text/html' })
    });
  }
}
