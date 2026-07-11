import { Outlet } from 'react-router-dom'
import { HeaderUnit } from './header'
import { useState } from 'react'
import { SideNavUnit } from '@/pages/modules/website-unit/components/layout/sideNav.tsx'

export default function MainLayoutUnit() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <div className="h-screen flex flex-col bg-[#F8FFF9]">
        <HeaderUnit collapsed={collapsed} setCollapsed={setCollapsed} />

        <div className="flex flex-1 overflow-hidden relative">
          {!collapsed && (
            <div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setCollapsed(true)}
            />
          )}
          <SideNavUnit collapsed={collapsed} setCollapsed={setCollapsed} />

          <main className="flex-1 overflow-auto">
            <div className="p-3 sm:p-4 min-h-[calc(100vh-135px)]">
              <Outlet/>
            </div>
            <footer className={'bg-white shadow mt-5 text-center border text-sm py-2'}>
              Admin Website &copy; {new Date().getFullYear()}
            </footer>
          </main>
        </div>
      </div>
    </>
  )
}
