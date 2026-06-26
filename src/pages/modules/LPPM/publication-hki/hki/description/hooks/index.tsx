import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IHKIDescription } from './types'

export const UseGetBookPublisher = () => {
  const { data, isFetching, isLoading } = useQuery<IHKIDescription>({
    queryKey: ['hki-description'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/deskripsi-kl').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { responseData: data, loading }
}
