import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IBankAccount } from '@/pages/modules/Pulsikom/reference/bank-account/data/types.ts'
import type { BasicProps, IApiResponse } from '@/utils/globalType.ts'

export const UseGetBankAccount = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.set('page', page ?? '1')
  if (limit) ParamsSearch.set('limit', limit ?? '10')
  if (search) ParamsSearch.set('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IBankAccount[]>>({
    queryKey: ['bank-account', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/rekening?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, meta: data?.meta, bankAccount: data?.data ?? [] }
}
