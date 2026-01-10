import { Switch } from '@/components/ui/switch.tsx'
import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { ILandingPromotion } from '../data/index'

interface IProps {
  name: 'is_atas' | 'is_bawah' | 'is_tengah' | 'is_sisi_kiri'
  data: ILandingPromotion
}

const renderPath = (name: string) => {
  switch (name) {
    case 'is_atas':
      return 'toggle-atas'
    case 'is_bawah':
      return 'toggle-bawah'
    case 'is_tengah':
      return 'toggle-tengah'
    case 'is_sisi_kiri':
      return 'toggle-sisi-kiri'
  }
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
    const position = renderPath(name)
    await AxiosClient.patch(
      `/prodi/landing-page-promosi/${data.id_prodi_landing_page_promosi}/${position}`
    )
      .then((res) => {
        if (res?.data?.status) {
          queryClient.invalidateQueries({ queryKey: ['landing-promotion'] })
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
