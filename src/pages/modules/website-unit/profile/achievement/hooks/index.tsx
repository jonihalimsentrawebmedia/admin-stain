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
