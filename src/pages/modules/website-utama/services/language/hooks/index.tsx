import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ServicesListDetail } from '../../model/index'

export const UseGetServiceLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: ServicesListDetail
    en: ServicesListDetail
    zh: ServicesListDetail
    ar: ServicesListDetail
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['achievement-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/layanan-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
