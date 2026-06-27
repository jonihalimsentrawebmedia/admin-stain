import type { ITaskPurpose } from '@/pages/modules/website-unit/profile/task-purpose/data'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetTaskPurpose = () => {
  const { data, isLoading, isFetching } = useQuery<ITaskPurpose>({
    queryKey: ['task-purpose'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/unit/profil/tujuan-fungsi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { taskPurpose: data, loading }
}
