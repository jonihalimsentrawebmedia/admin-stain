import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { INewsDetail } from '@/pages/modules/website-utama/public-content/news/data'

export const UseGetNewsLanguage = (id?: string) => {
  const [newsLanguage, setNewsLanguage] = useState<{
    id: INewsDetail
    en: INewsDetail
    zh: INewsDetail
    ar: INewsDetail
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['news-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/berita-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setNewsLanguage(data)
    }
  }, [data])

  return { loading, newsLanguage }
}
