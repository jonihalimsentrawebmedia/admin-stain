import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps, IApiResponse } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IExternalPortal } from '../data/types.ts'

export const UseGetPortal = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}

  const Params = new URLSearchParams()
  if (search) Params.append('search', search)
  if (limit) Params.append('limit', limit ?? '1')
  if (page) Params.append('page', page ?? '10')

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IExternalPortal[]>>({
    queryKey: ['external-portal', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/spi/portal-eksternal?${Params}`).then((res) => res.data),
  })

  const portal: IExternalPortal[] = data?.data ?? []
  const meta: Meta | undefined = data?.meta
  const loading = isLoading || isFetching

  return { loading, meta, portal }
}
