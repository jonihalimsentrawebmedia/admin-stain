import { Outlet } from 'react-router-dom'
import { Header } from './header'
import { useState } from 'react'

export default function MainLayoutEditor() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <div className="h-screen flex flex-col bg-[#F8FFF9]">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />

        <div className="flex flex-1 overflow-hidden relative">
          {!collapsed && (
            <div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setCollapsed(true)}
            />
          )}

          {/*<Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />*/}

          <main className="flex-1 overflow-auto p-3 sm:p-4 container mx-auto">
            <Outlet />
          </main>
        </div>

        <footer className="text-center py-2 text-xs text-gray-400 border-t">
          Admin Website &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </>
  )
}
