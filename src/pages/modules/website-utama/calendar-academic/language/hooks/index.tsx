import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { AcademicYearList } from '../../model/index'

export const UseGetYearAcademicLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: AcademicYearList
    en: AcademicYearList
    zh: AcademicYearList
    ar: AcademicYearList
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['year-academic-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/tahun-akademik-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
