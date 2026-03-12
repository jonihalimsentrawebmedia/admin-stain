import TableCustom from '@/components/common/table/TableCustom'
import { Button } from '@/components/ui/button'
import { BiSync } from 'react-icons/bi'
import {
  UseGetStaffProfileProdi,
  UseGetStaffProfileStatusProdi,
} from '@/pages/modules/website-prodi/profile/staff/hooks'
import StaffColumnsProfile from '@/pages/modules/website-prodi/profile/staff/data/columns.tsx'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { Skeleton } from '@/components/ui/skeleton'

const StaffProfilePage = () => {
  const { loading, staff, meta } = UseGetStaffProfileProdi()
  const { loading: loadingStatus, staffStatus } = UseGetStaffProfileStatusProdi()
  const { columns } = StaffColumnsProfile()
  const [loadingSync, setLoadingSync] = useState(false)
  const queryClient = useQueryClient()
  async function handleSyncSimpeg() {
    setLoadingSync(true)
    await AxiosClient.post(`/prodi/profil/staff/sync`)
      .then((res) => {
        if (res?.data?.status) {
          queryClient.invalidateQueries({
            queryKey: ['staff-profile'],
          })
          queryClient.invalidateQueries({
            queryKey: ['staff-profile-status'],
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

  if (loadingStatus || staffStatus?.status == 'in_progress') {
    return (
      <div>
        Menunggu {staffStatus?.job_can_running} Proses
        <Skeleton className="h-[100px]" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-medium">Staff</p>
        <Button
          onClick={handleSyncSimpeg}
          disabled={loadingSync}
          variant={'outline'}
          className="border border-primary text-primary hover:text-primary"
        >
          <BiSync />
          Sinkronisasi Dari SIMPEG
        </Button>
      </div>
      <TableCustom columns={columns} data={staff} loading={loading} meta={meta} />
    </div>
  )
}

export default StaffProfilePage
