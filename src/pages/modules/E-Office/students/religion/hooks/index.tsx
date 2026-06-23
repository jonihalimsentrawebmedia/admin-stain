import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IReligion } from '../data/types.ts'

export const UseGetReligion = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data: queryData, isLoading, isFetching } = useQuery<{
    data: IReligion[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['religion', Params.toString()],
    queryFn: () =>
      AxiosClient.get(`/eoffice/mahasiswa/agama?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, religion: queryData?.data ?? [], meta: queryData?.meta }
}
