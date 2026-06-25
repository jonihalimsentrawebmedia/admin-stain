import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDescriptionGroupSkill } from './types.tsx'

export const UseGetDetailStudyResearch = () => {
  const { data, isFetching, isLoading } = useQuery<IDescriptionGroupSkill>({
    queryKey: ['study-research'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/riset-dan-penelitian').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { description: data ?? undefined, loading }
}
