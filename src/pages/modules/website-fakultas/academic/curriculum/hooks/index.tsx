import { useEffect, useState } from 'react'
import type { ICurriculum } from '@/pages/modules/website-prodi/curriculum/data/types.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetCurriculumPerProdi = () => {
  const [curriculum, setCurriculum] = useState<ICurriculum[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['curriculum-faculty'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/kurikulum').then((res) => res.data),
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
  const [curriculumDetail, setCurriculumDetail] = useState<ICurriculum>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['curriculum-faculty', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/kurikulum/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCurriculumDetail(data)
    }
  }, [data])

  return { curriculumDetail, loading }
}
