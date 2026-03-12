import { Switch } from '@/components/ui/switch.tsx'
import { useEffect, useState } from 'react'
import type { IUnitLandingPage } from '../data/types'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

interface IProps {
  name: 'status'
  data: IUnitLandingPage
}

export const TogglePosition = (props: IProps) => {
  const { data, name } = props

  const [status, setStatus] = useState(false)

  useEffect(() => {
    if (data) {
      setStatus(data[name])
    }
  }, [data])

  const queryClient = useQueryClient()

  const handleCheckedChange = async () => {
    await AxiosClient.patch(`/pusat-karir/landing/${data?.id_pusat_karir_landing}/toggle-status`)
      .then((res) => {
        if (res?.data?.status) {
          queryClient.invalidateQueries({ queryKey: ['landing-carrier'] })
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
