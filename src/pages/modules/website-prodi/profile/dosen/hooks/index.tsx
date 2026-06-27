import type { Dosen } from '@/pages/modules/website-utama/program-studi/detail/model/dosen.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { StaffProfileStatus } from '@/pages/modules/website-utama/program-studi/detail/model/staff'

interface Props {
  page?: string
  limit?: string
  search?: string
  enabled?: boolean
}

interface ILecturerResponse {
  data: Dosen[]
  meta: Meta
}

export const UseGetLecturer = (props?: Props) => {
  const { page, limit, search, enabled } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  ParamsSearch.append('page', page ?? '1')
  ParamsSearch.append('limit', limit ?? '10')
  ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<ILecturerResponse>({
    queryKey: ['lecturer-profile', ParamsSearch.toString()],
    enabled: !!enabled,
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/profil/dosen?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { lecturer: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetLecturerStatus = () => {
  const { data, isLoading, isFetching } = useQuery<{ data: StaffProfileStatus }>({
    queryKey: ['lecturer-profile-status'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/prodi/profil/dosen/status').then((res) => res.data),
    refetchInterval: (query) => {
      const status = query.state.data?.data?.status

      if (status === 'in_progress') {
        return 10000
      }

      return false
    },
  })

  const loading = isLoading || isFetching

  return { lecturerStatus: data?.data, loading }
}
