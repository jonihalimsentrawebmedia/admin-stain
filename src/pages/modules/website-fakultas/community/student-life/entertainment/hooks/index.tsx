import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IStudentEntertainment } from './types.tsx'

export const UseGetStudentEntertainment = () => {
  const [description, setDescription] = useState<IStudentEntertainment>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['student-entertainment'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/hiburan-mahasiswa').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDescription(data)
    }
  }, [data])

  return { description, loading }
}
