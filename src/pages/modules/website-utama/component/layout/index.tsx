import { Outlet } from 'react-router-dom'
import { Header } from './header'
import { Sidebar } from './sidebar.tsx'
import { useState } from 'react'

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="h-screen flex flex-col bg-[#F8FFF9]">
      <Header collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar collapsed={collapsed} />

        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>

      <footer className="text-center py-2 text-xs text-gray-400 border-t">
        Admin Website © 2025
      </footer>
    </div>
  )
}
