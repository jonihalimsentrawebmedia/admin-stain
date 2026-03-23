import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IStoryMobility } from '../data/types.ts'

export const UseGetStoryInternationalMobility = () => {
  const [story, setStory] = useState<IStoryMobility[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['story-mobility'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/fakultas/cerita-international-mobility').then((res) => res.data),
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

export const UseGetStoryDetailInternationalMobility = (id: string) => {
  const [storyDetail, setStoryDetail] = useState<IStoryMobility>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['story-mobility', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/cerita-international-mobility/${id}`).then(
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
