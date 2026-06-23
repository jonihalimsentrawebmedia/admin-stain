import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"

const useGetBgAcreditation = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['bg-acreditation'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/akreditas-background`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return {  loading, background: data?.data ?? [] }
}

export default useGetBgAcreditation
