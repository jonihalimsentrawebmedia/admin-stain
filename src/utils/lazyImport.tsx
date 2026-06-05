import { Suspense, type ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

/**
 * Loading component untuk fallback Suspense
 */
export function PageLoader({ message = 'Memuat halaman...' }: { message?: string }) {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
    </div>
  )
}

/**
 * Layout wrapper dengan Suspense untuk route modules
 * Ditempatkan di route parent, semua child route otomatis ter-catch oleh Suspense
 */
export function SuspenseLayout({ children }: { children?: ReactNode }) {
  return (
    <Suspense fallback={<PageLoader />}>
      {children ?? <Outlet />}
    </Suspense>
  )
}
