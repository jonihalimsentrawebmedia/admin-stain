import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAchievementDetail } from '../../data/index'

export const UseGetAchievementLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: IAchievementDetail
    en: IAchievementDetail
    zh: IAchievementDetail
    ar: IAchievementDetail
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['achievement-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/prestasi-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
