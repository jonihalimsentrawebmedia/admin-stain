import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetStaffFaculty = (props?: BasicProps) => {
  const { search, limit, page } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: []; meta: Meta }>({
    queryKey: ['staff-faculty', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/profil/staff`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    staff: data?.data ?? [],
    loading,
    meta: data?.meta,
  }
}
