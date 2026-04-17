import { Switch } from '@/components/ui/switch.tsx'
import type { IThemeUnit } from '../data/types'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

export const ButtonStatus = (data: IThemeUnit) => {
  const queryClient = useQueryClient()

  const HandleCheckedChange = async () => {
    await AxiosClient.post(`/unit/thema/${data?.thema}`)
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res.data.message)
          queryClient.invalidateQueries({ queryKey: ['template-unit'] })
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <Switch checked={data?.active} onCheckedChange={HandleCheckedChange} />
    </>
  )
}
