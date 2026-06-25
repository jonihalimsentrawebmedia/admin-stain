import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IGaleriVideo } from '../data/types'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetGalleryVideo = (props?: BasicProps) => {
  const { search, limit, page } = props ?? {}

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (limit) Params.append('limit', limit ?? '10')
  if (page) Params.append('page', page ?? '1')

  const { data, isLoading, isFetching } = useQuery<{ data: IGaleriVideo[]; meta: Meta }>({
    queryKey: ['gallery-video', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/galeri-video?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { video: data?.data ?? [], loading, meta: data?.meta }
}
