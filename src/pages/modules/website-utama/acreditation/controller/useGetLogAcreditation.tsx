import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"

const useGetLogAcreditation = () => {
  const { idAcreditation } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-list-acreditation'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/akreditas-log/${idAcreditation}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { log: data?.data ?? [], loading, meta: data?.meta }
}

export default useGetLogAcreditation