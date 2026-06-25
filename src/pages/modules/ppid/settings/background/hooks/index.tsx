// unit-ppid/background/:context

import AxiosClient from '@/provider/axios.tsx'
import { useQuery } from '@tanstack/react-query'
import type { BasicProps } from '@/utils/globalType.ts'

export type Context =
  | 'PROFILE'
  | 'INFORMASI_PUBLIC'
  | 'REGULASI'
  | 'FORMULIR_PERMOHONAN'
  | 'LAPORAN'
  | 'HUBUNGI_KAMI'

interface Props extends BasicProps {
  context: Context
}

export const UseGetListBackground = (props?: Props) => {
  const { context, search, page, limit } = props ?? {}


  const ParamsSearch = new URLSearchParams()
  if (search) ParamsSearch.set('search', search ?? '')
  if (page) ParamsSearch.set('page', page ?? '1')
  if (limit) ParamsSearch.set('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['background-unit-ppid', context, ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/unit-ppid/ppid-background/${context}?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { background: data?.data ?? [], loading, meta: data?.meta }
}
