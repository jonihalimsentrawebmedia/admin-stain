import { useParams } from "react-router-dom"
import type { AcademicActivity } from "../model/academicActivity"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import AxiosClient from "@/provider/axios"

const useGetAcademicYearActivityDetail = () => {
 const [activity, setActivity] = useState<AcademicActivity>()
  const { idActivity } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-acedemic-year-activity'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/tahun-akademik-kegiatan/${idActivity}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setActivity(data?.data)
    }
  }, [data])

  return { activity, loading }
}

export default useGetAcademicYearActivityDetail