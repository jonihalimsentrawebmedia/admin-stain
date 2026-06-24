import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetCreditEarning = () => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['program-earning'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusilkom/program-credit-earning').then((res) => res.data.data),
  })

  const loading = isFetching || isLoading

  return { loading, creditEarning: data }
}
