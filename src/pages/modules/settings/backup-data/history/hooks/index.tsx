import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination'
import AxiosClient from '@/provider/axios'
import { useSearchParams } from 'react-router-dom'
import type { IBackupHistory } from '../../model'

const useGetBackupHistory = () => {
  const [searchParams] = useSearchParams()

  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''

  const { data, isLoading, isFetching } = useQuery<{
    data: IBackupHistory[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['backup-history', { page, limit, search }],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/backup/history?${searchParams.toString()}`).then(
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

export default useGetBackupHistory
