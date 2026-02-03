import { useEffect, useState } from 'react'
import type { ICampusLifeAchievements } from '../../../types/index'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetTextPerformanceLanguage = () => {
  const [language, setLanguage] = useState<{
    id: ICampusLifeAchievements
    en: ICampusLifeAchievements
    zh: ICampusLifeAchievements
    ar: ICampusLifeAchievements
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['language-performance'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/website-utama/kehidupan-kampus-prestasi-translate').then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { language, loading }
}
