import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IFAQList } from '../../data/type'

export const UseGetFAQLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: IFAQList
    en: IFAQList
    zh: IFAQList
    ar: IFAQList
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['faq-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/faqs-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
