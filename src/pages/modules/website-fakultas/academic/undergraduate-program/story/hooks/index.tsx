import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IStoryMobility } from '../data/types.ts'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetStoryUnderGraduated = (props: BasicProps) => {
  const { search, page, limit } = props

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

  return {
    story: data?.data ?? [] as IStoryMobility[],
    loading,
    meta: data?.meta as Meta | undefined,
  }
}

export const UseGetStoryDetailUnderGraduated = (id: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['story-mobility', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/cerita-international-ungreaduate-program/${id}`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  return { storyDetail: data as IStoryMobility | undefined, loading }
}
