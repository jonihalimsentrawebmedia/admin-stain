import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"

const useGetStatistic = () => {
  const { data, isLoading, isFetching ,refetch} = useQuery({
    queryKey: ['statistic',],
    refetchOnWindowFocus: false,
    
    queryFn: () => AxiosClient.get(`/website-utama/statistik`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { statistic: data?.data, loading, refetch }
}

export default useGetStatistic