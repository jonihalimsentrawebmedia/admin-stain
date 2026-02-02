import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IRegistrationPath } from '../../data/types'

export const UseGetLanguageLineRegistered = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: IRegistrationPath
    en: IRegistrationPath
    zh: IRegistrationPath
    ar: IRegistrationPath
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['registered-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/jalur-pendaftaran-translate/${id}`).then(
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
