import type { UserHistories } from '../model'
import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination'
import AxiosClient from '@/provider/axios'
import { useSearchParams } from 'react-router-dom'

const useGetHistoryLogin = () => {
  const [searchParams] = useSearchParams()

  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''
  const level = searchParams.get('level') || ''

  const { data, isLoading, isFetching } = useQuery<{
    data: UserHistories[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['users-list-histories', { page, limit, search, level }],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/activity-logs?${searchParams.toString()}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return {
    histories: data?.data ?? [],
    loading,
    meta: data?.meta,
  }
}

export default useGetHistoryLogin
