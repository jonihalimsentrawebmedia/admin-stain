import TableCustom from '@/components/common/table/TableCustom'
import { Button } from '@/components/ui/button'
import { BiSync } from 'react-icons/bi'
import { UseGetLecturer } from '@/pages/modules/website-prodi/profile/dosen/hooks'
import LecturerColumnsProfile from '@/pages/modules/website-prodi/profile/dosen/data/columns.tsx'
import AxiosClient from '@/provider/axios'
import { useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { messaging, onMessage } from '@/provider/firebase.tsx'
import { toast } from 'react-toastify'
import { useState } from 'react'

export interface IDataCount {
  pending: number
  completed: number
  running: number
  failed: number
  too_many_retries: number
  not_retry: number
  job_can_running: number
}

export interface IJobStatus {
  data_count: IDataCount
  id_satuan_organisasi: string
  id_sdm: string
  is_success: boolean
  nama_sdm: string
  total_data: number
}

const LecturerProfilePage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''

  const [response, setResponse] = useState<IJobStatus | null>()

  const { loading, lecturer, meta } = UseGetLecturer({
    page: page,
    limit: limit,
    search: search,
    enabled: response?.is_success ?? true,
  })

  const { columns } = LecturerColumnsProfile()
  const queryClient = useQueryClient()

  const HandleFCM = async () => {
    const token = window.localStorage.getItem('token_fcm')
    await AxiosClient.post('/fcm/subscribe', {
      token: token,
      topik: 'fcm_sync_sdm_dosen',
    })
      .then(async (res) => {
        console.log(res)
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

  console.log(response)

  if (response && !response?.is_success) {
    return (
      <div>
        Menunggu {response?.data_count?.job_can_running} Proses
        {/*<Skeleton className="h-[100px]" />*/}
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
        <p className="text-2xl font-medium">Dosen</p>
        <Button
          disabled={false}
          onClick={HandleFCM}
          variant={'outline'}
          className="border border-primary text-primary hover:text-primary"
        >
          <BiSync />
          Sinkronisasi Dari SIMPEG
        </Button>
      </div>
      <TableCustom columns={columns} data={lecturer} loading={loading} meta={meta} />
    </div>
  )
}

export default LecturerProfilePage
