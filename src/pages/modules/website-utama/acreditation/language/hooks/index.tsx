import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { AcreditationList } from '../../model/index'

export const UseGetAccreditationLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: AcreditationList
    en: AcreditationList
    zh: AcreditationList
    ar: AcreditationList
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['year-academic-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/akreditas-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
