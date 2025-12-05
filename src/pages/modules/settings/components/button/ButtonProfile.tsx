import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FaUserCircle } from 'react-icons/fa'
import type { User } from '../layout/hooks/getProfile'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, LogOut, User2 } from 'lucide-react'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
interface Props {
  profileUser?: User
}
const ButtonProfile = ({ profileUser }: Props) => {
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
          <img src={profileUser?.gambar} className='size-8 rounded-full' alt="" />
          <span className="text-sm font-medium text-gray-700">{profileUser?.nama_lengkap}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-fit space-y-2 p-0">
        <Link
          to={'/modules/dashboard/profile'}
          className="flex gap-2 hover:bg-gray-200 px-4 py-2 items-center"
        >
          <User2 className="text-primary" size={24} />
          Lihat Profile
        </Link>
        <Link
          to={'/modules/dashboard/change-password'}
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
