import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IStudentOrganization } from './types.tsx'

export const UseGetStudentOrganization = () => {
  const { data, isFetching, isLoading } = useQuery<IStudentOrganization>({
    queryKey: ['student-organization'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/organisasi-mahasiswa').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { description: data, loading }
}
