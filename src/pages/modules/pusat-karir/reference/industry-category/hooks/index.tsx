import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { ICategoryIndustry } from '@/pages/modules/pusat-karir/reference/industry-category/data/type.ts'

export const UseGetIndustryCategory = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  if (limit) ParamsSearch.append('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery<{ data: ICategoryIndustry[]; meta: Meta }>({
    queryKey: ['industry-category', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/kategori-industri?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { categoryIndustry: data?.data ?? [], meta: data?.meta, loading }
}
