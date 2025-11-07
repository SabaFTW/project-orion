// Service Worker for LYRA ACTIVE Research Hub - Desktop PWA
const CACHE_VERSION = 'v2';
const CACHE_NAME = `lyra-research-${CACHE_VERSION}`;
const STATIC_CACHE = `lyra-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `lyra-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `lyra-images-${CACHE_VERSION}`;

const urlsToCache = [
  '/',
  '/index.html',
  '/OPEN.html',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap'
];

// Install event - cache essential resources
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

// Fetch event - smart caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Strategy 1: Cache First for static assets
  if (request.destination === 'style' || request.destination === 'script' || request.destination === 'font') {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Strategy 2: Cache First for images
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // Strategy 3: Network First for HTML pages (always fresh content)
  if (request.destination === 'document' || url.pathname.endsWith('.html')) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    return;
  }

  // Strategy 4: Network First for API/data
  if (url.pathname.includes('/data/') || url.pathname.includes('.json')) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    return;
  }

  // Default: Network First
  event.respondWith(networkFirst(request, DYNAMIC_CACHE));
});

// Cache First Strategy - for static assets
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

// Network First Strategy - for dynamic content
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
    // Return offline page
    return new Response('Offline - content not available', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({ 'Content-Type': 'text/html' })
    });
  }
}

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating new Service Worker...');
  const cacheWhitelist = [STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE];

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

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-research-data') {
    event.waitUntil(syncResearchData());
  }
});

async function syncResearchData() {
  // Sync research index when back online
  try {
    const response = await fetch('/Dumps/data/research-index.json');
    const cache = await caches.open(CACHE_NAME);
    await cache.put('/Dumps/data/research-index.json', response);
    console.log('Research data synced');
  } catch (error) {
    console.error('Sync failed:', error);
  }
}

// Push notification support (for future updates)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New research available!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    tag: 'research-update',
    actions: [
      { action: 'view', title: 'View', icon: '/icons/view.png' },
      { action: 'dismiss', title: 'Dismiss', icon: '/icons/dismiss.png' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('LYRA ACTIVE Research', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
