import { useEffect, useState } from 'react'
import type {
  StaffProfile,
  StaffProfileStatus,
} from '@/pages/modules/website-utama/program-studi/detail/model/staff.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useSearchParams } from 'react-router-dom'

export const UseGetStaffProfileProdi = () => {
  const [staff, setStaff] = useState<StaffProfile[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'

  const ParamsSearch = new URLSearchParams({ page, limit })

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['staff-profile', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/profil/staff?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStaff(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { staff, loading, meta }
}
export const UseGetStaffProfileStatusProdi = () => {
  const [refetchCount, setRefetchCount] = useState(0)
  const [staffStatus, setStaffStatus] = useState<StaffProfileStatus>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['staff-profile-status'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/prodi/profil/staff/status`).then((res) => {
        if (res.data.data.status === 'in_progress') {
          setRefetchCount((prev) => prev + 1)
        }
        return res.data
      }),
    refetchInterval: (query) => {
      const status = query.state.data?.data?.status

      if (status === 'in_progress' && refetchCount < 10) {
        return 10000 // 10 detik
      }

      return false // stop polling
    },
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStaffStatus(data.data)
    }
  }, [data])

  return { staffStatus, loading }
}
