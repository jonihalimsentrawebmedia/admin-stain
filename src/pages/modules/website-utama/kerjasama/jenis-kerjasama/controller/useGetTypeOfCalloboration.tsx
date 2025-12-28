import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { TypeOfCalloborationList } from "../model"
import type { Meta } from "@/components/common/table/TablePagination"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"

const useGetTypeOfCalloboration = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''

  let ParamsSearch: URLSearchParams

  ParamsSearch = new URLSearchParams({ page, limit, search })

  const [typeOfCalloboration, setTypeOfCalloboration] = useState<TypeOfCalloborationList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery<{
    data: TypeOfCalloborationList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['list-type-of-calloboration', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/website-utama/jenis-kerjasama?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTypeOfCalloboration(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    typeOfCalloboration,
    loading,
    meta,
  }
}

export default useGetTypeOfCalloboration