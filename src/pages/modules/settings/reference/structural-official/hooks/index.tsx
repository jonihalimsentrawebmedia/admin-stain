import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IStructuralPosition } from '../data/types'

export const UseStructuralOfficial = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{
    data: IStructuralPosition[]
    meta: Meta
  }>({
    queryKey: ['structural-official', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/jabatan-struktural?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, structural: data?.data ?? [], meta: data?.meta }
}
