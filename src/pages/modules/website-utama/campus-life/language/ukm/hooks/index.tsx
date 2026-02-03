import { useEffect, useState } from 'react'
import type { ICampusLifeUnitActivities } from '../../../types/index'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetTextUnitActivityLanguage = () => {
  const [language, setLanguage] = useState<{
    id: ICampusLifeUnitActivities
    en: ICampusLifeUnitActivities
    zh: ICampusLifeUnitActivities
    ar: ICampusLifeUnitActivities
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['language-ukm'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/website-utama/kehidupan-kampus-unit-kegiatan-translate').then(
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
