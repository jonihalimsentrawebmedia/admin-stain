import { useEffect, useState } from "react"
import type {  PublicInformationRegulationEnviromentList,  } from "../model"
import type { Meta } from "@/components/common/table/TablePagination"
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"

interface Props{
    isGetAll?:boolean
}
const useGetRegulationEnviroment = (props:Props) => {
  const { isGetAll = false } = props
  const [document, setDocument] = useState<PublicInformationRegulationEnviromentList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = isGetAll ? '0' : searchParams.get('page') || '1'
  const limit = isGetAll ? '0' : searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''
  const title = searchParams.get('title') || ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery<{
    data: PublicInformationRegulationEnviromentList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['ppip-regulation-enviroment', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/unit-ppid/regulasi-lingkungan-dokumen?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDocument(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    document,
    loading,
    meta,title
  }
}

export default useGetRegulationEnviroment