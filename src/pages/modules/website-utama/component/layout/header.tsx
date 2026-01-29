import type { IModulesList } from '@/pages/modules/interface'
import { RiMenuLine } from 'react-icons/ri'
import React from 'react'
import { UseGetUserProfile } from '@/pages/modules/settings/components/layout/hooks/getProfile.tsx'
import { ButtonSession } from '@/pages/modules/website-utama/component/buttonSession'
import ButtonProfile from '@/pages/modules/settings/components/button/ButtonProfile.tsx'
import { Link } from 'react-router-dom'
import { NotificationList } from '@/pages/modules/website-utama/component/layout/notification'

interface Props {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export function Header(props: Props) {
  const { collapsed, setCollapsed } = props

  const localStorage = window.localStorage.getItem('module')
  const module: IModulesList = JSON.parse(localStorage || '{}')

  const { profileUser } = UseGetUserProfile()

  return (
    <header className="p-2 lg:py-4 lg:px-5 bg-[#E9FFF1] border-b border-green-200 flex flex-col lg:flex-row lg:items-center lg:justify-between w-full">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to={'/modules'} className={'lg:p-2'}>
            <img src={module?.gambar} alt="gambar" className="size-10" />
          </Link>
          <div className="flex flex-col">
            <p className="text-xs lg:text-sm font-semibold text-primary">
              Manajemen Pengelolaan Website
            </p>
            <p className="text-sm lg:text-2xl font-semibold">{module?.nama_module}</p>
          </div>
        </div>

        <div className={'flex items-center gap-2.5 lg:hidden'}>
          <Link to={'/modules'}>
            <IconModules />
          </Link>
          <button onClick={() => setCollapsed(!collapsed)}>
            <RiMenuLine className={'size-5'} />
          </button>
        </div>
      </div>

      <div className="lg:flex items-center gap-5 hidden">
        <div className="flex items-center gap-4">
          <div className="text-sm whitespace-nowrap text-gray-600">Ganti Data:</div>
          <ButtonSession />
        </div>
        <Link to={'/modules'}>
          <IconModules />
        </Link>
        <div className="flex items-center gap-4 justify-end w-full">
          <NotificationList />
          <ButtonProfile module={module} profileUser={profileUser} />
          <button onClick={() => setCollapsed(!collapsed)}>
            <RiMenuLine />
          </button>
        </div>
      </div>
    </header>
  )
}

export function IconModules() {
  return (
    <svg
      className={'lg:size-10 size-8'}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" fill="white" />
      <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" stroke="#1BB869" />
      <path
        d="M30 20C30 14.48 25.52 10 20 10C14.48 10 10 14.48 10 20C10 25.52 14.48 30 20 30C25.52 30 30 25.52 30 20ZM23 14.5L26.15 17.65C26.35 17.85 26.35 18.16 26.15 18.36L23 21.5V19H19V17H23V14.5ZM17 25.5L13.85 22.35C13.65 22.15 13.65 21.84 13.85 21.64L17 18.5V21H21V23H17V25.5Z"
        fill="#1BB869"
      />
    </svg>
  )
}
