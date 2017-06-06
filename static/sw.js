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
