import { useEffect, useState } from 'react'
import type { IListActivityProgram } from '@/pages/modules/LPPM/devotion/schema/internal/activity-program/data/types.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetActivityProgram = (props?: basicProps) => {
  const { page, limit, search } = props ?? {}
  const [activityProgram, setActivityProgram] = useState<IListActivityProgram[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['activity-program', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/lppm/daftar-skema?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setActivityProgram(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { activityProgram, loading, meta }
}

export const UseGetActivityProgramDetail = (id: string) => {
  const [detail, setDetail] = useState<IListActivityProgram>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['activity-program-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/lppm/daftar-skema/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
