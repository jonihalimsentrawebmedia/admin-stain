import type { IListActivityProgram } from '@/pages/modules/LPPM/devotion/schema/internal/activity-program/data/types.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetActivityProgram = (props?: basicProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  const { data, isLoading, isFetching } = useQuery<{
    data: IListActivityProgram[]
    meta: Meta
  }>({
    queryKey: ['activity-program', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/lppm/daftar-skema?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    activityProgram: data?.data ?? [],
    loading,
    meta: data?.meta,
  }
}

export const UseGetActivityProgramDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IListActivityProgram>({
    queryKey: ['activity-program-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/lppm/daftar-skema/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
