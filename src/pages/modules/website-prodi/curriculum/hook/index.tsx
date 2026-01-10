import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ICurriculum } from '@/pages/modules/website-prodi/curriculum/data/types.tsx'

interface DataProps {
  page?: string
  limit?: string
  search?: string
}

export const UseGetCurriculum = (props?: DataProps) => {
  const { page, limit, search } = props ?? {}

  const [curriculum, setCurriculum] = useState<ICurriculum[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['curriculum', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/kurikulum?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCurriculum(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { curriculum, loading, meta }
}

export const UseGetCurriculumDetail = (id: string) => {
  const [detailCurriculum, setDetailCurriculum] = useState<ICurriculum>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-curriculum', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/kurikulum/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailCurriculum(data)
    }
  }, [data])

  return { detailCurriculum, loading }
}
