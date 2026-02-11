import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAnnouncement } from '../../data/index'

export const UseGetAnnouncementLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: IAnnouncement
    en: IAnnouncement
    zh: IAnnouncement
    ar: IAnnouncement
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['news-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lembaga/pengumuman-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
