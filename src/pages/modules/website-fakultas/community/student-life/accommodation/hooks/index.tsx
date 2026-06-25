import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDescriptionAccommodation } from './types.tsx'

export const UseGetDetailAccommodation = () => {
  const { data, isFetching, isLoading } = useQuery<IDescriptionAccommodation>({
    queryKey: ['accommodation'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/akomodasi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { description: data, loading }
}
