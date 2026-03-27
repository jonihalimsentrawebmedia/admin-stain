import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDescription } from './types.tsx'

export const UseGetDetailMobilityFaculty = () => {
  const [description, setDescription] = useState<IDescription>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['mobility-faculty'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/fakultas/deskripsi-international-mobility').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDescription(data)
    }
  }, [data])

  return { description, loading }
}
