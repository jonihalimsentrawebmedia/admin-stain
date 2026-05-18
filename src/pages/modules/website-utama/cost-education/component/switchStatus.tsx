import { UseGetStatusPublish } from '@/pages/modules/website-utama/cost-education/hooks'
import { Switch } from '@/components/ui/switch.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

interface props {
  type: 'UKT' | 'NON_UKT'
}

export const SwitchStatus = (prop: props) => {
  const { type } = prop
  const { publish } = UseGetStatusPublish()

  const queryClient = useQueryClient()
  const HandleSwitch = async () => {
    await AxiosClient.patch('/website-utama/biaya-pendidikan-ukt/toggle-tipe')
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message)
          queryClient.invalidateQueries({
            queryKey: ['status_publish'],
          })
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <div className={'grid grid-cols-[15rem_1fr] gap-5'}>
        <p>Status Publish untuk Landing</p>
        <div className="flex items-center gap-4">
          <Switch checked={publish?.tipe === type} onCheckedChange={HandleSwitch} />
          Ya
        </div>
      </div>
    </>
  )
}
