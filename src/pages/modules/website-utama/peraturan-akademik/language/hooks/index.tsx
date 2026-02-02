import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAcademicRules } from '../../types/index'

export const UseGetAcademicRulesLanguage = () => {
  const [language, setLanguage] = useState<{
    id: IAcademicRules
    en: IAcademicRules
    zh: IAcademicRules
    ar: IAcademicRules
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['faq-language'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/pengaturan-akademik-translate`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
