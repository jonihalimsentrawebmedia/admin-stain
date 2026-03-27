import { useEffect, useState } from 'react'
import type { ICurriculum } from '@/pages/modules/website-prodi/curriculum/data/types.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

interface Props extends BasicProps {
  id_prodi: string
}

export const UseGetCurriculumPerProdi = (props?: Props) => {
  const { id_prodi, search, page, limit } = props ?? {}

  const [curriculum, setCurriculum] = useState<ICurriculum[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (id_prodi) Params.append('id_prodi', id_prodi)
  if (search) Params.append('search', search ?? '')
  if (page) Params.append('page', page ?? '0')
  if (limit) Params.append('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['curriculum-faculty', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/kurikulum?${Params}`).then((res) => res.data),
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
