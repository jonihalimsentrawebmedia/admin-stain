import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IInboxStory } from '@/pages/modules/website-fakultas/community/alumni/inbox/data/types.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetStoryInbox = (props: BasicProps) => {
  const { page, limit, search } = props

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery<{ data: IInboxStory[]; meta: Meta }>({
    queryKey: ['inbox-story', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/cerita-alumni-kontak-masuk?${Params}`).then((res) => res.data),
  })

  const loading = isFetching || isLoading

  return {
    storyInbox: data?.data ?? [],
    loading,
    meta: data?.meta,
  }
}

export const UseGetDetailStoryInbox = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IInboxStory>({
    queryKey: ['inbox-story', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/cerita-alumni-kontak-masuk/${id}`).then((res) => res.data.data),
  })

  const loading = isFetching || isLoading

  return { loading, detail: data }
}
