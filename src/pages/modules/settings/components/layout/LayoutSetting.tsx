import React, { useEffect, useState } from 'react'
import { Book, ChevronDown, Menu } from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { CiGrid42 } from 'react-icons/ci'
import { IoSchool } from 'react-icons/io5'
import { MdBackup, MdBusiness, MdBusinessCenter, MdPeople, MdRoomPreferences } from 'react-icons/md'
import { IconSettings } from '../icon'
import { FaGear } from 'react-icons/fa6'
import { UseGetUserProfile } from '@/pages/modules/settings/components/layout/hooks/getProfile.tsx'
import ButtonProfile from '../button/ButtonProfile'
import { IconModules } from '@/pages/modules/website-utama/component/layout/header'
import type { IModulesList } from '@/pages/modules/interface'

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
          link: '/modules/settings/reference/impact-innovation',
          label: 'Kategori Inovasi Berdampak',
        },
        {
          link: '/modules/settings/reference/group-rank',
          label: 'Pangkat Golongan',
        },
        {
          link: '/modules/settings/reference/academic-rank',
          label: 'Pangkat Akademik',
        },
        {
          link: '/modules/settings/reference/structural-official',
          label: 'Jabatan Struktural',
        },
        {
          link: '/modules/settings/reference/educational-level',
          label: 'Jenjang Pendidikan',
        },
        {
          link: '/modules/settings/reference/countries',
          label: 'Negara',
        },
        {
          link: '/modules/settings/reference/province',
          label: 'Provinsi',
        },
        {
          link: '/modules/settings/reference/regency',
          label: 'Kabupaten',
        },
      ],
    },
    {
      link: '/modules/settings/identity-menu',
      label: 'Menu Identitas',
      icon: <MdBusinessCenter size={24} />,
      children: [],
    },
    {
      link: '/modules/settings/backup-data',
      label: 'Backup Data',
      icon: <MdBackup size={24} />,
      children: [],
    },
  ]

  const { profileUser } = UseGetUserProfile()
  const localStorage = window.localStorage.getItem('module')
  const module: IModulesList = JSON.parse(localStorage || '{}')

  return (
    <div className="flex flex-col h-dvh bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between bg-green-50 px-3 sm:px-6 py-2 sm:py-3 border-b border-green-100 shrink-0">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <button
            className="text-green-700 sm:hidden shrink-0"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="size-6" />
          </button>
          <IconSettings />
          <div className="min-w-0">
            <h1 className="text-[10px] sm:text-sm text-green-700 font-medium truncate">
              Manajemen Pengelolaan Website
            </h1>
            <h2 className="text-sm sm:text-lg font-semibold text-green-900 truncate">Pengaturan</h2>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link to={'/modules'}>
            <IconModules />
          </Link>
          <ButtonProfile profileUser={profileUser} module={module} />
          <button
            className="text-green-700 hidden sm:block shrink-0"
            onClick={() => setSideBarSmall(!sidebarSmall)}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed sm:static z-40 top-0 left-0 h-full overflow-y-auto sm:h-auto border-r border-green-700 bg-green-700 text-white flex flex-col justify-between
    ${sidebarSmall ? 'w-16' : 'w-60'}
    transform transition-all duration-300 ease-in-out
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
  `}
        >
          <div className="space-y-1 overflow-y-auto pb-4 sm:pb-6 pt-16 sm:pt-4 px-2 sm:px-3">
            {menu.map((item, index) => (
              <SidebarItem
                icon={item.icon}
                label={item.label}
                link={item.link}
                key={item.link + index}
                active={pathname.includes(item.link)}
                hiddenLabel={sidebarSmall}
                path={pathname}
                children={item.children}
                dropdown={item.children.length !== 0}
                onNavigate={() => setSidebarOpen(false)}
              />
            ))}
          </div>
        </aside>

        {/* Overlay untuk mobile — geser sidebar agar tidak nutup header */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 sm:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 bg-white p-3 sm:p-6 overflow-y-auto">
          <div className="min-h-full pb-24">
            <Outlet />
          </div>
        </main>
      </div>

      <footer className="text-center bg-white w-full text-primary text-[10px] sm:text-xs z-50 fixed bottom-0 py-1.5 sm:py-2 border-t border-green-400 shrink-0">
        Admin Website © 2025
      </footer>
    </div>
  )
}

function SidebarItem({
  icon,
  label,
  active,
  dropdown,
  link,
  hiddenLabel,
  children,
  path,
  onNavigate,
}: any) {
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
    <React.Fragment key={link + label}>
      {children.length == 0 ? (
        <Link
          to={link}
          onClick={onNavigate}
          className={`flex items-center gap-2 px-2 sm:px-3 py-2 cursor-pointer text-xs sm:text-sm font-medium rounded-md
      ${active ? 'bg-[#F5FFFA] text-primary' : 'hover:bg-green-600 text-green-50'}`}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {icon}
            {!hiddenLabel && <span className="truncate">{label}</span>}
          </div>
          {dropdown && <ChevronDown size={14} className="opacity-70 shrink-0" />}
        </Link>
      ) : (
        <div
          className={`flex flex-col gap-1 px-2 sm:px-3 py-1.5 cursor-pointer text-xs sm:text-sm font-medium rounded-md
      ${isActive ? 'bg-[#F5FFFA] text-primary' : 'text-green-50'}`}
        >
          <div
            onClick={() => setOpen(!open)}
            className="flex py-1.5 gap-2 justify-between items-center"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {icon}
              {!hiddenLabel && <span className="truncate">{label}</span>}
            </div>
            {dropdown && (
              <ChevronDown
                size={14}
                className={`opacity-70 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
              />
            )}
          </div>
          {open && (
            <div className="mb-2 flex ml-5 flex-col gap-1 border-l border-green-500 pl-2">
              {children.map((row: any, index: number) => (
                <Link
                  key={index}
                  to={row.link}
                  onClick={onNavigate}
                  className={`block px-2 py-1.5 rounded text-xs ${
                    path.includes(row.link)
                      ? 'text-primary font-medium'
                      : 'text-green-200 hover:text-white'
                  }`}
                >
                  {row.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  )
}
