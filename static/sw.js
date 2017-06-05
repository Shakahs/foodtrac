self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

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
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(window.clients.openWindow('https://developers.google.com/web/'));
});
