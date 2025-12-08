import { useEffect, useState } from 'react'
import type { UserHistories } from '../model'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { Meta } from '@/components/common/table/TablePagination'
import { useSearchParams } from 'react-router-dom'

const useGetHistoryLogin = () => {
  const [searchParams] = useSearchParams()

  const [histories, setHistories] = useState<UserHistories[]>([])
  const [meta, setMeta] = useState<Meta>()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''
  const level = searchParams.get('level') || ''

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['users-list-histories', { page, limit, search, level }],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/activity-logs?${searchParams.toString()}`).then(
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

export default useGetHistoryLogin
