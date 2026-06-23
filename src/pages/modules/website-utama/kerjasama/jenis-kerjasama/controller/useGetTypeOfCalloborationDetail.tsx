import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"

const useGetTypeOfCalloborationDetail = () => {
  const { idTypeOfCalloboration } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['type-of-calloboration-detail'],
    refetchOnWindowFocus: false,
    enabled: !!idTypeOfCalloboration,
    queryFn: () =>
      AxiosClient.get(`/website-utama/jenis-kerjasama/${idTypeOfCalloboration}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { typeOfCalloborationDetail: data?.data, loading }
}

export default useGetTypeOfCalloborationDetail