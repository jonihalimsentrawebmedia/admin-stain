import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IStoryMobility } from '../data/types.ts'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetStoryUnderGraduated = (props: BasicProps) => {
  const { search, page, limit } = props

  const [story, setStory] = useState<IStoryMobility[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['story-undergraduate', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/cerita-international-ungreaduate-program?${Params}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStory(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { story, loading, meta }
}

export const UseGetStoryDetailUnderGraduated = (id: string) => {
  const [storyDetail, setStoryDetail] = useState<IStoryMobility>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['story-mobility', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/cerita-international-ungreaduate-program/${id}`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStoryDetail(data)
    }
  }, [data])

  return { storyDetail, loading }
}
