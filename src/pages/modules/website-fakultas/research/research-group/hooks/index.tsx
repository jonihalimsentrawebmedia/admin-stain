import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDescriptionGroupSkill } from './types.tsx'

export const UseGetDetailGroupSKill = () => {
  const { data, isFetching, isLoading } = useQuery<IDescriptionGroupSkill>({
    queryKey: ['group-skill'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/kelompok-penelitian').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { description: data ?? undefined, loading }
}
