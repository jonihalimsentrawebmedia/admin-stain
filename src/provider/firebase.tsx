// lib/firebase/client.ts
import { getApps, initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize messaging only in browser
export const messaging = typeof window !== 'undefined' ? getMessaging(firebaseApp) : null

export { getToken, onMessage }
