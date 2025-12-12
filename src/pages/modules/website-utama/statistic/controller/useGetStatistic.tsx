import { useEffect, useState } from "react"
import type { StatisticUniversity } from "../model"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"

const useGetStatistic = () => {
 const [statistic, setStatistic] = useState<StatisticUniversity>()
  





 

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['statistic',],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/statistik`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatistic(data?.data )
 
    }
  }, [data])

  return { statistic, loading,  }
}

export default useGetStatistic