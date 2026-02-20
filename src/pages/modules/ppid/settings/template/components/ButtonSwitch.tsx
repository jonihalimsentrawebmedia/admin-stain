import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { Skeleton } from '@/components/ui/skeleton'
import type { ThemaPPID } from '../model'

interface Props {
  data: ThemaPPID
  
}

const ButtonSwitch = ({ data,  }: Props) => {
  const isAktif = data.active
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()
  const linkTemp =  `/unit-ppid/thema/${data.thema}`
  const updateStatus = async () => {
    setLoading(true)
    await AxiosClient.post(linkTemp)
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: [ 'template-pengaturan'],
          })

          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan update user')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }
  if (loading) {
    return <Skeleton />
  }
  return (
    <div className="flex justify-center flex-col items-center">
      <Switch
        onCheckedChange={() => {
          updateStatus()
        }}
        checked={isAktif}
      />
      <span className="text-xs text-center text-gray-500 mt-1">
        {isAktif ? 'Aktif' : 'Tidak Aktif'}
      </span>
    </div>
  )
}

export default ButtonSwitch
