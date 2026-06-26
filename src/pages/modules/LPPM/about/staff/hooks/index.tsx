import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IGroupStaff } from '@/pages/modules/LPPM/about/staff/hooks/types.ts'

interface Prop {
  page?: string
  limit?: string
  search?: string
}

interface StaffListResponse {
  data: IGroupStaff[]
  meta: Meta
}

export const UseGetStaff = (props?: Prop) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<StaffListResponse>({
    queryKey: ['about-staff', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/lppm/staff?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { staff: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetStaffDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IGroupStaff>({
    queryKey: ['about-staff-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/lppm/staff/${id}`).then((res) => res?.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
