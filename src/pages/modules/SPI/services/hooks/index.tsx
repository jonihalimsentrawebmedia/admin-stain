import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IServices } from '../data/types'
import type { BasicProps, IApiResponse } from '@/utils/globalType.ts'

export const UseGetServices = (props: BasicProps) => {
  const { page, search, limit } = props

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (limit) Params.append('limit', limit ?? '1')
  if (page) Params.append('page', page ?? '10')

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IServices[]>>({
    queryKey: ['services', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/spi/layanan?${Params}`).then((res) => res.data),
  })

  const service: IServices[] = data?.data ?? []
  const meta: Meta | undefined = data?.meta
  const loading = isLoading || isFetching

  return { loading, meta, service }
}

export const UseGetServiceDetail = (id: string) => {
  const { data: detail, isLoading, isFetching } = useQuery<IServices>({
    queryKey: ['detail-service', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () => AxiosClient.get(`/spi/layanan/${id}`).then((res) => res.data.data),
  })
  const loading = isLoading || isFetching

  return { detail, loading }
}
