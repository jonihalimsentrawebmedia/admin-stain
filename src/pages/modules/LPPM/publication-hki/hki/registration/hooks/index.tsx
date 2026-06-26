import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IHKIRegistration } from './types'

export const UseGetBookPublisher = () => {
  const { data, isFetching, isLoading } = useQuery<IHKIRegistration>({
    queryKey: ['hki-registration'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/pendaftaran-kl').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { responseData: data, loading }
}
