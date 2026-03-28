import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IInboxStory } from '@/pages/modules/website-fakultas/community/alumni/inbox/data/types.tsx'

export const UseGetStoryInbox = () => {
  const [storyInbox, setStoryInbox] = useState<IInboxStory[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['inbox-story'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/cerita-alumni-kontak-masuk').then((res) => res.data),
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
