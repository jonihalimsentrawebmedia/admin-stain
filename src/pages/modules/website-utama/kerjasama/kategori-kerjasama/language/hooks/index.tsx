import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { CalloborationCategoryList } from '../../model/index'

export const UseGetCorporationCategoryLanguage = (id: string) => {
  const [language, setLanguage] = useState<{
    id: CalloborationCategoryList
    en: CalloborationCategoryList
    zh: CalloborationCategoryList
    ar: CalloborationCategoryList
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['corporation-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/kategori-kerjasama-translate/${id}`).then(
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
