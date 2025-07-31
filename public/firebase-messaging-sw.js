/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDr1Ok-pyoXua5R_etDtxK5RQM5c706Qmw",
  authDomain: "codechrippushnotification.firebaseapp.com",
  projectId: "codechrippushnotification",
  messagingSenderId: "322687367237",
  appId: "1:322687367237:web:94a4a26b53b3ebf65f0b2c",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(payload);
  
  
  const { title, body, click_action } = payload.data;

  self.registration.showNotification(title, {
    body,
    icon: "/CodeChirp.png",
    data: { url: click_action }
  });
});

