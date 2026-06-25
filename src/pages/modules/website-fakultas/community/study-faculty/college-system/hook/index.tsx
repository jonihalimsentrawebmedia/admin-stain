import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDescriptionCollegeSystem } from './types.tsx'

export const UseGetDetailCollegeSystem = () => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['college-system'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/sistem-perkuliahan').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return {
    description: data as IDescriptionCollegeSystem | undefined,
    loading,
  }
}
