import { useParams } from "react-router-dom"
import type { CalloborationList } from "../model"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"
import { useEffect, useState } from "react"

const useGetCalloborationDetail = () => {
 const [calloborationDetail, setCalloborationDetail] = useState<CalloborationList>()
  const { idCalloboration } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['calloboration-detail'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/kerjasama/${idCalloboration}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCalloborationDetail(data?.data)
    }
  }, [data])

  return { calloborationDetail, loading }
}

export default useGetCalloborationDetail