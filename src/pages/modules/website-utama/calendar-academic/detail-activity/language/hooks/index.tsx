import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ActivityDetail } from '../../../model/academicActivityDetail'

export const UseGetYearActivityDetailLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: ActivityDetail
    en: ActivityDetail
    zh: ActivityDetail
    ar: ActivityDetail
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-academic-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/tahun-akademik-uraian-kegiatan-translate/${id}`).then(
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
