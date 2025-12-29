import { useParams, useSearchParams } from 'react-router-dom'
import type { LogActivity } from '../../../calendar-academic/model'
import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetLogFieldOfCooperation = () => {
  const [log, setLog] = useState<LogActivity[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { idFieldOfCooperation } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-field-of-cooperation', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(
        `/website-utama/bidang-kerjasama-log/${idFieldOfCooperation}?${ParamsSearch}`
      ).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLog(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { log, loading, meta }
}

export default useGetLogFieldOfCooperation
