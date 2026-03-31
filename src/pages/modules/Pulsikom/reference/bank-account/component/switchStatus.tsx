import { Switch } from '@/components/ui/switch.tsx'
import type { IBankAccount } from '@/pages/modules/Pulsikom/reference/bank-account/data/types.ts'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

interface props {
  data: IBankAccount
}

export const SwitchStatus = (props: props) => {
  const { data } = props
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const handleStatus = async () => {
    setLoading(true)
    await AxiosClient.patch(`/pusilkom/rekening/${data.id_rekening}/set-utama`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['bank-account'],
          })
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <div className="flex items-center gap-1.5">
        <Switch checked={data?.is_utama} disabled={loading} onCheckedChange={handleStatus} />
        {data?.is_utama ? 'Utama' : 'Bukan Utama'}
      </div>
    </>
  )
}
