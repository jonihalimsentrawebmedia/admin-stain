import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { INonUktEntrance } from '../data/types.ts'

export const UseGetEntranceNonUkt = (props: BasicProps) => {
  const { search, limit, page } = props

  const params = new URLSearchParams()
  if (page) params.append('page', page ?? '1')
  if (limit) params.append('limit', limit ?? '10')
  if (search) params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{
    data: INonUktEntrance[]
    meta: Meta
  }>({
    queryKey: ['entrance_non_ukt', params],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/jalur-masuk-non-ukt?${params.toString()}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { entrance: data?.data ?? [], meta: data?.meta, loading }
}
