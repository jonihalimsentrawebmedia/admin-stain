import { useEffect, useState } from 'react'
import type { IActivityProgram } from '@/pages/modules/LPPM/research/schema/internal/activity/data/types.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetActivityProgram = (props?: basicProps) => {
  const { page, limit, search } = props ?? {}

  const [activity, setActivity] = useState<IActivityProgram[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['activity-program', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lppm/daftar-program-kegiatan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setActivity(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { activity, meta, loading }
}

export const UseGetActivityProgramDetail = (id: string) => {
  const [detail, setDetail] = useState<IActivityProgram>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['activity-program-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lppm/daftar-program-kegiatan/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
