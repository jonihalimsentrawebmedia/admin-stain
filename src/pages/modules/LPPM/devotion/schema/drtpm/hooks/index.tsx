import type { IListDRPM } from '../data/types'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetListDRTPM = (props?: basicProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  const { data, isLoading, isFetching } = useQuery<{
    data: IListDRPM[]
    meta: Meta
  }>({
    queryKey: ['list-drtpm', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/lppm/drtpm?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    response: data?.data ?? [],
    loading,
    meta: data?.meta,
  }
}

export const UseGetDetailDRTPM = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IListDRPM>({
    queryKey: ['detail-drtpm', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/lppm/drtpm/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
