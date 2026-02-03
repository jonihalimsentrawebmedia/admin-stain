import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { AcademicActivity } from '../../../model/academicActivity'

export const UseGetYearAcademicActivityLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: AcademicActivity
    en: AcademicActivity
    zh: AcademicActivity
    ar: AcademicActivity
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['year-academic-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/tahun-akademik-kegiatan-translate/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
