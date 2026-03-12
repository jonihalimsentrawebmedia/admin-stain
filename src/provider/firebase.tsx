// lib/firebase/client.ts
import { getApps, initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyD83RUcIXok5MJg-rWqm2KibdsY-u-bDJo',
  authDomain: 'dev-fcm-cbeb6.firebaseapp.com',
  projectId: 'dev-fcm-cbeb6',
  storageBucket: 'dev-fcm-cbeb6.firebasestorage.app',
  messagingSenderId: '255076626826',
  appId: '1:255076626826:web:6c4e34a5a975e261185873',
  measurementId: 'G-SPTLJF3XLM',
}

const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize messaging only in browser
export const messaging = typeof window !== 'undefined' ? getMessaging(firebaseApp) : null

export { getToken, onMessage }
