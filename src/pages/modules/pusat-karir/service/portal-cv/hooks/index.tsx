import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetUrlPortalCV = () => {
  const { data, isLoading, isFetching } = useQuery<{ url: string }>({
    queryKey: ['portal-cv'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/portacvats').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { urlPortal: data, loading }
}
