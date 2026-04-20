import { Outlet } from 'react-router-dom'
import { HeaderFaculty } from './header.tsx'
import { useState } from 'react'
import { SideNavFaculty } from './sideNav.tsx'

export default function MainLayoutFaculty() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <div className="h-screen flex flex-col bg-[#F8FFF9]">
        <HeaderFaculty collapsed={collapsed} setCollapsed={setCollapsed} />

        <div className="flex flex-1 overflow-hidden">
          <SideNavFaculty collapsed={collapsed} />

          <main className="flex-1 overflow-auto">
            <div className="p-4 min-h-[calc(100vh-135px)]">
              <Outlet/>
            </div>
            <footer className={'bg-white shadow mt-5 text-center border'}>Admin Website © {new Date().getFullYear()}</footer>
          </main>
        </div>

        {/*<footer className="text-center py-2 text-xs text-gray-400 border-t">*/}
        {/*  Admin Website © {new Date().getFullYear()}*/}
        {/*</footer>*/}
      </div>
    </>
  )
}
