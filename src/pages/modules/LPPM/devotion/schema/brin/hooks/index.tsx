import type { IListBRIN } from '../data/types'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetListBRIN = (props?: basicProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  const { data, isLoading, isFetching } = useQuery<{
    data: IListBRIN[]
    meta: Meta
  }>({
    queryKey: ['list-brin', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/lppm/brin?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    response: data?.data ?? [],
    loading,
    meta: data?.meta,
  }
}

export const UseGetDetailBRIN = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IListBRIN>({
    queryKey: ['detail-brin', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/lppm/brin/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
