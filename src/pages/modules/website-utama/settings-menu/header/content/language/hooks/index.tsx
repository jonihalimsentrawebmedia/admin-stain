import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ContentList } from '../../model/index.tsx'

export const UseGetHeaderMenuContentLanguage = (id: string) => {
  const [language, setLanguage] = useState<{
    id: ContentList
    en: ContentList
    zh: ContentList
    ar: ContentList
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['header-menu-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/konten-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { language, loading }
}
