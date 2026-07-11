import { Outlet } from 'react-router-dom'
import { HeaderProdi } from './header'
import { SidebarProdi } from './sidebar.tsx'
import { useEffect, useState } from 'react'
import { useMobile } from '@/utils/useMobile.tsx'

export default function MainLayoutProdi() {
  const { isMobile } = useMobile()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    if (isMobile) setCollapsed(true)
    else setCollapsed(false)
  }, [isMobile])

  return (
    <>
      <div className="h-screen flex flex-col bg-[#F8FFF9]">
        <HeaderProdi collapsed={collapsed} setCollapsed={setCollapsed} />

        <div className="flex flex-1 overflow-hidden">
          <SidebarProdi collapsed={collapsed} isMobile={isMobile} setCollapsed={setCollapsed} />

          <main className="flex-1 overflow-auto">
            <div className="p-4 min-h-[calc(100vh-135px)]">
              <Outlet />
            </div>
            <footer className={'bg-white shadow mt-5 text-center border'}>
              Admin Website © {new Date().getFullYear()}
            </footer>
          </main>
        </div>

        {/*<footer className="text-center py-2 text-xs text-gray-400 border-t">*/}
        {/*  Admin Website © 2025*/}
        {/*</footer>*/}
      </div>
    </>
  )
}
