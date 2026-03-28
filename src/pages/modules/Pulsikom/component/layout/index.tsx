import { Outlet } from 'react-router-dom'
import { HeaderPulsikom } from './header.tsx'
import { useState } from 'react'
import { SideNavPulsikom } from './sideNav.tsx'

export default function MainLayoutPulsikom() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <div className="h-screen flex flex-col bg-[#F8FFF9]">
        <HeaderPulsikom collapsed={collapsed} setCollapsed={setCollapsed} />

        <div className="flex flex-1 overflow-hidden">
          <SideNavPulsikom collapsed={collapsed} />

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
