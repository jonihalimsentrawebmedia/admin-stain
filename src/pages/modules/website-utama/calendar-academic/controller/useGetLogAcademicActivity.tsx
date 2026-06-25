import { useParams, useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"

const useGetLogAcademicActivity = () => {
  const { idActivity } = useParams()
    const [searchParams] = useSearchParams()
 const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
    const ParamsSearch = new URLSearchParams({ page, limit, search })
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-list-acedemic-year-activity', idActivity, ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    enabled: !!idActivity,
    queryFn: () =>
      AxiosClient.get(`/website-utama/tahun-akademik-kegiatan-log/${idActivity}?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { log: data?.data ?? [], loading, meta: data?.meta }
}

export default useGetLogAcademicActivity