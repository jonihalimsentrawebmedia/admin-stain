import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { InovationList } from '../../model/index'

export const UseGetImpactCategoryLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: InovationList
    en: InovationList
    zh: InovationList
    ar: InovationList
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['news-category-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/inovasi-berdampak-translate/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
