/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDr1Ok-pyoXua5R_etDtxK5RQM5c706Qmw",
  authDomain: "codechrippushnotification.firebaseapp.com",
  projectId: "codechrippushnotification",
  messagingSenderId: "322687367237",
  appId: "1:322687367237:web:94a4a26b53b3ebf65f0b2c",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("payload::", payload);

  const { title, body, click_action } = payload.data;

  self.registration.showNotification(title, {
    body,
    icon: "/CodeChirp.png",
    data: { url: click_action },
  });

  self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    // Get the URL we stored in the 'data' property when we created the notification
    const urlToOpen = event.notification.data.url;

    console.log("Notification clicked! Opening URL:", urlToOpen);

    // Prevent the browser from immediately closing the Service Worker while we do our work
    event.waitUntil(
      clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((clientList) => {
          // Check if the app is already open in a tab and can be focused
          for (const client of clientList) {
            if (client.url.includes(urlToOpen) && "focus" in client) {
              return client.focus();
            }
            // As a fallback, also check if the app's root is open and focus that
            if (
              client.url.startsWith("https://www.codechirp.in") &&
              "focus" in client
            ) {
              return client.focus();
            }
          }

          // If no existing tab was found or focused, open a new window/tab to the URL
          if (clients.openWindow) {
            return clients.openWindow(urlToOpen);
          }
        })
    );
  });
});
