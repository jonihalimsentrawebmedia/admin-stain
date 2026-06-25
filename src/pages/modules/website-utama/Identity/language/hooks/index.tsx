import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IIdentityCampus } from '../../types'

export const UseGetIdentityLanguage = () => {
  const { data, isLoading, isFetching } = useQuery<{
    id: IIdentityCampus
    en: IIdentityCampus
    zh: IIdentityCampus
    ar: IIdentityCampus
  }>({
    queryKey: ['identity-language'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/identitas-translate`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { loading, language: data }
}
