import { useEffect, useState } from "react"
import type { ServiceCommitmentList } from "../model"
import type { Meta } from "@/components/common/table/TablePagination"
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"


const useGetServiceCommitment = () => {

  const [serviceCommitment, setServiceCommitment] = useState<ServiceCommitmentList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery<{
    data: ServiceCommitmentList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['service-commitment-unit-ppid', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(
        `/unit-ppid/maklumat-layanan?${ParamsSearch}`
      ).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setServiceCommitment(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    serviceCommitment,
    loading,
    meta,
  }
}

export default useGetServiceCommitment