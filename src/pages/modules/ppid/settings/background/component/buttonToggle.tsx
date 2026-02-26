import { Switch } from '@/components/ui/switch.tsx'
import { useEffect, useState } from 'react'
import type { IBackgroundPPID } from '../data/types'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { PPID_MENU } from '../data/constanta'

interface IProps {
  data: IBackgroundPPID
}

export const ToggleStatus = (props: IProps) => {
  const { data } = props

  const [status, setStatus] = useState(false)
  const [searchParams] = useSearchParams()
  const context = searchParams.get('context') ?? PPID_MENU?.[0]?.value

  useEffect(() => {
    if (data) {
      setStatus(data?.status)
    }
  }, [data])

  const queryClient = useQueryClient()

  const handleCheckedChange = async () => {
    await AxiosClient.patch(
      `/unit-ppid/ppid-background/${context}/${data.id_ppid_background}/toggle-status`
    )
      .then((res) => {
        if (res?.data?.status) {
          queryClient.invalidateQueries({ queryKey: ['background-unit-ppid'] })
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
