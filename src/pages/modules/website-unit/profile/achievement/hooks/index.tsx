import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAchievementCategory } from '@/pages/modules/website-unit/profile/achievement/data/types.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetCategoryAchievement = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page.toString() ?? '1')
  if (limit) ParamsSearch.append('limit', limit.toString() ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IAchievementCategory[]; meta: Meta }>({
    queryKey: ['category-achievement', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/unit/profil/kategori-penghargaan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { categoryAchievement: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetAchievementDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IAchievementCategory>({
    queryKey: ['achievement-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/unit/profil/kategori-penghargaan/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { achievement: data, loading }
}
