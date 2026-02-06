import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { AcademicRankList } from '../../model/index'

export const UseRankedAcademicLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: AcademicRankList
    en: AcademicRankList
    zh: AcademicRankList
    ar: AcademicRankList
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['rank-academic-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/pangkat-akademik-translate/${id}`).then(
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
