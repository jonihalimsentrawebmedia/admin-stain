import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IInboxMessage } from '@/pages/modules/Pulsikom/inbox/data/types.ts'
import type { BasicProps, IApiResponse } from '@/utils/globalType.ts'

export const UseGetInboxMessage = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.set('page', page ?? '1')
  if (limit) ParamsSearch.set('limit', limit ?? '10')
  if (search) ParamsSearch.set('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IInboxMessage[]>>({
    queryKey: ['inbox-message', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/pertanyaan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, meta: data?.meta, inboxMessage: data?.data ?? [] }
}
