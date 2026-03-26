import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDescriptionAccommodation } from './types.tsx'

export const UseGetDetailAccommodation = () => {
  const [description, setDescription] = useState<IDescriptionAccommodation>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['accommodation'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/akomodasi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDescription(data)
    }
  }, [data])

  return { description, loading }
}
