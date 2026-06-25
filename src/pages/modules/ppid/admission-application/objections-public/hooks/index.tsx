import type { ObjectionsPublic, ObjectionLog } from '../model'
import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination'
import { useSearchParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios'
interface Props {
  isGetAll?: boolean
}
export const useGetObjectionsPublic = (props: Props) => {
  const { isGetAll = false } = props

  const [searchParams] = useSearchParams()
  const page = isGetAll ? '0' : searchParams.get('page') || '1'
  const limit = isGetAll ? '0' : searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery<{
    data: ObjectionsPublic[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['objections-public', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/unit-ppid/permohonan-keberatan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { objecionsPublic: data?.data ?? [], meta: data?.meta, loading }
}
export const useGetObjectionsPublicDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<{
    data: ObjectionsPublic
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['objections-public-detail', id],
    queryFn: () => AxiosClient.get(`/unit-ppid/permohonan-keberatan/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { objectionPublic: data?.data ?? undefined, loading }
}
export const useGetObjectionsPublicLog = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<{
    data: ObjectionLog
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['objections-public-log', id],
    queryFn: () => AxiosClient.get(`/unit-ppid/permohonan-keberatan-riwayat/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { objectionPublicLog: data?.data ?? undefined, loading }
}
