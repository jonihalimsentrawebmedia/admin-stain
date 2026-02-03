import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { CalloborationList } from '../../model/index'

export const UseGetCollaborationLanguage = (id: string) => {
  const [language, setLanguage] = useState<{
    id: CalloborationList
    en: CalloborationList
    zh: CalloborationList
    ar: CalloborationList
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-colab-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/kerjasama-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { language, loading }
}
