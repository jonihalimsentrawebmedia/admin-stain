import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IRegistrationPath } from '../../data/types'

export const UseGetLanguageLineRegistered = (id?: string) => {
  const { data, isLoading, isFetching } = useQuery<{
    id: IRegistrationPath
    en: IRegistrationPath
    zh: IRegistrationPath
    ar: IRegistrationPath
  }>({
    queryKey: ['registered-language', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/website-utama/jalur-pendaftaran-translate/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { loading, language: data }
}
