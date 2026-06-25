import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDescriptionPmb } from './types.tsx'

export const UseGetDetailPmb = () => {
  const { data, isFetching, isLoading } = useQuery<IDescriptionPmb>({
    queryKey: ['description-pmb'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/pmb').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { description: data, loading }
}
