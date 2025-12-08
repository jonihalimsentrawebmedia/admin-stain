import { useEffect, useState } from 'react'
import type { LogActivity, } from '../model'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { Meta } from '@/components/common/table/TablePagination'
import { useParams, useSearchParams } from 'react-router-dom'

const useGetLogHistory = () => {
  const [searchParams] = useSearchParams()
  const params = useParams()
  const { id } = params
  const [histories, setHistories] = useState<LogActivity[]>([])
  const [meta, setMeta] = useState<Meta>()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['users-list-histories-log', { page, limit, search }],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/activity-logs/logs?user_id=${id}&${searchParams.toString()}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setHistories(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return {
    histories,
    loading,
    meta,
  }
}

export default useGetLogHistory
