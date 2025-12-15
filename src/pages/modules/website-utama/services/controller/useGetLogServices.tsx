import  { useEffect, useState } from 'react'
import type { LogActivity } from '../../calendar-academic/model'
import type { Meta } from '@/components/common/table/TablePagination'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { useParams, useSearchParams } from 'react-router-dom'

const useGetLogServices = () => {
 const [log, setLog] = useState<LogActivity[]>([])
  const [meta, setMeta] = useState<Meta>()
    const {id}=useParams()
 
const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-services',{ page, limit, search }],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/layanan-log/${id}?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLog(data?.data??[])
      setMeta(data?.meta)
    }
  }, [data])

  return { log, loading, meta }
}

export default useGetLogServices