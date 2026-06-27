import type {
  StaffProfile,
  StaffProfileStatus,
} from '@/pages/modules/website-utama/program-studi/detail/model/staff.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useSearchParams } from 'react-router-dom'

interface IStaffResponse {
  data: StaffProfile[]
  meta: Meta
}

export const UseGetStaffProfileProdi = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'

  const ParamsSearch = new URLSearchParams({ page, limit })

  const { data, isLoading, isFetching } = useQuery<IStaffResponse>({
    queryKey: ['staff-profile', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/profil/staff?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { staff: data?.data ?? [], loading, meta: data?.meta }
}
export const UseGetStaffProfileStatusProdi = () => {
  const { data, isLoading, isFetching } = useQuery<{ data: StaffProfileStatus }>({
    queryKey: ['staff-profile-status'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/prodi/profil/staff/status`).then((res) => res.data),
    refetchInterval: (query) => {
      const status = query.state.data?.data?.status

      if (status === 'in_progress') {
        return 10000
      }

      return false
    },
  })

  const loading = isLoading || isFetching

  return { staffStatus: data?.data, loading }
}
