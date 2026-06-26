import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IMediaBook } from './types'

export const UseGetBookPublisher = () => {
  const { data, isFetching, isLoading } = useQuery<IMediaBook>({
    queryKey: ['book-media'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/penerbitan-media-masa').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { responseData: data, loading }
}
