import { useEffect, useState } from 'react'
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
  const [objecionsPublic, setObjectionsPublic] = useState<ObjectionsPublic[]>([])

  const [meta, setMeta] = useState<Meta>()

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

  useEffect(() => {
    if (data) {
      setObjectionsPublic(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { objecionsPublic, meta, loading }
}
export const useGetObjectionsPublicDetail = (id: string) => {
  const [objectionPublic, setObjectionPublic] = useState<ObjectionsPublic>()

  const { data, isLoading, isFetching } = useQuery<{
    data: ObjectionsPublic
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['objections-public-detail', id],
    queryFn: () => AxiosClient.get(`/unit-ppid/permohonan-keberatan/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setObjectionPublic(data.data ?? undefined)
    }
  }, [data])

  return { objectionPublic, loading }
}
export const useGetObjectionsPublicLog = (id: string) => {
  const [objectionPublicLog, setObjectionPublicLog] = useState<ObjectionLog>()

  const { data, isLoading, isFetching } = useQuery<{
    data: ObjectionLog
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['objections-public-log', id],
    queryFn: () => AxiosClient.get(`/unit-ppid/permohonan-keberatan/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setObjectionPublicLog(data.data ?? undefined)
    }
  }, [data])

  return { objectionPublicLog, loading }
}
