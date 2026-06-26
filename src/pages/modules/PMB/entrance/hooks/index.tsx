import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IEntrance } from '@/pages/modules/PMB/entrance/data/types.ts'

export const UseGetEntrance = (props: BasicProps) => {
  const { page, limit, search } = props

  const ParamsSearch = new URLSearchParams()
  ParamsSearch.append('page', page ?? '1')
  ParamsSearch.append('limit', limit ?? '10')
  ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IEntrance[]; meta: Meta }>({
    queryKey: ['entrance-pmb', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pmb/jalur-masuk?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { entrance: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetEntranceDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IEntrance>({
    queryKey: ['entrance-pmb-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pmb/jalur-masuk/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { entrance: data, loading }
}
