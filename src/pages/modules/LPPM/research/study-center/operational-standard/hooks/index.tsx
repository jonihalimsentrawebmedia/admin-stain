import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IStandardOperational } from '../data/types'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'

interface StandardOperationalResponse {
  data: IStandardOperational[]
  meta: Meta
}

export const UseGetDocumentStandardOperational = (props: basicProps) => {
  const { search, page, limit } = props

  const ParamsSearch = new URLSearchParams()
  if (search) ParamsSearch.append('search', search ?? '')
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery<StandardOperationalResponse>({
    queryKey: ['standard-operational', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lppm/standard-operasional-pusat-studi?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { document: data?.data ?? [], meta: data?.meta, loading }
}
