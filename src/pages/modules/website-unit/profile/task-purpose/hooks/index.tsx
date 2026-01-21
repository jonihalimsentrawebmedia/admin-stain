import { useEffect, useState } from 'react'
import type { ITaskPurpose } from '@/pages/modules/website-unit/profile/task-purpose/data'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetTaskPurpose = () => {
  const [taskPurpose, setTaskPurpose] = useState<ITaskPurpose>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['task-purpose'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/unit/profil/tujuan-fungsi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTaskPurpose(data)
    }
  }, [data])

  return { taskPurpose, loading }
}
