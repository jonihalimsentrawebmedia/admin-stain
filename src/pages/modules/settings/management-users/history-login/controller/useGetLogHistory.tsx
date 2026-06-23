import type { LogActivity } from '../model'
import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination'
import AxiosClient from '@/provider/axios'
import { useParams, useSearchParams } from 'react-router-dom'

const useGetLogHistory = () => {
  const [searchParams] = useSearchParams()
  const params = useParams()
  const { id } = params
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''

  const { data, isLoading, isFetching } = useQuery<{
    data: LogActivity[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['users-list-histories-log', { page, limit, search }],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/activity-logs/logs?user_id=${id}&${searchParams.toString()}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return {
    histories: (data?.data as LogActivity[]) ?? [],
    loading,
    meta: data?.meta,
  }
}

export default useGetLogHistory
