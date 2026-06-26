import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IProfileLeader } from '@/pages/modules/LPPM/about/leader/hooks/types.ts'

export const UseGetProfileLeader = () => {
  const { data, isLoading, isFetching } = useQuery<IProfileLeader>({
    queryKey: ['about-profile-leader'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/ketua').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { profileLeader: data, loading }
}
