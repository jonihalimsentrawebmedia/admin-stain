import type { IModulesList } from '@/pages/modules/interface'
import { UseGetInstitutionSession } from '@/pages/modules/website-lembaga/hooks'
import { Link, useNavigate } from 'react-router-dom'
import { IconModules } from '@/pages/modules/website-prodi/components/layout/header.tsx'
import { HeaderMenu } from '@/pages/modules/website-lembaga/component/Layout/header/HeaderMenu.tsx'
import useGetProfile from '@/pages/modules/settings/dashboard/profile/controller/useGetProfile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Lock, LogOut, User2 } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { urlStringEncode } from '@/utils/helper'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { Skeleton } from '@/components/ui/skeleton'

export const HeaderLayoutInstitution = () => {
  const localStorage = window.localStorage.getItem('module')
  const module: IModulesList = JSON.parse(localStorage || '{}')

  const { session } = UseGetInstitutionSession()
  const { loading, profile } = useGetProfile()
  const navigate = useNavigate()

  const handleLogOut = () => {
    toast.success('Anda Berhasil Keluar')
    Cookies.remove('token')
    navigate('/login')
  }
  return (
    <>
      <div className={'bg-[#0F4D30]'}>
        <div
          className={`w-full mx-auto max-w-[1920px] px-4 py-2 bg-[url(/Background.png)] bg-cover bg-center`}
        >
          <div className="w-full flex gap-4 items-center justify-between  max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <img
                src={module?.gambar}
                alt="gambar"
                className={'size-20 w-20 object-cover rounded-full'}
              />
              <div className={'flex flex-col'}>
                <p className="text-2xl font-semibold text-white">{session?.nama_lembaga}</p>
                <p className="text-white">{session?.nama_universitas}</p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <Link to={'/modules'}>
                <IconModules />
              </Link>

              {loading ? (
                <Skeleton className="w-32 h-[50px]" />
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="bg-white px-3 py-1.5 rounded-lg flex gap-2 items-center">
                      <Avatar>
                        <AvatarImage
                          src={profile?.gambar}
                          alt="@shadcn"
                          className={'object-cover'}
                        />
                        <AvatarFallback>
                          <User2 className="text-gray-300" />
                        </AvatarFallback>
                      </Avatar>
                      <div>{profile?.nama_lengkap}</div>
                      <div className="text-primary text-xs">{profile?.jabatan}</div>
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
      <HeaderMenu />
    </>
  )
}
