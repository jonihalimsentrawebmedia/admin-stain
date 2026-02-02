import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IGalleryPhoto } from '../../data/index'

export const UseGetGalleryPhotoLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: IGalleryPhoto
    en: IGalleryPhoto
    zh: IGalleryPhoto
    ar: IGalleryPhoto
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['photo-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/galeri-foto-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
