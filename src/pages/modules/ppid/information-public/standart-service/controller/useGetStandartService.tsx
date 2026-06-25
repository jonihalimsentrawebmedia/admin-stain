import type {  PublicInformationServiceStandardList,  } from "../model"
import type { Meta } from "@/components/common/table/TablePagination"
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"

interface Props{
    isGetAll?:boolean
}
const useGetStandartService = (props:Props) => {
  const { isGetAll = false } = props

  const [searchParams] = useSearchParams()
  const page = isGetAll ? '0' : searchParams.get('page') || '1'
  const limit = isGetAll ? '0' : searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''
  const title = searchParams.get('title') || ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery<{
    data: PublicInformationServiceStandardList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['ppip-standart-service', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/unit-ppid/standard-pelayanan-informasi-public?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return {
    document: data?.data ?? [],
    loading,
    meta: data?.meta,
    title
  }
}

export default useGetStandartService