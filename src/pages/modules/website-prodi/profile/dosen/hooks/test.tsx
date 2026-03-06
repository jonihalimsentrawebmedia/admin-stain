import { getToken, messaging } from '@/provider/firebase.tsx'

export async function requestNotificationPermission() {
  if (!messaging) return null

  try {
    // Request permission
    const permission = await Notification.requestPermission()

    if (permission !== 'granted') {
      console.log('Notification permission denied')
      return null
    }

    // Register service worker
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')

    // Get FCM token
    const token = await getToken(messaging, {
      vapidKey:
        'BEnuygbCW1tNm2_r-Eo1jDVFV_dbrYwDWMorMqaBkFWrrzlOfQIMXH1mToxVgfiaKmnSiW_fWgSPTE6HxuWMP00',
      serviceWorkerRegistration: registration,
    })

    if (!token) {
      console.log('Failed to get FCM token')
      return null
    }

    // Save token to your backend
    // await saveTokenToServer(token)

    return token
  } catch (error) {
    console.error('Error getting notification permission:', error)
    return null
  }
}

// async function saveTokenToServer(token: string) {
//   await fetch('/api/notifications/register-token', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ token }),
//   })
// }
