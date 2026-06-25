import type { ICampusLifeAchievements } from '../../../types/index'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetTextPerformanceLanguage = () => {
  const { data, isLoading, isFetching } = useQuery<{
    id: ICampusLifeAchievements
    en: ICampusLifeAchievements
    zh: ICampusLifeAchievements
    ar: ICampusLifeAchievements
  }>({
    queryKey: ['language-prestasi'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/website-utama/kehidupan-kampus-prestasi-translate').then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { data, loading }
}
