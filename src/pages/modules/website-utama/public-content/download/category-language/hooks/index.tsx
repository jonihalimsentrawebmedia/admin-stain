import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ICategoryDownload } from '../../types/index'

export const UseGetDownloadCategoryLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: ICategoryDownload
    en: ICategoryDownload
    zh: ICategoryDownload
    ar: ICategoryDownload
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['news-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/kategori-berkas-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
