import type { Meta } from '@/components/common/table/TablePagination'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { IApplicationProcedures, } from '../model'

interface Props {
  isGetAll?: boolean
}
const useGetApplicationProcedures = (props: Props) => {
  const { isGetAll = false } = props
  const [applicationProcedures, setApplicationProcedures] = useState<IApplicationProcedures[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = isGetAll ? '0' : searchParams.get('page') || '1'
  const limit = isGetAll ? '0' : searchParams.get('limit') || '1000'
  const search = searchParams.get('search') || ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery<{
    data: IApplicationProcedures[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['tata-cara-permohonan', ParamsSearch.toString()],
    queryFn: () => AxiosClient.get(`/unit-ppid/tata-cara-permohonan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setApplicationProcedures(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    applicationProcedures,
    loading,
    meta,
  }
}

export default useGetApplicationProcedures
