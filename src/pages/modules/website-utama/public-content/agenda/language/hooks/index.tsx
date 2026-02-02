import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAgendaDetail } from '../../data/index'

export const UseGetAgendaLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: IAgendaDetail
    en: IAgendaDetail
    zh: IAgendaDetail
    ar: IAgendaDetail
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['news-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/agenda-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
