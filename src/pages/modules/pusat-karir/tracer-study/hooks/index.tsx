import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetTracerStudy = () => {
  const [tracerStudy, setTracerStudy] = useState<{ url: string }>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['tracer-study'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/studytracer').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTracerStudy(data)
    }
  }, [data])

  return { tracerStudy, loading }
}
