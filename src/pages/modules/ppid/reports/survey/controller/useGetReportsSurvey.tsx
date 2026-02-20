import type { Meta } from '@/components/common/table/TablePagination'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { ReportSurvey } from '../model'

interface Props {
  isGetAll?: boolean
}
const useGetReportsSurvey = (props: Props) => {
  const { isGetAll = false } = props
  const [reports, setReports] = useState<ReportSurvey[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = isGetAll ? '0' : searchParams.get('page') || '1'
  const limit = isGetAll ? '0' : searchParams.get('limit') || '1000'
  const search = searchParams.get('search') || ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery<{
    data: ReportSurvey[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['reports-survey', ParamsSearch.toString()],
    queryFn: () => AxiosClient.get(`/unit-ppid/survei-layanan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setReports(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    reports,
    loading,
    meta,
  }
}

export default useGetReportsSurvey
