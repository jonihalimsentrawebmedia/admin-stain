import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDescription } from './types.tsx'

export const UseGetDetailMobilityFaculty = () => {
  const { data, isFetching, isLoading } = useQuery<IDescription>({
    queryKey: ['mobility-faculty'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/fakultas/deskripsi-international-mobility').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { description: data, loading }
}
