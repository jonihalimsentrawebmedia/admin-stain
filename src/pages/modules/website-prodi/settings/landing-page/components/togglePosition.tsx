import { Switch } from '@/components/ui/switch.tsx'
import { useEffect, useState } from 'react'
import type { IProdiLandingPage } from '../data/types'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

interface IProps {
  name: 'is_atas' | 'is_bawah'
  data: IProdiLandingPage
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
    const position = name === 'is_bawah' ? 'toggle-bawah' : 'toggle-atas'
    await AxiosClient.patch(`/prodi/landing-page/${data.id_prodi_landing_page}/${position}`)
      .then((res) => {
        if (res?.data?.status) {
          queryClient.invalidateQueries({ queryKey: ['landing-page'] })
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
