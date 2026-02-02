import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IFacilitiesDetail } from '../../data/index'

export const UseGetFacilitiesLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: IFacilitiesDetail
    en: IFacilitiesDetail
    zh: IFacilitiesDetail
    ar: IFacilitiesDetail
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['news-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/fasilitas-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
