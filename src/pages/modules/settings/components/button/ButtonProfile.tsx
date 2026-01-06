import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, LogOut, User2 } from 'lucide-react'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { IModulesList } from '@/pages/modules/interface'
import { urlStringEncode } from '@/utils/helper.tsx'
import type { IUserProfile } from '@/pages/modules/website-utama/user-profile/data/types.ts'

interface Props {
  profileUser?: IUserProfile
  module?: IModulesList
}
const ButtonProfile = ({ profileUser, module }: Props) => {
  const navigate = useNavigate()
  const handleLogOut = () => {
    toast.success('Anda Berhasil Keluar')
    Cookies.remove('token')
    navigate('/login')
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="hidden sm:flex items-center gap-2">
          <Avatar>
            <AvatarImage src={profileUser?.gambar} alt="@shadcn" className={'object-cover'} />
            <AvatarFallback>
              <User2 className="text-gray-300" />
            </AvatarFallback>
          </Avatar>

          <span className="text-sm font-medium text-gray-700">{profileUser?.nama_lengkap}</span>
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
  )
}

export default ButtonProfile
