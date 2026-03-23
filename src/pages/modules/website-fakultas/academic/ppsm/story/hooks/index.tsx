import { useEffect, useState } from 'react'
import type { IStoryPPSM } from '@/pages/modules/website-fakultas/academic/ppsm/story/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetStoryPPSM = () => {
  const [story, setStory] = useState<IStoryPPSM[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['story-ppsm'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/cerita-ppsm').then((res) => res.data),
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

export const UseGetStoryPPSMDetail = (id: string) => {
  const [storyDetail, setStoryDetail] = useState<IStoryPPSM>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['story-ppsm', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/cerita-ppsm/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStoryDetail(data)
    }
  }, [data])

  return { storyDetail, loading }
}
