import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IInboxStory } from '@/pages/modules/website-fakultas/community/alumni/inbox/data/types.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetStoryInbox = (props: BasicProps) => {
  const { page, limit, search } = props

  const [storyInbox, setStoryInbox] = useState<IInboxStory[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['inbox-story', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/cerita-alumni-kontak-masuk?${Params}`).then((res) => res.data),
  })

  const loading = isFetching || isLoading

  useEffect(() => {
    if (data) {
      setMeta(data?.meta)
      setStoryInbox(data?.data)
    }
  }, [data])

  return { storyInbox, loading, meta }
}

export const UseGetDetailStoryInbox = (id: string) => {
  const [detail, setDetail] = useState<IInboxStory>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['inbox-story', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/cerita-alumni-kontak-masuk/${id}`).then((res) => res.data.data),
  })

  const loading = isFetching || isLoading

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { loading, detail }
}
