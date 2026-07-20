import type { IModulesList } from '@/pages/modules/interface'
import { RiMenuLine } from 'react-icons/ri'
import React from 'react'
import ButtonProfile from '@/pages/modules/settings/components/button/ButtonProfile.tsx'
import { Link } from 'react-router-dom'
import { DialogSessionSIMRS } from '../../select-session/dialog-session'
import { UseGetUserSIMRSProfile } from '@/pages/modules/SIM-RS/component/user-profile'

interface Props {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export function HeaderSIMRS(props: Props) {
  const { collapsed, setCollapsed } = props

  const localStorage = window.localStorage.getItem('module')
  const module: IModulesList = JSON.parse(localStorage || '{}')

  const { profile } = UseGetUserSIMRSProfile()

  return (
    <header className="py-2 sm:py-4 px-3 sm:px-5 bg-[#E9FFF1] border-b border-green-200 flex items-center justify-between w-full">
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <Link to={'/modules'}>
          <img
            src={module?.gambar}
            alt="gambar"
            className="size-10 sm:size-14 object-cover shrink-0"
          />
        </Link>
        <div className="flex flex-col min-w-0">
          <p className="hidden sm:block text-xs sm:text-sm font-semibold text-primary truncate">
            Sistem Informasi Manajemen Rumah Sakit
          </p>
          <p className="text-lg sm:text-2xl font-semibold truncate">SIM-RS</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-5 shrink-0">
        <Link to={'/modules'} className="hidden sm:block">
          <IconModules />
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <DialogSessionSIMRS />
          <ButtonProfile module={module} profileUser={profile as any} />
          <button onClick={() => setCollapsed(!collapsed)} className="text-xl sm:text-base">
            <RiMenuLine />
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
