import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IGalleryVideo } from '../../data/index'

export const UseGetGalleryVideoLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: IGalleryVideo
    en: IGalleryVideo
    zh: IGalleryVideo
    ar: IGalleryVideo
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['news-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/galeri-video-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
