import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ICategoryFAQ } from '../../data/type'

export const UseGetCategoryFAQLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: ICategoryFAQ
    en: ICategoryFAQ
    zh: ICategoryFAQ
    ar: ICategoryFAQ
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['category-faq-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/kategori-faq-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
