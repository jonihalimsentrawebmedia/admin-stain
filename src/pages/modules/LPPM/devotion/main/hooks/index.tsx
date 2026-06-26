import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IMainDevotion } from './types'

export const UseGetMainDevotion = () => {
  const { data, isFetching, isLoading } = useQuery<IMainDevotion>({
    queryKey: ['main-devotion'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/pusat-pengabdian').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { responseData: data, loading }
}
