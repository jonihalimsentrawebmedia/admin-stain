import { useEffect, useState } from 'react'
import type { IStoryPPSM } from '@/pages/modules/website-fakultas/academic/ppsm/story/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetStoryPPSM = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const [story, setStory] = useState<IStoryPPSM[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['story-ppsm', , Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/cerita-ppsm?${Params}`).then((res) => res.data),
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
