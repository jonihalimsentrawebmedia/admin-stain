import { Switch } from '@/components/ui/switch.tsx'
import type { IUnitLandingPage } from '../data/types'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

interface IProps {
  name: 'is_status'
  data: IUnitLandingPage
}

export const TogglePosition = (props: IProps) => {
  const { data, name } = props

  const queryClient = useQueryClient()

  const handleCheckedChange = async () => {
    await AxiosClient.patch(`/unit/landing-page/${data?.id_unit_landing_page}/toggle-status`)
      .then((res) => {
        if (res?.data?.status) {
          queryClient.invalidateQueries({ queryKey: ['landing-unit'] })
          toast.success(res.data.message)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      {data?.is_content_website_utama ? (
        <p>Hanya Bisa Dilakukan di Admin Website Utama</p>
      ) : (
        <Switch checked={data?.[name]} onCheckedChange={handleCheckedChange} />
      )}
    </>
  )
}
