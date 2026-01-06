import { Outlet } from 'react-router-dom'
import { HeaderProdi } from './header'
import { SidebarProdi } from './sidebar.tsx'
import { useState } from 'react'

export default function MainLayoutProdi() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <div className="h-screen flex flex-col bg-[#F8FFF9]">
        <HeaderProdi collapsed={collapsed} setCollapsed={setCollapsed} />

        <div className="flex flex-1 overflow-hidden">
          <SidebarProdi collapsed={collapsed} />

          <main className="flex-1 overflow-auto p-4">
            <Outlet />
          </main>
        </div>

        <footer className="text-center py-2 text-xs text-gray-400 border-t">
          Admin Website © 2025
        </footer>
      </div>
    </>
  )
}
