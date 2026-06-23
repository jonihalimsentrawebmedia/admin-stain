import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAcademicResource } from '../../data/resolver.tsx'

export const UseGetAcademicResourceLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: IAcademicResource
    en: IAcademicResource
    zh: IAcademicResource
    ar: IAcademicResource
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['academic-resource-language', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/website-utama/academic-resources-translate/${id}`).then(
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
