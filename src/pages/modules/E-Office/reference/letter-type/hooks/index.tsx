import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ILetterType } from '../data/types.ts'

export const UseGetLetterType = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: ILetterType[]; meta: Meta }>({
    refetchOnWindowFocus: false,
    queryKey: ['letter-type', Params.toString()],
    queryFn: () => AxiosClient.get(`/eoffice/jenis-surat?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, letterType: data?.data ?? [], meta: data?.meta }
}
