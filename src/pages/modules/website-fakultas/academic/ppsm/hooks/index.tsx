import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDescriptionPPSM } from './types.tsx'

export const UseGetDetailPPSM = () => {
  const { data, isFetching, isLoading } = useQuery<IDescriptionPPSM>({
    queryKey: ['ppsm-faculty'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/deskripsi-ppsm').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { description: data, loading }
}
