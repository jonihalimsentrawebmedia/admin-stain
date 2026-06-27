import type { ICategoryCollection } from '@/pages/modules/website-unit/collection/listCollection/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

interface Props extends BasicProps {
  id: string
}

export const UseGetCollectionCategory = (props: Props) => {
  const { id, page, limit, search } = props

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.set('page', page.toString() ?? '1')
  if (limit) ParamsSearch.set('limit', limit.toString() ?? '10')
  if (search) ParamsSearch.set('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: ICategoryCollection[]; meta: Meta }>({
    queryKey: ['collection-category', id, ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/unit/unit-koleksi/${id}/koleksi?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { collection: data?.data ?? [], loading, meta: data?.meta }
}
