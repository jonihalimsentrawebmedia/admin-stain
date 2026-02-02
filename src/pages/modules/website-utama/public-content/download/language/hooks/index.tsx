import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDownload } from '../../types/index.tsx'

export const UseGetAnnouncementLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: IDownload
    en: IDownload
    zh: IDownload
    ar: IDownload
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['news-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/downloads-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
