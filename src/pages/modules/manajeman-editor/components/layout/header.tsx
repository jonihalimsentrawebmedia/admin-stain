import { IoMdNotificationsOutline } from 'react-icons/io'
import type { IModulesList } from '@/pages/modules/interface'
import { RiMenuLine } from 'react-icons/ri'
import React from 'react'
import { UseGetUserProfile } from '@/pages/modules/settings/components/layout/hooks/getProfile.tsx'
import ButtonProfile from '@/pages/modules/settings/components/button/ButtonProfile.tsx'
import { Link } from 'react-router-dom'
import { ButtonSessionEditor } from '@/pages/modules/manajeman-editor/components/buttonSession'
import { UseGetSessionEditor } from '@/pages/modules/manajeman-editor/session'

interface Props {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export function Header(props: Props) {
  const { collapsed, setCollapsed } = props

  const localStorage = window.localStorage.getItem('module')
  const module: IModulesList = JSON.parse(localStorage || '{}')

  const { profileUser } = UseGetUserProfile()
  const { session } = UseGetSessionEditor()

  return (
    <header className="py-3 px-3 sm:py-4 sm:px-28 bg-[#E9FFF1] border-b border-green-200 flex items-center justify-between w-full gap-2">
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <Link to={'/modules'} className={'p-1.5 sm:p-2 shrink-0'}>
          <img src={module?.gambar} alt="gambar" className="size-8 sm:size-10" />
        </Link>
        <div className="flex flex-col min-w-0">
          <p className="text-xs sm:text-sm font-semibold text-primary truncate">Manajemen Editor</p>
          <p className="text-base sm:text-2xl font-semibold truncate">{session?.nama_universitas}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 sm:gap-5 shrink-0">
        <div className="hidden sm:flex items-center gap-4">
          <div className="text-sm text-gray-600 whitespace-nowrap">Ganti Data:</div>
          <ButtonSessionEditor />
        </div>
        <a href={'/modules'} className="hidden sm:block">
          <IconModules />
        </a>
        <div className="flex items-center gap-1 sm:gap-4">
          <IoMdNotificationsOutline className="text-lg sm:text-xl text-green-700 cursor-pointer" />
          <div className="hidden sm:block">
            <ButtonProfile module={module} profileUser={profileUser} />
          </div>
          <button onClick={() => setCollapsed(!collapsed)} className="p-1.5">
            <RiMenuLine className="size-5 sm:size-6" />
          </button>
        </div>
      </div>
    </header>
  )
}

export function IconModules() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" fill="white" />
      <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" stroke="#1BB869" />
      <path
        d="M30 20C30 14.48 25.52 10 20 10C14.48 10 10 14.48 10 20C10 25.52 14.48 30 20 30C25.52 30 30 25.52 30 20ZM23 14.5L26.15 17.65C26.35 17.85 26.35 18.16 26.15 18.36L23 21.5V19H19V17H23V14.5ZM17 25.5L13.85 22.35C13.65 22.15 13.65 21.84 13.85 21.64L17 18.5V21H21V23H17V25.5Z"
        fill="#1BB869"
      />
    </svg>
  )
}
