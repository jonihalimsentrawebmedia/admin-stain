import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IPublication } from '@/pages/modules/website-utama/publication/List-data/data/types.ts'

export const UseGetPublicationLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: IPublication
    en: IPublication
    zh: IPublication
    ar: IPublication
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['publication-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/publikasi-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
