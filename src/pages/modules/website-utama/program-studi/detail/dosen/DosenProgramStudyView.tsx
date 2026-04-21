import TableCustom from '@/components/common/table/TableCustom'
import useGetDosen from '../controller/useGetDosen'
import DosenProgramStudyViewModel from './DosenProgramStudyViewModel'
import { Button } from '@/components/ui/button'
import { BiSync } from 'react-icons/bi'
import { useState } from 'react'
import type { IJobStatus } from '@/pages/modules/website-prodi/profile/dosen'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { messaging, onMessage } from '@/provider/firebase.tsx'
import { useQueryClient } from '@tanstack/react-query'
import ButtonGoToGuide from '../../../panduan/components/ButtonGoToGuide'

const DosenProgramStudyView = () => {
  const { loading, dosen, meta } = useGetDosen()
  const { columns } = DosenProgramStudyViewModel()

  const [response, setResponse] = useState<IJobStatus | null>()

  const queryClient = useQueryClient()

  const HandleFCM = async () => {
    const token = window.localStorage.getItem('token_fcm')
    await AxiosClient.post('/fcm/subscribe', {
      token: token,
      topik: 'fcm_sync_sdm_dosen',
    })
      .then(async (res) => {
        if (res.status == 200) {
          await AxiosClient.post(`/prodi/profil/dosen/sync`)
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

  if (messaging) {
    onMessage(messaging, (payload) => {
      const data = JSON.parse(payload.data?.extra || '{}')
      setResponse(data)
    })
  }

  if (response && !response?.is_success) {
    return (
      <div>
        Menunggu {response?.data_count?.job_can_running} Proses
        <div className={'bg-primary h-[30px] rounded w-full p-1'}>
          <div
            className={'h-full bg-blue-500'}
            style={{
              width: `${((response?.total_data - response?.data_count?.job_can_running) / response?.total_data) * 100}%`,
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="text-primary text-2xl font-medium">Dosen</div>
        <div className="flex gap-4 items-center">
          <ButtonGoToGuide valueGuide="WEBSITE_UTAMA_SATUAN_ORGANISASI_DOSEN" />
          <Button
            variant={'outline'}
            onClick={HandleFCM}
            className="border border-primary text-primary hover:text-primary"
          >
            <BiSync />
            Sinkronisasi Dari SIMPEG
          </Button>
        </div>
      </div>
      <TableCustom columns={columns} data={dosen} loading={loading} meta={meta} />
    </div>
  )
}

export default DosenProgramStudyView
