import { Switch } from '@/components/ui/switch.tsx'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  data: SatuanOrganisasiList
}

export const ButtonShow = (props: Props) => {
  const { data } = props

  const queryClient = useQueryClient()

  const HandleStatus = async () => {
    await AxiosClient.patch(
      `/pengaturan/satuan-organisasi/${data?.kelompok}/${data.id_satuan_organisasi}/toggle-tampil`
    )
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message)
          queryClient.invalidateQueries({
            queryKey: ['satuan-organisasi-list'],
          })
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <Switch checked={data?.tampil} onClick={HandleStatus} />
    </>
  )
}
