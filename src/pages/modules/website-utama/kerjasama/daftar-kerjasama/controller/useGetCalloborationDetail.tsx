import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"

const useGetCalloborationDetail = () => {
  const { idCalloboration } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['calloboration-detail'],
    refetchOnWindowFocus: false,
    enabled: !!idCalloboration,
    queryFn: () =>
      AxiosClient.get(`/website-utama/kerjasama/${idCalloboration}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { calloborationDetail: data?.data, loading }
}

export default useGetCalloborationDetail