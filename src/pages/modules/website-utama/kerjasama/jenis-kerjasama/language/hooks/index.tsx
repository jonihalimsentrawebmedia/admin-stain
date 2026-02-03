import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { TypeOfCalloborationList } from '../../model/index'

export const UseGetTypeCollaborationLanguage = (id: string) => {
  const [language, setLanguage] = useState<{
    id: TypeOfCalloborationList
    en: TypeOfCalloborationList
    zh: TypeOfCalloborationList
    ar: TypeOfCalloborationList
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['collaboration-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/jenis-kerjasama-translate/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { language, loading }
}
