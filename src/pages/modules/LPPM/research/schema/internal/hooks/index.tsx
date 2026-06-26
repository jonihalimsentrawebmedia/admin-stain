import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IMainResearch } from './types'

export const UseGetSchemaInternalResearch = () => {
  const { data, isFetching, isLoading } = useQuery<IMainResearch>({
    queryKey: ['internal-research'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/pendanaan-internal').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { responseData: data, loading }
}
