import { useSearchParams } from 'react-router-dom'
import type { DomainList } from '../model'
import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination'
import AxiosClient from '@/provider/axios'

const useGetDomain = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''
  const kelompok = searchParams.get('kelompok') || ''

  const { data, isLoading, isFetching } = useQuery<{
    data: DomainList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['settings-domain', { page, limit, search, kelompok }],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/domains?${searchParams.toString()}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    domains: data?.data ?? [],
    loading,
    meta: data?.meta,
  }
}

export default useGetDomain
