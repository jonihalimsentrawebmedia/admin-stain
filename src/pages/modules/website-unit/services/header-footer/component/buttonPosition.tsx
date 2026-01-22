import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { Skeleton } from '@/components/ui/skeleton'
import { Label } from '@/components/ui/label'
import type { IUnitHeaderFooterServices } from '../data/types'

interface Props {
  name: 'toggle-header' | 'toggle-footer'
  data: IUnitHeaderFooterServices
}

const ButtonActiveServices = ({ data, name }: Props) => {
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async () => {
    setLoading(true)
    await AxiosClient.patch(
      `/unit/layanan-header-footer/${data?.id_unit_layanan_header_footer}/${name}`
    )
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['header-footer'],
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
        checked={name === 'toggle-footer' ? data?.is_footer : data?.is_header}
        onCheckedChange={async () => {
          await handleSave()
        }}
      />
      <Label htmlFor="airplane-mode">
        {name === 'toggle-footer'
          ? data?.is_footer
            ? 'Aktif'
            : 'Tidak Aktif'
          : data?.is_header
            ? 'Aktif'
            : 'Tidak Aktif'}
      </Label>
    </div>
  )
}

export default ButtonActiveServices
