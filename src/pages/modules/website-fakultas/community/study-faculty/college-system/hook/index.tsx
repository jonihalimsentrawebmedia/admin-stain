import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDescriptionCollegeSystem } from './types.tsx'

export const UseGetDetailCollegeSystem = () => {
  const [description, setDescription] = useState<IDescriptionCollegeSystem>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['college-system'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/sistem-perkuliahan').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDescription(data)
    }
  }, [data])

  return { description, loading }
}
