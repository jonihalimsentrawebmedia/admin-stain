import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IStudentEntertainment } from './types.tsx'

export const UseGetStudentEntertainment = () => {
  const { data, isFetching, isLoading } = useQuery<IStudentEntertainment>({
    queryKey: ['student-entertainment'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/hiburan-mahasiswa').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { description: data, loading }
}
