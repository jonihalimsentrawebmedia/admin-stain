import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IGUideCategory } from '../data/types'

interface GuideCategoryResponse {
  data: IGUideCategory[]
  meta: Meta
}

export const UseGetGuideCategory = (props?: basicProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<GuideCategoryResponse>({
    queryKey: ['guide-category', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lppm/buku-panduan-kategori?${ParamsSearch}`).then((res) => {
        return res.data
      }),
  })

  const loading = isLoading || isFetching

  return { guideCategory: data?.data ?? [], meta: data?.meta, loading }
}

export const UseGetGuideCategoryDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IGUideCategory>({
    queryKey: ['guide-category-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lppm/buku-panduan-kategori/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
