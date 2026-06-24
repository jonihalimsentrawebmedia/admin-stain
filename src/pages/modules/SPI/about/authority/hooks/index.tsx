import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetAuthoritySPI = () => {
  const { data: authority, isFetching, isLoading } = useQuery({
    queryKey: ['authority-spi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/tugas-wewenang').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { authority, loading }
}
