import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ITypeService } from '@/pages/modules/E-Office/services/type-service/data/types.ts'

export const UseGetTypeService = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data: queryData, isLoading, isFetching } = useQuery<{
    data: ITypeService[]
    meta: Meta
  }>({
    queryKey: ['type-service', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/jenis-layanan?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, typeService: queryData?.data ?? [], meta: queryData?.meta }
}
