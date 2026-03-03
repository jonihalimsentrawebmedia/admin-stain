import TableCustom from '@/components/common/table/TableCustom'
import { Button } from '@/components/ui/button'
import { BiSync } from 'react-icons/bi'
import {
  UseGetLecturer,
  UseGetLecturerStatus,
} from '@/pages/modules/website-prodi/profile/dosen/hooks'
import LecturerColumnsProfile from '@/pages/modules/website-prodi/profile/dosen/data/columns.tsx'
import { useState } from 'react'
import AxiosClient from '@/provider/axios'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Skeleton } from '@/components/ui/skeleton'

const LecturerProfilePage = () => {
  const { loading, lecturer, meta } = UseGetLecturer()
  const { loading: loadingStatus, lecturerStatus } = UseGetLecturerStatus()

  const { columns } = LecturerColumnsProfile()
  const [loadingSync, setLoadingSync] = useState(false)
  const queryClient = useQueryClient()
  async function handleSyncSimpeg() {
    setLoadingSync(true)
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

          setLoadingSync(false)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoadingSync(false)
      })
  }
  if (loadingStatus || lecturerStatus?.status == 'in_progress') {
    return (
      <div>
        Menunggu {lecturerStatus?.job_can_running} Proses
        <Skeleton className="h-[100px]" />
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-medium">Dosen</p>
        <Button
          disabled={loadingSync}
          onClick={handleSyncSimpeg}
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
