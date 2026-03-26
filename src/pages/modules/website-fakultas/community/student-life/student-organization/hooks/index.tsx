import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IStudentOrganization } from './types.tsx'

export const UseGetStudentOrganization = () => {
  const [description, setDescription] = useState<IStudentOrganization>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['student-organization'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/organisasi-mahasiswa').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDescription(data)
    }
  }, [data])

  return { description, loading }
}
