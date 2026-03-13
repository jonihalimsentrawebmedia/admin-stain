import { Switch } from '@/components/ui/switch.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

interface props {
  status: boolean
  url: string
  name: string
}

export const SwitchStatus = (props: props) => {
  const { status, url, name } = props

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleStatus = async () => {
    setLoading(true)
    await AxiosClient.patch(url)
      .then((res) => {
        setLoading(false)
        toast.success(res.data.message || 'Berhasil mengubah status')
        queryClient.invalidateQueries({
          queryKey: [name],
        })
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengubah status')
      })
  }

  return (
    <>
      <Switch checked={status} onCheckedChange={HandleStatus} disabled={loading} />
    </>
  )
}
