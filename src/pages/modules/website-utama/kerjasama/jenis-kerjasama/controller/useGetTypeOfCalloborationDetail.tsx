import { useParams } from "react-router-dom"
import type { TypeOfCalloborationList } from "../model"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"

const useGetTypeOfCalloborationDetail = () => {
 const [typeOfCalloborationDetail, setTypeOfCalloborationDetail] =
    useState<TypeOfCalloborationList>()
  const { idTypeOfCalloboration } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['type-of-calloboration-detail'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/jenis-kerjasama/${idTypeOfCalloboration}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTypeOfCalloborationDetail(data?.data)
    }
  }, [data])

  return { typeOfCalloborationDetail, loading }
}

export default useGetTypeOfCalloborationDetail