import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IGaleriAlbum } from '../data/types'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

interface AlbumProps extends BasicProps {
  id_unit: string
}

export const UseGetGalleryAlbum = (props: AlbumProps) => {
  const { id_unit, page, limit, search } = props

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IGaleriAlbum[]; meta: Meta }>({
    queryKey: ['gallery-album', id_unit, Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/satuan-organisasi/${id_unit}/galeri-album?${Params}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { album: data?.data ?? [], loading, meta: data?.meta }
}

interface PhotoProps extends BasicProps {
  id_unit: string
  id_album: string
}
export const UseGetGalleryPhoto = (props: PhotoProps) => {
  const { id_unit, page, limit, search, id_album } = props

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')
  if (id_album) Params.append('id_album', id_album ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IGaleriAlbum[]; meta: Meta }>({
    queryKey: ['gallery-photo', id_unit, Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/satuan-organisasi/${id_unit}/galeri-foto?${Params}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { photo: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetGalleryVideo = (props: AlbumProps) => {
  const { id_unit, page, limit, search } = props

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IGaleriAlbum[]; meta: Meta }>({
    queryKey: ['gallery-video', id_unit, Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/satuan-organisasi/${id_unit}/galeri-video?${Params}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { video: data?.data ?? [], loading, meta: data?.meta }
}
