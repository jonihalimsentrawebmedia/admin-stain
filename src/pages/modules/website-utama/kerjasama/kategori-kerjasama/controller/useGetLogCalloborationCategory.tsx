import { useParams, useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"

const useGetLogCalloborationCategory = () => {
  const { idCalloborationCategory } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-list-calloboration-log', idCalloborationCategory, ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    enabled: !!idCalloborationCategory,
    queryFn: () =>
      AxiosClient.get(`/website-utama/kategori-kerjasama-log/${idCalloborationCategory}?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { log: data?.data ?? [], loading, meta: data?.meta }
}

export default useGetLogCalloborationCategory