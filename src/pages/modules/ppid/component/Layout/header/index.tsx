import type { IModulesList } from '@/pages/modules/interface'
import { Link, useNavigate } from 'react-router-dom'
import { IconModules } from '@/pages/modules/website-prodi/components/layout/header.tsx'
import useGetProfile from '@/pages/modules/settings/dashboard/profile/controller/useGetProfile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Lock, LogOut, User2 } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { urlStringEncode } from '@/utils/helper'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { Skeleton } from '@/components/ui/skeleton'
import HeaderMenuMobile from './HeaderMenuMobile'
import { UseGetPPIDSession } from '../../../hooks'

export const HeaderLayoutPPID = () => {
  const localStorage = window.localStorage.getItem('module')
  const module: IModulesList = JSON.parse(localStorage || '{}')

  const { session } = UseGetPPIDSession()
  const { loading, profile } = useGetProfile()
  const navigate = useNavigate()

  const handleLogOut = () => {
    toast.success('Anda Berhasil Keluar')
    Cookies.remove('token')
    navigate('/login')
  }
  return (
    <>
      <div className={'bg-[#0F4D30] max-w-[1920px] w-full'}>
        <div
          className={`w-full mx-auto max-w-7xl px-4 py-2 bg-[url(/Background.png)] bg-cover bg-center`}
        >
          <div className="w-full flex gap-4 items-center justify-between  max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <img
                src={module?.gambar}
                alt="gambar"
                className={'size-20 w-20 object-cover rounded-full'}
              />
              <div className={'flex flex-col'}>
                <p className="text-2xl font-semibold text-white">{session?.nama_unit}</p>
                <p className="text-white text-xs">{session?.nama_universitas}</p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <HeaderMenuMobile />
              
              <Link to={'/modules'}>
                <IconModules />
              </Link>

              {loading ? (
                <Skeleton className="w-32 h-[50px]" />
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="bg-white px-3 py-1.5 rounded-lg flex gap-2 items-center">
                      <Avatar className={'size-7'}>
                        <AvatarImage
                          src={profile?.gambar}
                          alt="@shadcn"
                          className={'object-cover'}
                        />
                        <AvatarFallback>
                          <User2 className="text-gray-300" />
                        </AvatarFallback>
                      </Avatar>
                      <div className={'flex flex-col gap-1'}>
                        <p className={'text-xs whitespace-nowrap'}>{profile?.nama_lengkap}</p>
                        <div className="text-primary text-xs">{profile?.jabatan}</div>
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-fit space-y-2 p-0">
                    <Link
                      to={`/modules/${urlStringEncode(module?.controller ?? '')}/dashboard/user-profile`}
                      className="flex gap-2 hover:bg-gray-200 px-4 py-2 items-center"
                    >
                      <User2 className="text-primary" size={24} />
                      Lihat Profile
                    </Link>
                    <Link
                      to={`/modules/${urlStringEncode(module?.controller ?? '')}/dashboard/change-password`}
                      className="flex px-4 py-2 hover:bg-gray-200 gap-2 items-center"
                    >
                      <Lock className="text-yellow-500" size={24} />
                      Ganti Password
                    </Link>
                    <div
                      onClick={handleLogOut}
                      className="flex cursor-pointer text-red-500 px-4 py-2 hover:bg-gray-200 gap-2 items-center"
                    >
                      <LogOut className="text-red-500" size={24} />
                      Log Out
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
