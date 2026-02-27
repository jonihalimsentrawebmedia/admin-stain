import { useEffect, useState } from 'react'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'
import type { IStudyCenter } from '../data/types'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetStudyCenterList = (props?: basicProps) => {
  const { page, limit, search } = props ?? {}

  const [studyCenter, setStudyCenter] = useState<IStudyCenter[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['study-center', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/pusat-studi?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStudyCenter(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { studyCenter, meta, loading }
}

export const UseGetStudyCenterDetail = (id: string) => {
  const [detail, setDetail] = useState<IStudyCenter>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['study-center-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/pusat-studi/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
