import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDescriptionCollaboration } from './types.tsx'

export const UseGetDetailCollaboration = () => {
  const { data, isFetching, isLoading } = useQuery<IDescriptionCollaboration>({
    queryKey: ['research-group'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/fakultas/bekerjasama-dengan-kami').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { description: data ?? undefined, loading }
}
