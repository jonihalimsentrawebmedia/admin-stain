import { Button } from '@/components/ui/button.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { ILecturerData } from '../hooks/types.tsx'

interface Props {
  data?: ILecturerData
}

const ButtonSyncLecturerFCM = (props: Props) => {
  const { data } = props
  const queryClient = useQueryClient()

  const HandleSync = async () => {
    const token = window.localStorage.getItem('token_fcm')
    await AxiosClient.post('/fcm/subscribe', {
      token: token,
      topik: 'fcm_sync_sdm_dosen',
    })
      .then(async (res) => {
        console.log(res)
        if (res.status == 200) {
          await AxiosClient.post(
            `/fakultas/satuan-organisasi/${data?.id_satuan_organisasi}/dosen/sync`
          )
            .then((res) => {
              if (res?.data?.status) {
                queryClient.invalidateQueries({
                  queryKey: ['lecturer-profile'],
                })
                queryClient.invalidateQueries({
                  queryKey: ['lecturer-profile-status'],
                })
                toast.success(res.data.message || 'Success Mengajukan data Promosi')
              }
            })
            .catch((err) => {
              toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        className={'border-primary text-primary hover:text-primary'}
        onClick={HandleSync}
      >
        Sync Dosen
      </Button>
    </>
  )
}

export default ButtonSyncLecturerFCM
