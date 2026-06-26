import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IMemberStaff } from '@/pages/modules/LPPM/about/staff/member/hooks/types.ts'

interface Props {
  page?: string
  limit?: string
  search?: string
  id_staff: string
}

interface MemberStaffListResponse {
  data: IMemberStaff[]
  meta: Meta
}

export const UseGetMemberStaff = (props?: Props) => {
  const { page, limit, search, id_staff } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  if (id_staff) ParamsSearch.append('id_staff', id_staff ?? '')

  const { data, isLoading, isFetching } = useQuery<MemberStaffListResponse>({
    queryKey: ['member-staff', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/staff-anggota?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { member: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetMemberDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IMemberStaff>({
    queryKey: ['member-staff-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/lppm/staff-anggota/${id}`).then((res) => res?.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
