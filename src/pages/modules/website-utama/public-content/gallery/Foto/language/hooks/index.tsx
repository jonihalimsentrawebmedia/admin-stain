import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IGaleriAlbum } from '../../data/index'

export const UseGetGalleryAlbumLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: IGaleriAlbum
    en: IGaleriAlbum
    zh: IGaleriAlbum
    ar: IGaleriAlbum
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['album-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/galeri-album-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
