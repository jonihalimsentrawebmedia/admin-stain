import { Link, Outlet } from 'react-router-dom'
import { SideNavEOffice } from './sideNav.tsx'
import { Button } from '@/components/ui/button.tsx'
import { ArrowLeft } from 'lucide-react'

export default function MainLayoutEOffice() {
  return (
    <>
      <div className="h-screen flex flex-col bg-[#F8FFF9]">
        <div className="flex flex-1 overflow-hidden">
          <SideNavEOffice />

          <main className="flex-1 overflow-auto relative">
            <div
              className={
                'w-full bg-white shadow p-4 sticky z-50 flex items-center justify-end left-0 top-0'
              }
            >
              <Link to={'/modules'}>
                <Button className={'text-white'}>
                  <ArrowLeft className={'size-4'} />
                  Kembali Ke Daftar Module
                </Button>
              </Link>
            </div>
            <div className="p-4 min-h-[calc(100vh-118px)]">
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
