import AxiosClient from '@/provider/axios.tsx'
import { useQuery } from '@tanstack/react-query'
import type { IBackground } from '../data/types.tsx'
import type { BasicProps, IApiResponse } from '@/utils/globalType.ts'

export type Context =
  | 'TENTANG_KAMI'
  | 'LAYANAN'
  | 'PRODUK'
  | 'TRAINING'
  | 'INFORMASI'
  | 'HUBUNGI_KAMI'

interface props extends BasicProps {
  context: Context
}

export const UseGetListBackground = (props: props) => {
  const { context, search, page, limit } = props

  const ParamsSearch = new URLSearchParams()
  if (search) ParamsSearch.append('search', search ?? '')
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IBackground[]>>({
    refetchOnWindowFocus: false,
    queryKey: ['background-pusilkom', context, ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/pusilkom/background/${context}?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { background: data?.data ?? [], loading, meta: data?.meta }
}
