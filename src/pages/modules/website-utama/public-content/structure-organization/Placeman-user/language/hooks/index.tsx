import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IPlacemanUser } from '../../data/index'

export const UseGetPlacemanLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: IPlacemanUser
    en: IPlacemanUser
    zh: IPlacemanUser
    ar: IPlacemanUser
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['placeman-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/pejabat-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
