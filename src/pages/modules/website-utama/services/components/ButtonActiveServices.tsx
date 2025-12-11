import { Switch } from '@/components/ui/switch'
import type { ServicesList } from '../model'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { Skeleton } from '@/components/ui/skeleton'
import { Label } from '@/components/ui/label'

interface Props {
  name: 'header' | 'slider' | 'footer'
  data: ServicesList
}

const ButtonActiveServices = ({ data, name }: Props) => {
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async () => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/layanan/${data.id_layanan}`, {
      ...data,
      [name]: data[name] == 'Y' ? 'N' : 'Y',
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['list-services'],
          })

          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan Edit data Layanan')
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
    <div className="flex items-center flex-col space-x-2">
      <Switch
        checked={data[name] == 'Y'}
        onCheckedChange={() => {
          handleSave()
        }}
      />
      <Label htmlFor="airplane-mode">{data[name] == 'Y' ? 'Aktif' : 'Tidak Aktif'}</Label>
    </div>
  )
}

export default ButtonActiveServices
