import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IProfileLeaderData } from './types.ts'

export const UseGetGreetingLeader = () => {
  const { data, isLoading, isFetching } = useQuery<IProfileLeaderData>({
    queryKey: ['about-greeting-leader'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/sambutan-kepala').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { profileLeader: data, loading }
}
