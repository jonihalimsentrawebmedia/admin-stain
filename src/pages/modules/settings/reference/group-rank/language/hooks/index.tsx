import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { GroupRankList } from '../../model/index'

export const UseRankedGroupLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: GroupRankList
    en: GroupRankList
    zh: GroupRankList
    ar: GroupRankList
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['rank-category-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/pangkat-golongan-translate/${id}`).then(
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
