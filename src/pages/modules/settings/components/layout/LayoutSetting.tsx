import { useEffect, useState } from 'react'
import { Book, ChevronDown, Menu } from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { CiGrid42 } from 'react-icons/ci'
import { IoSchool } from 'react-icons/io5'
import { MdBusiness, MdBusinessCenter, MdPeople, MdRoomPreferences } from 'react-icons/md'
import { IconSettings } from '../icon'
import { FaGear } from 'react-icons/fa6'
import { UseGetUserProfile } from '@/pages/modules/settings/components/layout/hooks/getProfile.tsx'
import ButtonProfile from '../button/ButtonProfile'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarSmall, setSideBarSmall] = useState(false)
  const location = useLocation()
  const { pathname } = location
  const menu = [
    {
      link: '/modules/settings/dashboard',
      label: 'Dashboard',
      icon: <CiGrid42 size={24} />,
      children: [],
    },
    {
      link: '/modules/settings/module',
      label: 'Modul',
      icon: <Book size={24} />,
      children: [],
    },
    {
      link: '/modules/settings/domain',
      label: 'Pengaturan Domain',
      icon: <FaGear size={24} />,
      children: [],
    },
    {
      link: '/modules/settings/main-data-university',
      label: 'Data Utama Universitas',
      icon: <IoSchool size={24} />,
      children: [],
    },
    {
      link: '/modules/settings/faculty',
      label: 'Data Fakultas',
      icon: <MdBusiness size={24} />,
      children: [],
    },
    {
      link: '/modules/settings/prodi',
      label: 'Data Prodi',
      icon: <MdBusiness size={24} />,
      children: [],
    },
    {
      link: '/modules/settings/unit',
      label: 'Data Unit',
      icon: <MdBusinessCenter size={24} />,
      children: [],
    },
    {
      link: '/modules/settings/institution',
      label: 'Data Lembaga',
      icon: <MdBusinessCenter size={24} />,
      children: [],
    },
    {
      link: '/modules/settings/management-users',
      label: 'Manajemen User',
      icon: <MdPeople size={24} />,
      children: [
        {
          link: '/modules/settings/management-users/level',
          label: 'Level User',
        },
        {
          link: '/modules/settings/management-users/users',
          label: 'Data User',
        },
        {
          link: '/modules/settings/management-users/history',
          label: 'Histori Login',
        },
      ],
    },
    {
      link: '/modules/settings/reference',
      label: 'Tabel Referensi',
      icon: <MdRoomPreferences size={24} />,
      children: [
        {
          link: '/modules/settings/reference/news-category',
          label: 'Kategori Berita',
        },
        {
          link: '/modules/settings/reference/group-rank',
          label: 'Pangkat Golongan',
        },
        {
          link: '/modules/settings/reference/academic-rank',
          label: 'Pangkat Akademik',
        },
      ],
    },
  ]

  const { profileUser } = UseGetUserProfile()

  return (
    <div className="flex flex-col h-screen overflow-hidden! bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between bg-green-50 px-4 sm:px-6 py-3 border-b border-green-100">
        <div className="flex items-center gap-4">
          <IconSettings />
          <div>
            <h1 className="text-xs sm:text-sm text-green-700 font-medium">
              Manajemen Pengelolaan Website
            </h1>
            <h2 className="text-base sm:text-lg font-semibold text-green-900">Pengaturan</h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-green-700 sm:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-6 h-6" />
          </button>
      <ButtonProfile profileUser={profileUser}/>
          <button
            className="text-green-700 hidden sm:block"
            onClick={() => setSideBarSmall(!sidebarSmall)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden!">
        {/* Sidebar */}
        <aside
          className={`fixed sm:static z-50  top-0 left-0 h-full overflow-y-auto sm:h-auto border border-green-700 bg-green-700 text-white flex flex-col justify-between
    ${sidebarSmall ? 'w-16' : 'w-64'}
    transform transition-all duration-300 ease-in-out
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
  `}
        >
          <div className=" space-y-1 overflow-y-auto pb-8 pt-8 sm:mt-0">
            {menu.map((item) => (
              <SidebarItem
                icon={item.icon}
                label={item.label}
                link={item.link}
                key={item.link}
                active={pathname.includes(item.link)}
                hiddenLabel={sidebarSmall}
                path={pathname}
                children={item.children}
                dropdown={item.children.length !== 0}
              />
            ))}
          </div>
        </aside>

        {/* Overlay untuk mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 sm:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1  bg-white p-4 sm:p-6 overflow-y-auto rounded-tr-lg">
          <div className="h-full  rounded-lg pb-32  text-gray-400">
            <div className=" pb-20">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      <footer className="text-center bg-white w-full text-primary text-xs z-50 fixed bottom-0  py-2 border-t border-green-400">
        Admin Website © 2025
      </footer>
    </div>
  )
}

function SidebarItem({ icon, label, active, dropdown, link, hiddenLabel, children, path }: any) {
  const [open, setOpen] = useState(false)
  const isActive = active || open
  useEffect(() => {
    if (active) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [path])
  return (
    <>
      {children.length == 0 ? (
        <Link
          to={link}
          className={`flex items-center gap-2 px-3 py-2 cursor-pointer text-sm font-medium
      ${active ? 'border-l-white bg-[#F5FFFA] text-primary' : 'hover:bg-green-600 text-green-50'}`}
        >
          <div className="flex items-center gap-2 flex-1">
            {icon}
            {!hiddenLabel && <span>{label}</span>}
          </div>
          {dropdown && <ChevronDown size={14} className="opacity-70" />}
        </Link>
      ) : (
        <div
          className={`flex flex-col  gap-2 px-3  cursor-pointer text-sm font-medium
      ${isActive ? 'border-l-white bg-[#F5FFFA] text-primary' : ' text-green-50'}`}
        >
          <div
            onClick={() => {
              setOpen(!open)
            }}
            className="flex py-2   gap-4 justify-between"
          >
            <div className="flex  items-center gap-2 flex-1">
              {icon}
              {!hiddenLabel && <span>{label}</span>}
            </div>
            {dropdown && <ChevronDown size={14} className="opacity-70" />}
          </div>
          {open && (
            <div
              className={`   mb-4 transition-all ease-in-out duration-500  flex ml-6 flex-col gap-2 border-l ${
                isActive ? 'border-l-primary' : 'border-l-white '
              }`}
            >
              {children.map((row: any) => (
                <div className="flex  items-end gap-1">
                  <div className={`w-2 h-px  ${isActive ? 'bg-primary' : 'bg-white'}`}></div>
                  <Link
                    to={row.link}
                    key={row.link}
                    className={`flex gap-2 relative top-2 w-full   items-end ${
                      isActive
                        ? `border-l-white bg-[#F5FFFA] ${
                            path.includes(row.link) ? 'text-primary' : 'text-gray-500'
                          } hover:text-primary `
                        : 'hover:text-primary'
                    }`}
                  >
                    <div className="">{row.label}</div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
