import { Outlet } from 'react-router-dom'
import { HeaderSIMRS } from './header.tsx'
import { useState } from 'react'
import { SideNavSIMRS } from './sideNav.tsx'

export default function MainLayoutSIMRS() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <div className="h-screen flex flex-col bg-[#F8FFF9]">
        <HeaderSIMRS collapsed={collapsed} setCollapsed={setCollapsed} />

        <div className="flex flex-1 overflow-hidden">
          <SideNavSIMRS collapsed={collapsed} />

          <main className="flex-1 overflow-auto">
            <div className="p-4 min-h-[calc(100vh-135px)]">
              <Outlet/>
            </div>
            <footer className={'bg-white shadow mt-5 text-center border'}>Admin SIM-RS © {new Date().getFullYear()}</footer>
          </main>
        </div>
      </div>
    </>
  )
}
