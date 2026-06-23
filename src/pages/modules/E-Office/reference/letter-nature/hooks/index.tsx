import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ILetterNature } from '@/pages/modules/E-Office/reference/letter-nature/data/types.ts'

export const UseGetLetterNature = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: ILetterNature[]; meta: Meta }>({
    refetchOnWindowFocus: false,
    queryKey: ['letter-nature', Params.toString()],
    queryFn: () => AxiosClient.get(`/eoffice/sifat-surat?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, letterNature: data?.data ?? [], meta: data?.meta }
}
