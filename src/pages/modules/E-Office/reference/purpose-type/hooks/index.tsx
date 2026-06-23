import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IPurposeType } from '@/pages/modules/E-Office/reference/purpose-type/data/types.ts'

export const UseGetPurposeType = (props: BasicProps) => {
  const { page, limit, search } = props

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IPurposeType[]; meta: Meta }>({
    queryKey: ['purpose-type', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/jenis-keperluan?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, purposeType: data?.data ?? [], meta: data?.meta }
}
