import { useEffect, useState } from "react"
import type { StaffProfile } from "../model/staff"
import { useParams, useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import type { Meta } from "@/components/common/table/TablePagination"
import AxiosClient from "@/provider/axios"

const useGetStaff = () => {
 const [staff, setStaff] = useState<StaffProfile[]>([])
  const [meta, setMeta] = useState<Meta>()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['program-studi-staff',ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id}/staff?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
        console.log(data)
      setStaff(data?.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { staff, loading, meta }
}

export default useGetStaff