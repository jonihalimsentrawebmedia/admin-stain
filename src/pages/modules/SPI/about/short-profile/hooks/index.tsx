import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetShortProfile = () => {
  const { data: shortProfile, isFetching, isLoading } = useQuery({
    queryKey: ['short-profile'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/profile-singkat').then((res) => res.data.data),
  })

  const loading = isFetching || isLoading

  return { loading, shortProfile }
}
