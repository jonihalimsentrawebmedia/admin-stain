import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IProfileHospital } from '../data/types.ts'

export const UseGetProfileHospital = () => {
  const { data, isLoading, isFetching } = useQuery<IProfileHospital>({
    queryKey: ['profile-hospital'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/simrs/profil/rumah-sakit').then((res) => res.data?.data),
  })
  const loading = isLoading || isFetching
  return { profile: data, loading }
}
