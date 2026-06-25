import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IStoryMobility } from '../data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

export const UseGetStoryInternationalMobility = (props: BasicProps) => {
  const { search, page, limit } = props

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery<{ data: IStoryMobility[]; meta: Meta }>({
    queryKey: ['story-mobility', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/cerita-international-mobility?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { story: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetStoryDetailInternationalMobility = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IStoryMobility>({
    queryKey: ['story-mobility', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/cerita-international-mobility/${id}`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  return { storyDetail: data, loading }
}
