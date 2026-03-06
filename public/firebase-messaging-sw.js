// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js')
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js')

/* eslint-disable no-undef */
firebase.initializeApp({
  apiKey: 'AIzaSyD83RUcIXok5MJg-rWqm2KibdsY-u-bDJo',
  authDomain: 'dev-fcm-cbeb6.firebaseapp.com',
  projectId: 'dev-fcm-cbeb6',
  storageBucket: 'dev-fcm-cbeb6.firebasestorage.app',
  messagingSenderId: '255076626826',
  appId: '1:255076626826:web:6c4e34a5a975e261185873',
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  const title = 'Notification Baru'
  self.registration.showNotification(title, {
    body: payload?.notification?.body || 'Notifikasi baru dari Aplikasi',
    icon: '/icon.png',
  })
})
