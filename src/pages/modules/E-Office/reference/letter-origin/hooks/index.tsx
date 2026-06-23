import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ILetterOrigin } from '@/pages/modules/E-Office/reference/letter-origin/data/types.ts'

export const UseGetLetterOrigin = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: ILetterOrigin[]; meta: Meta }>({
    refetchOnWindowFocus: false,
    queryKey: ['letter-origin', Params.toString()],
    queryFn: () => AxiosClient.get(`/eoffice/asal-surat?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, letterOrigin: data?.data ?? [], meta: data?.meta }
}
