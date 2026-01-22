import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAchievementCategory } from '@/pages/modules/website-unit/profile/achievement/data/types.tsx'

export const UseGetCategoryAchievement = () => {
  const [categoryAchievement, setCategoryAchievement] = useState<IAchievementCategory[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['category-achievement'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/profil/kategori-penghargaan').then((res) => res.data),
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
