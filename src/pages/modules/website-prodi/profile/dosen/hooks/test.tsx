import { getToken, messaging } from '@/provider/firebase.tsx'

const isDev = import.meta.env.DEV

export async function requestNotificationPermission(): Promise<string | null> {
  // ===== DEVELOPMENT MODE =====
  // VersionError dari Vite HMR + Service Worker tidak bisa dihindari di dev.
  // Gunakan mock token agar console bersih dan flow testing tetap bisa diuji.
  if (isDev) {
    try { Notification.requestPermission() } catch { /* noop */ }

    // Coba dapatkan real token, ignore kalau gagal
    if (messaging) {
      try {
        const token = await getToken(messaging, {
          vapidKey:
            'BEnuygbCW1tNm2_r-Eo1jDVFV_dbrYwDWMorMqaBkFWrrzlOfQIMXH1mToxVgfiaKmnSiW_fWgSPTE6HxuWMP00',
        })
        if (token) return token
      } catch {
        // ignore VersionError di Vite dev
      }
    }

    return 'mock-fcm-token-dev'
  }

  // ===== PRODUCTION MODE =====
  // Tidak ada Vite HMR, tidak ada VersionError. Firebase getToken berjalan normal.
  if (!messaging) return null

  try {
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') return null

    const token = await getToken(messaging, {
      vapidKey:
        'BEnuygbCW1tNm2_r-Eo1jDVFV_dbrYwDWMorMqaBkFWrrzlOfQIMXH1mToxVgfiaKmnSiW_fWgSPTE6HxuWMP00',
    })

    return token || null
  } catch {
    return null
  }
}
