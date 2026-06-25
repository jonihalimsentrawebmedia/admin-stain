import type { BasicProps, IApiResponse } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IStatusActiveSDM } from '@/pages/modules/website-utama/lecturer-staff/status-active/data/types.tsx'

export const UseGetStatusActive = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IStatusActiveSDM[]>>({
    queryKey: ['status-sdm', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/sdm-status-aktif?${Params}`).then((res) => res?.data),
  })

  const loading = isLoading || isFetching

  return { meta: data?.meta, loading, statusActive: data?.data ?? [] }
}
