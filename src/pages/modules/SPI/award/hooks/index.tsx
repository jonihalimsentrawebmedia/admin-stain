import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps, IApiResponse } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface IAwardList {
  url_gambar: string
  urutan: number
  id_penghargaan: string
}

export const UseGetAward = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}

  const Params = new URLSearchParams()
  if (search) Params.append('search', search)
  if (limit) Params.append('limit', limit ?? '1')
  if (page) Params.append('page', page ?? '10')

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IAwardList[]>>({
    queryKey: ['award', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/spi/penghargaan?${Params}`).then((res) => res.data),
  })

  const award: IAwardList[] = data?.data ?? []
  const meta: Meta | undefined = data?.meta
  const loading = isLoading || isFetching

  return { loading, meta, award }
}
