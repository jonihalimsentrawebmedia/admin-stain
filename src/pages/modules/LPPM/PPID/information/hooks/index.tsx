import type { IListInformationTree } from '@/pages/modules/LPPM/PPID/information/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'

interface InformationTreeResponse {
  data: IListInformationTree[]
  meta: Meta
}

export const UseGetInformationTree = (props?: basicProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<InformationTreeResponse>({
    queryKey: ['information-tree', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/lppm/daftar-informasi/tree?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { information: data?.data ?? [], meta: data?.meta, loading }
}
