import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IGroupOrganization } from '../../data/index'

export const UseGetStructureOrganizationLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: IGroupOrganization
    en: IGroupOrganization
    zh: IGroupOrganization
    ar: IGroupOrganization
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['group-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/kelompok-organisasi-translate/${id}`).then(
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
