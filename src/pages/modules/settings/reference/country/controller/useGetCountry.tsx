import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { CountryList } from "../model"
import type { Meta } from "@/components/common/table/TablePagination"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"

interface Props {
  isGetAll?: boolean
}
const useGetCountry = (props?: Props) => {
 const { isGetAll = false } = props ?? {}
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''

  let ParamsSearch: URLSearchParams
  if (isGetAll) {
    ParamsSearch = new URLSearchParams({ page: '1', limit: '10000' })
    ParamsSearch.append('search', search)
  } else {
    ParamsSearch = new URLSearchParams({ page, limit, search })
  }

  const [country, setCountry] = useState<CountryList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery<{
    data: CountryList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['settings-country', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/negara?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCountry(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    country,
    loading,
    meta,
  }
}

export default useGetCountry