import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IoMdNotificationsOutline } from 'react-icons/io'
import type { IModulesList } from '@/pages/modules/interface'
import { RiMenuLine } from 'react-icons/ri'
import React from 'react'
import { UseGetUserProfile } from '@/pages/modules/settings/components/layout/hooks/getProfile.tsx'
import { ButtonSession } from '@/pages/modules/website-utama/component/buttonSession'

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
    <header className="py-4 px-5 bg-[#E9FFF1] border-b border-green-200 flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <img src={module?.gambar} alt="gambar" className="size-14" />
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-primary">Manajemen Pengelolaan Website</p>
          <p className="text-2xl font-semibold">Website Utama</p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">Ganti Data:</div>
          <ButtonSession />
        </div>
        <div className="flex items-center gap-4">
          <IoMdNotificationsOutline className="text-xl text-green-700 cursor-pointer" />
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={profileUser?.gambar} />
              <AvatarFallback>AW</AvatarFallback>
            </Avatar>

            <span className="text-sm">{profileUser?.nama_lengkap}</span>
          </div>

          <button onClick={() => setCollapsed(!collapsed)}>
            <RiMenuLine />
          </button>
        </div>
      </div>
    </header>
  )
}
