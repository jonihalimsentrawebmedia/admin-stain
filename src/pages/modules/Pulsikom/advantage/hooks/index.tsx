import type { BasicProps, IApiResponse } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAdvantage } from '@/pages/modules/Pulsikom/advantage/data/types.ts'

export const UseGetAdvantage = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.set('page', page ?? '')
  if (limit) ParamsSearch.set('limit', limit ?? '')
  if (search) ParamsSearch.set('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IAdvantage[]>>({
    queryKey: ['advantage', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/keunggulan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { advantage: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetAdvantageDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-advantage', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/keunggulan/${id}`).then((res) => res.data.data),
  })
  const loading = isLoading || isFetching

  return { detail: data, loading }
}
