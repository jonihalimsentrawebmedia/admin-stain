import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  data: any
  link?: string
  keyList?: string
  isActive?: boolean
}

const ButtonSwitch = ({ data, link, keyList, isActive }: Props) => {
  const isAktif = data.status
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()
  const linkTemp = link ?? `/unit-ppid/infografis/${data.id_infografis}/toggle-status`
  const updateStatus = async () => {
    setLoading(true)
    await AxiosClient.patch(linkTemp)
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: [keyList ?? 'infografis'],
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
        checked={isActive?isActive:isAktif}
      />
      <span className="text-xs text-center text-gray-500 mt-1">
        {isActive || isAktif ? 'Aktif' : 'Tidak Aktif'}
      </span>
    </div>
  )
}

export default ButtonSwitch
