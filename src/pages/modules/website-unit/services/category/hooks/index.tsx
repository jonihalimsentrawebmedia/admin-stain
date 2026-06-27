import type { ICategoryServices } from '@/pages/modules/website-unit/services/category/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetListServices = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const params = new URLSearchParams()
  if (search) params.append('search', search ?? '')
  if (page) params.append('page', page.toString() ?? '1')
  if (limit) params.append('limit', limit.toString() ?? '10')

  const { data, isLoading, isFetching } = useQuery<{ data: ICategoryServices[]; meta: Meta }>({
    queryKey: ['category-services', params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/kategori-layanan?${params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { listServices: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetDetailServices = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ICategoryServices>({
    queryKey: ['detail-services', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/kategori-layanan/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detailServices: data, loading }
}
