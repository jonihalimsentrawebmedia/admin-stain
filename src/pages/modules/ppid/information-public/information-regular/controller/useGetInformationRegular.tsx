import type { IInformationRegular } from "../model"
import type { Meta } from "@/components/common/table/TablePagination"
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"

interface Props{
    isGetAll?:boolean
}
const useGetInformationRegular = (props:Props) => {
  const { isGetAll = false } = props

  const [searchParams] = useSearchParams()
  const page = isGetAll ? '0' : searchParams.get('page') || '1'
  const limit = isGetAll ? '0' : searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery<{
    data: IInformationRegular[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['information-regular-ppip', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/unit-ppid/informasi-berkala-kategori?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return {
    document: data?.data ?? [],
    loading,
    meta: data?.meta,
  }
}

export default useGetInformationRegular