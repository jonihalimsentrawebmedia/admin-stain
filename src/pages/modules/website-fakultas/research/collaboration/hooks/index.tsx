import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDescriptionCollaboration } from './types.tsx'

export const UseGetDetailCollaboration = () => {
  const [description, setDescription] = useState<IDescriptionCollaboration>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['research-group'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/fakultas/bekerjasama-dengan-kami').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDescription(data)
    }
  }, [data])

  return { description, loading }
}
