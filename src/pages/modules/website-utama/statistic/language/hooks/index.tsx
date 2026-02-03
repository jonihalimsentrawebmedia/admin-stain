import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { StatisticUniversity } from '../../model/index'

export const UseGetStatistic = () => {
  const [language, setLanguage] = useState<{
    id: StatisticUniversity
    en: StatisticUniversity
    zh: StatisticUniversity
    ar: StatisticUniversity
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['skm-language'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/statistik-translate`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
