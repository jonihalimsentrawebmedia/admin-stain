import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ITransportType } from '@/pages/modules/E-Office/reference/transport-type/data/types.ts'

export const UseGetTransportType = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: ITransportType[]; meta: Meta }>({
    refetchOnWindowFocus: false,
    queryKey: ['transport-type', Params.toString()],
    queryFn: () => AxiosClient.get(`/eoffice/jenis-transportasi?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, transportType: data?.data ?? [], meta: data?.meta }
}
