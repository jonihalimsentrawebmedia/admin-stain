import type { ProfileData } from './types.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetConsultationCarrier = () => {
  const { data, isFetching, isLoading } = useQuery<ProfileData>({
    queryKey: ['consultation-carrier'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/konsultasi-karir').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { consultation: data, loading }
}
