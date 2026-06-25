import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IGaleriAlbum } from '../data/types.ts'

export const UseGetGalleryAlbum = (props?: BasicProps) => {
  const { search, limit, page } = props ?? {}

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (limit) Params.append('limit', limit ?? '10')
  if (page) Params.append('page', page ?? '1')

  const { data, isLoading, isFetching } = useQuery<{ data: IGaleriAlbum[]; meta: Meta }>({
    queryKey: ['gallery-album', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/galeri-album?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { album: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetGalleryAlbumDetail = (id_album: string) => {
  const { data, isLoading, isFetching } = useQuery<{ data: IGaleriAlbum }>({
    queryKey: ['gallery-album-detail', id_album],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/galeri-album/${id_album}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { albumDetail: data?.data, loading }
}
