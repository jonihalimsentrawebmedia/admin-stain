import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type {  EducationLevelLanguage } from '../../model/index'

export const UseEducatioinLevelLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: EducationLevelLanguage
    en: EducationLevelLanguage
    zh: EducationLevelLanguage
    ar: EducationLevelLanguage
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['education-level-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/jenjang-pendidikan-translate/${id}`).then(
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
