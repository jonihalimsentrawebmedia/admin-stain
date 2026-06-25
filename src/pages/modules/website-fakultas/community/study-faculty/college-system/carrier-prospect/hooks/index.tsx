import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDescriptionCarrierProspect } from './types.tsx'

export const UseGetDetailCarrierProspect = () => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['carrier-prospect'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/prospek-karir').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return {
    description: data as IDescriptionCarrierProspect | undefined,
    loading,
  }
}
