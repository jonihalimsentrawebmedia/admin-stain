import { Switch } from '@/components/ui/switch.tsx'
import type { IEntrance } from '@/pages/modules/PMB/entrance/data/types.ts'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

interface props {
  data: IEntrance
}

export const SwitchStatus = (props: props) => {
  const { data } = props
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandlerSwitch = async () => {
    setLoading(true)
    await AxiosClient.patch(`/pmb/jalur-masuk/${data?.id_jalur_masuk}/toggle-status-tampil`)
      .then((res) => {
        console.log(res)
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success')
          queryClient.invalidateQueries({
            queryKey: ['entrance-pmb'],
          })
          queryClient.invalidateQueries({
            queryKey: ['entrance-pmb-detail'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  return (
    <>
      <div className="flex items-center gap-1.5">
        <Switch
          checked={data?.is_status_tampil}
          onCheckedChange={HandlerSwitch}
          disabled={loading}
        />
        <p className="text-sm">{data?.is_status_tampil ? 'Tampil' : 'Tidak Tampil'}</p>
      </div>
    </>
  )
}
