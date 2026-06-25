import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"

const useGetAcademicYearActivityDetail = () => {
  const { idActivity } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-acedemic-year-activity', idActivity],
    refetchOnWindowFocus: false,
    enabled: !!idActivity,
    queryFn: () =>
      AxiosClient.get(`/website-utama/tahun-akademik-kegiatan/${idActivity}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { activity: data?.data, loading }
}

export default useGetAcademicYearActivityDetail