import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAchievementCategory } from '@/pages/modules/website-unit/profile/achievement/data/types.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetCategoryAchievement = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const [categoryAchievement, setCategoryAchievement] = useState<IAchievementCategory[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page.toString() ?? '1')
  if (limit) ParamsSearch.append('limit', limit.toString() ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['category-achievement', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/unit/profil/kategori-penghargaan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCategoryAchievement(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { categoryAchievement, loading, meta }
}

export const UseGetAchievementDetail = (id: string) => {
  const [achievement, setAchievement] = useState<IAchievementCategory>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['achievement-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/unit/profil/kategori-penghargaan/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAchievement(data)
    }
  }, [data])

  return { achievement, loading }
}
