import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IServices } from '@/pages/modules/Pulsikom/services/data/types.ts'
import type { BasicProps, IApiResponse } from '@/utils/globalType.ts'

export const UseGetServices = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.set('page', page ?? '1')
  if (limit) ParamsSearch.set('limit', limit ?? '10')
  if (search) ParamsSearch.set('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IServices[]>>({
    queryKey: ['services', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/layanan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, meta: data?.meta, service: data?.data ?? [] }
}

export const UseGetServiceDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IServices>({
    queryKey: ['detail-service', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/layanan/${id}`).then((res) => res.data.data),
  })
  const loading = isLoading || isFetching

  return { detail: data, loading }
}
