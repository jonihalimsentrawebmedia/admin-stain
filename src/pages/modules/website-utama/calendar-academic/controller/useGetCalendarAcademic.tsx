import { useEffect, useState } from "react"
import type { AcademicYearList } from "../model"
import type { Meta } from "@/components/common/table/TablePagination"
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"

const useGetCalendarAcademic = () => {
  const [academicYearList, setAcademicYearList] = useState<AcademicYearList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-acedemic-year', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/tahun-akademik?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAcademicYearList(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { academicYearList, loading, meta }
}

export default useGetCalendarAcademic