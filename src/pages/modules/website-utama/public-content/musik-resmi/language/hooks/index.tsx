import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IMarsMusic } from '../../types/index'

export const UseGetAnthemMusicLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: IMarsMusic
    en: IMarsMusic
    zh: IMarsMusic
    ar: IMarsMusic
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['music-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/mars-musik-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
