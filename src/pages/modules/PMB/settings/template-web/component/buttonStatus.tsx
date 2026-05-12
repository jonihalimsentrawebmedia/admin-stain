import { Switch } from '@/components/ui/switch.tsx'
import type { IThemePMB } from '../data/types.ts'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

export const ButtonStatus = (data: IThemePMB) => {
  const queryClient = useQueryClient()

  const HandleCheckedChange = async () => {
    await AxiosClient.post(`/pmb/thema/${data?.thema}`)
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res.data.message)
          queryClient.invalidateQueries({ queryKey: ['template-pmb'] })
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
