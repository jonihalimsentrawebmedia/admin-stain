import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IMainDevotion } from './types'

export const UseGetSchemaDevotion = () => {
  const { data, isFetching, isLoading } = useQuery<IMainDevotion>({
    queryKey: ['schema-devotion'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/lppm/pengabdian-pendanaan-internal').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { responseData: data, loading }
}
