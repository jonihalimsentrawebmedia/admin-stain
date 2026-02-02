import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IImpactInnovationList } from '../../data/index'

export const UseGetImpactInnovationLanguage = (id?: string) => {
  const [impactInnovationLanguage, setImpactInnovationLanguage] = useState<{
    id: IImpactInnovationList
    en: IImpactInnovationList
    zh: IImpactInnovationList
    ar: IImpactInnovationList
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['news-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/inovasi-berdampak-translate/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setImpactInnovationLanguage(data)
    }
  }, [data])

  return { loading, impactInnovationLanguage }
}
