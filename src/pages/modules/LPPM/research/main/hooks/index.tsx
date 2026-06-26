import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IMainResearch } from './types'

export const UseGetMainResearch = () => {
  const { data, isFetching, isLoading } = useQuery<IMainResearch>({
    queryKey: ['main-research'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/pusat-penelitian').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { responseData: data, loading }
}
