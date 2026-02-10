import { Switch } from '@/components/ui/switch.tsx'
import type { IThemeProdi } from '@/pages/modules/website-prodi/settings/template-website/data/types.ts'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

export const ButtonStatus = (data: IThemeProdi) => {
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
