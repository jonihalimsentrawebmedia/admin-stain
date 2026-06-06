import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { HeaderEOffice } from './header'
import { SideNavEOffice } from './sideNav'

export default function MainLayoutEOffice() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="h-screen flex flex-col bg-[#F8FFF9]">
      <HeaderEOffice collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-1 overflow-hidden">
        <SideNavEOffice collapsed={collapsed} />

        <main className="flex-1 overflow-auto">
          <div className="p-4 min-h-[calc(100vh-135px)]">
            <Outlet />
          </div>
          <footer className="bg-white shadow mt-5 text-center border py-2 text-sm text-gray-500">
            Admin Website © {new Date().getFullYear()}
          </footer>
        </main>
      </div>
    </div>
  )
}
