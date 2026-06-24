import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetHistory = () => {
  const { data: history, isLoading, isFetching } = useQuery({
    queryKey: ['history-spi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/sejarah').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { history, loading }
}
