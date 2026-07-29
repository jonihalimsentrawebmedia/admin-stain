import { Outlet } from 'react-router-dom'
import { HeaderPMB } from './header.tsx'
import { useState } from 'react'
import { SideNavPMB } from './sideNav.tsx'

export default function MainLayoutPMB() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <div className="h-screen flex flex-col bg-[#F8FFF9]">
        <HeaderPMB collapsed={collapsed} setCollapsed={setCollapsed} />

        <div className="flex flex-1 overflow-hidden">
          <SideNavPMB collapsed={collapsed} setCollapsed={setCollapsed} />

          <main className="flex-1 overflow-auto">
            <div className="p-2 sm:p-4 min-h-[calc(100vh-135px)]">
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
