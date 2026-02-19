import { useEffect, useState } from "react"
import type { InformationImmediatelyList,  } from "../model"
import type { Meta } from "@/components/common/table/TablePagination"
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"


const useGetInformationImmediately = () => {

  const [informationImmediately, setInformationImmediately] = useState<InformationImmediatelyList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery<{
    data: InformationImmediatelyList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['information-immediately-unit-ppid', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(
        `/unit-ppid/informasi-serta-merta-informasi?${ParamsSearch}`
      ).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setInformationImmediately(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    informationImmediately,
    loading,
    meta,
  }
}

export default useGetInformationImmediately