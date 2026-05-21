import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { IoSyncOutline } from 'react-icons/io5'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { BiX } from 'react-icons/bi'
import { FaCircleCheck } from 'react-icons/fa6'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { messaging, onMessage } from '@/provider/firebase.tsx'
import type { IJobStatus } from '@/pages/modules/website-prodi/profile/dosen'
import { Spinner } from '@/components/ui/spinner.tsx'

export const ButtonSyncLecturer = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<IJobStatus | null>()

  const HandleSave = async () => {
    setLoading(true)
    const token = window.localStorage.getItem('token_fcm')
    await AxiosClient.post('/fcm/subscribe', {
      token: token,
      topik: 'fcm_sync_sdm_dosen',
    })
      .then(async (res) => {
        if (res.status == 200) {
          await AxiosClient.post(`/website-utama/sdm/sync`)
            .then((res) => {
              toast.success(res.data.message || 'Success Mengajukan data Promosi')
              setLoading(false)
              setOpen(false)
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


  if (messaging) {
    onMessage(messaging, (payload) => {
      const data = JSON.parse(payload.data?.extra || '{}')
      setResponse(data)
    })
  }

  return (
    <>
      <div className="flex flex-col items-start gap-1.5">
        <Button onClick={() => setOpen(!open)} disabled={!!response && !response?.is_success}>
          {!!response && !response?.is_success ? (
            <>
              <Spinner />
              Sinkronisasi Berlangsung
            </>
          ) : (
            <>
              <IoSyncOutline />
              Sinkronisasi SISTER
            </>
          )}
        </Button>
        {!!response && !response?.is_success && (
          <p className="text-xs text-primary font-semibold">
            Menunggu {response?.data_count?.job_can_running} Proses
          </p>
        )}
      </div>

      <DialogBasic
        description={
          'Apakah anda yakin untuk melakukan sinkronisasi data SISTER? mohon pastikan jaringan anda lancar saat melakukan sinkronisasi'
        }
        title={'Sinkronisasi Sister'}
        open={open}
        setOpen={setOpen}
      >
        <div className="flex items-center justify-end gap-4">
          <Button
            onClick={() => setOpen(!open)}
            variant={'outline'}
            className={'border-primary text-primary hover:text-primary'}
          >
            <BiX />
            Batal
          </Button>
          <Button disabled={loading} onClick={HandleSave}>
            <FaCircleCheck />
            Ya,Saya Yakin
          </Button>
        </div>
      </DialogBasic>
    </>
  )
}
