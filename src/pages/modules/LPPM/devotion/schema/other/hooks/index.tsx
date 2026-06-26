import type { IOtherFunding } from '../data/types'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetOtherFunding = (props?: basicProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  const { data, isLoading, isFetching } = useQuery<{
    data: IOtherFunding[]
    meta: Meta
  }>({
    queryKey: ['other-funding', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/lppm/pendanaan-lainnya?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    response: data?.data ?? [],
    loading,
    meta: data?.meta,
  }
}

export const UseGetDetailOtherFunding = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IOtherFunding>({
    queryKey: ['other-funding-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/lppm/pendanaan-lainnya/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
