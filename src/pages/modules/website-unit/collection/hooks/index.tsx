import type { IUnitCollection } from '@/pages/modules/website-unit/collection/data/types.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetUnitCollection = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (search) ParamsSearch.set('search', search ?? '')
  if (page) ParamsSearch.set('page', page.toString() ?? '1')
  if (limit) ParamsSearch.set('limit', limit.toString() ?? '10')

  const { data, isLoading, isFetching } = useQuery<{ data: IUnitCollection[]; meta: Meta }>({
    queryKey: ['unit-collection', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/unit/kategori-koleksi?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { collection: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetUnitCollectionDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IUnitCollection>({
    queryKey: ['unit-collection-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/kategori-koleksi/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { collection: data, loading }
}
