import type { InformationImmediatelyList } from "../model"
import type { Meta } from "@/components/common/table/TablePagination"
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"


const useGetInformationImmediately = () => {

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

  return {
    informationImmediately: data?.data ?? [],
    loading,
    meta: data?.meta,
  }
}

export default useGetInformationImmediately