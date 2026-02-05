import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { NewsCategoryList } from '../../model/index'

export const UseGetNewsCategoryLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: NewsCategoryList
    en: NewsCategoryList
    zh: NewsCategoryList
    ar: NewsCategoryList
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['news-category-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/kategori-berita-translate/${id}`).then(
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
