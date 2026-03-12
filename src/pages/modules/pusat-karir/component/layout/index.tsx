import { Outlet } from 'react-router-dom'
import { HeaderCarrierCenter } from './header.tsx'
import { useState } from 'react'
import { SideNavUnit } from './sideNav.tsx'

export default function MainLayoutCarrierCenter() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <div className="h-screen flex flex-col bg-[#F8FFF9]">
        <HeaderCarrierCenter collapsed={collapsed} setCollapsed={setCollapsed} />

        <div className="flex flex-1 overflow-hidden">
          <SideNavUnit collapsed={collapsed} />

          <main className="flex-1 overflow-auto p-4">
            <Outlet />
          </main>
        </div>

        <footer className="text-center py-2 text-xs text-gray-400 border-t">
          Admin Website © {new Date().getFullYear()}
        </footer>
      </div>
    </>
  )
}
