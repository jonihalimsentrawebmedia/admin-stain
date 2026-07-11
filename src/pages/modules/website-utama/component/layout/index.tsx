import { Outlet } from 'react-router-dom'
import { Header } from './header'
import { Sidebar } from './sidebar.tsx'
import { useEffect, useState } from 'react'
import { useMobile } from '@/utils/useMobile.tsx'

export default function MainLayout() {
  const { isMobile } = useMobile()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    if (isMobile) setCollapsed(true)
    else setCollapsed(false)
  }, [isMobile])

  return (
    <>
      <div className="h-screen flex flex-col bg-[#F8FFF9]">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar collapsed={collapsed} isMobile={isMobile} setCollapsed={setCollapsed} />

          <main className="flex-1 overflow-auto">
            <div className="p-4 min-h-[calc(100vh-135px)]">
              <Outlet />
            </div>
            <footer className={'bg-white shadow mt-5 text-center border'}>
              Admin Website © {new Date().getFullYear()}
            </footer>
          </main>
        </div>
      </div>
    </>
  )
}
