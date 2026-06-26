import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDevotionHub } from './types'

export const UseGetMainDevotion = () => {
  const { data, isFetching, isLoading } = useQuery<IDevotionHub>({
    queryKey: ['hub-devotion'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/stain-hub').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { responseData: data, loading }
}
