import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IIdentityCampus } from '../../types'

export const UseGetIdentityLanguage = () => {
  const [language, setLanguage] = useState<{
    id: IIdentityCampus
    en: IIdentityCampus
    zh: IIdentityCampus
    ar: IIdentityCampus
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['year-academic-language'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/identitas-translate`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
