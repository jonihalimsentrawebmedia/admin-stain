import { Switch } from '@/components/ui/switch.tsx'
import { useEffect, useState } from 'react'
import type { IProdiBackground } from '../data/index'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

interface IProps {
  data: IProdiBackground
}

export const ToggleStatus = (props: IProps) => {
  const { data } = props

  const [status, setStatus] = useState(false)

  useEffect(() => {
    if (data) {
      setStatus(data?.status)
    }
  }, [data])

  const queryClient = useQueryClient()

  const handleCheckedChange = async () => {
    await AxiosClient.patch(`/prodi/prodi-background/${data.id_prodi_background}/toggle-status`)
      .then((res) => {
        if (res?.data?.status) {
          queryClient.invalidateQueries({ queryKey: ['prodi-background'] })
          toast.success(res.data.message)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <Switch checked={status} onCheckedChange={handleCheckedChange} />
    </>
  )
}
