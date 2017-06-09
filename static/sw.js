const CACHE_NAME = 'foodtrac-cache';
const urlsToCache = [
  // '/bundle.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      }),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request and response to be used by both cache and browser
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((res) => {
            // Check if we received a valid response
          if (!res || res.status !== 200 || res.type !== 'basic') {
            return res;
          }

          const resToCache = res.clone();

          caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, resToCache);
              });

          return res;
        });
      }),
  );
});

/*
  ===========================
  PUSH NOTIFICATION LISTENERS
  ===========================
*/

self.addEventListener('push', (event) => {
  const title = 'Foodtrac';
  const options = {
    body: `${event.data.text()}`,
    icon: 'foodtruckicon.png',
    badge: 'foodtruckicon.png',
  };

  const notificationPromise = self.registration.showNotification(title, options);
  event.waitUntil(notificationPromise);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  // TODO: replace with foodtrac's URL
  event.waitUntil(window.clients.openWindow('https://developers.google.com/web/'));
});
