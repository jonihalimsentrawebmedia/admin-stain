import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IStoryPPSM } from '@/pages/modules/website-fakultas/academic/ppsm/story/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

export const UseGetStoryPPSM = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery<{ data: IStoryPPSM[]; meta: Meta }>({
    queryKey: ['story-ppsm', , Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/cerita-ppsm?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { story: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetStoryPPSMDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IStoryPPSM>({
    queryKey: ['story-ppsm', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/cerita-ppsm/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { storyDetail: data, loading }
}
