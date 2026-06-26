import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetTracerStudy = () => {
  const { data, isFetching, isLoading } = useQuery<{ link_url: string }>({
    queryKey: ['tracer-study'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/studytracer').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { tracerStudy: data, loading }
}
