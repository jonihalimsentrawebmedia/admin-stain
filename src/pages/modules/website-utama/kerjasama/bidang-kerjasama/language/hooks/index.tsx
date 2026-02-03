import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { FieldOfCooperationList } from '../../model/index'

export const UseGetFieldCollaborationLanguage = (id: string) => {
  const [language, setLanguage] = useState<{
    id: FieldOfCooperationList
    en: FieldOfCooperationList
    zh: FieldOfCooperationList
    ar: FieldOfCooperationList
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['field-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/bidang-kerjasama-translate/${id}`).then(
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
