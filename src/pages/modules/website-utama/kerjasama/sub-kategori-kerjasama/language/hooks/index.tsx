import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { SubCalloborationCategory } from '../../model/index'

export const UseGetCorporationSubCategoryLanguage = (id: string) => {
  const [language, setLanguage] = useState<{
    id: SubCalloborationCategory
    en: SubCalloborationCategory
    zh: SubCalloborationCategory
    ar: SubCalloborationCategory
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['corporation-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/sub-kategori-kerjasama-translate/${id}`).then(
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
