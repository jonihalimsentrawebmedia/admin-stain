import type { IStoryAlumni } from '../data/types'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetStoryAlumni = (props: BasicProps) => {
  const { page, limit, search } = props

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery<{
    data: IStoryAlumni[]
    meta: Meta
  }>({
    queryKey: ['story-alumni', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/cerita-alumni?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    story: data?.data ?? [],
    loading,
    meta: data?.meta,
  }
}

export const UseGetDetailStoryAlumni = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IStoryAlumni>({
    queryKey: ['story-ppsm', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/cerita-alumni/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { storyDetail: data, loading }
}
